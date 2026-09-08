/**
 * Server-Side Meta Conversions API (CAPI) Engine
 * Securely hashes customer data (SHA-256), constructs valid Graph API payloads,
 * handles test event codes, and manages non-blocking error resilience.
 */

import { hashSha256, normalizeBdPhone, normalizeEmail, normalizeText } from './hashing';

export interface MetaCapiUserDataInput {
  phone?: string;
  name?: string;
  email?: string;
  address?: string;
  district?: string;
  ipAddress?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  fbclid?: string;
  externalId?: string;
}

export interface MetaCapiCustomDataInput {
  currency?: string;
  value?: number;
  content_name?: string;
  content_type?: string;
  content_ids?: string[];
  content_category?: string;
  num_items?: number;
  delivery_fee?: number;
  [key: string]: any;
}

export interface MetaCapiPayload {
  eventName: string;
  eventId: string;
  eventTime?: number;
  eventSourceUrl?: string;
  actionSource?: 'website' | 'app' | 'system_generated' | 'physical_store';
  userData: MetaCapiUserDataInput;
  customData?: MetaCapiCustomDataInput;
  testEventCode?: string;
}

export interface MetaCapiResult {
  success: boolean;
  status: 'SUCCESS' | 'FAILED' | 'SIMULATED';
  statusCode: number;
  eventsReceived?: number;
  message: string;
  eventId: string;
  eventName: string;
}

/**
 * Filter out loopback or private RFC 1918 IPs from being sent to Meta CAPI
 */
export function sanitizePublicIp(ip: string | undefined | null): string | undefined {
  if (!ip) return undefined;
  const cleaned = ip.trim().split(',')[0].trim();
  if (
    !cleaned ||
    cleaned === '127.0.0.1' ||
    cleaned === '::1' ||
    cleaned.startsWith('::ffff:127.') ||
    cleaned.startsWith('10.') ||
    cleaned.startsWith('192.168.') ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(cleaned)
  ) {
    return undefined;
  }
  return cleaned;
}

/**
 * Resolves Meta Credentials securely from environment variables first,
 * falling back to stored settings if configured in Admin settings.
 */
export function getMetaCredentials(fallbackSettings?: {
  metaPixelId?: string | null;
  metaCapiToken?: string | null;
  metaTestEventCode?: string | null;
}) {
  const pixelId =
    process.env.META_PIXEL_ID?.trim() ||
    fallbackSettings?.metaPixelId?.trim() ||
    '';

  const accessToken =
    process.env.META_ACCESS_TOKEN?.trim() ||
    fallbackSettings?.metaCapiToken?.trim() ||
    '';

  const testEventCode =
    process.env.META_TEST_EVENT_CODE?.trim() ||
    fallbackSettings?.metaTestEventCode?.trim() ||
    '';

  return { pixelId, accessToken, testEventCode };
}

/**
 * Dispatches a single server-side event to Meta Conversions API (Graph API v19.0)
 * GUARANTEE: Never throws or interrupts business execution.
 */
export async function sendMetaCapiEvent(
  payload: MetaCapiPayload,
  credentialsOverride?: {
    pixelId?: string;
    accessToken?: string;
    testEventCode?: string;
  }
): Promise<MetaCapiResult> {
  const { eventName, eventId, eventTime, eventSourceUrl, userData, customData = {}, testEventCode: payloadTestCode } = payload;

  // Resolve credentials
  const defaultCreds = getMetaCredentials();
  const pixelId = credentialsOverride?.pixelId?.trim() || defaultCreds.pixelId;
  const accessToken = credentialsOverride?.accessToken?.trim() || defaultCreds.accessToken;
  const testEventCode = payloadTestCode?.trim() || credentialsOverride?.testEventCode?.trim() || defaultCreds.testEventCode;

  // Construct Meta user_data adhering strictly to Meta CAPI specification
  const metaUserData: Record<string, any> = {};

  // 1. Phone number: normalized and hashed
  const normalizedPhone = normalizeBdPhone(userData.phone);
  if (normalizedPhone) {
    metaUserData.ph = [hashSha256(normalizedPhone)];
  }

  // 2. Email: normalized and hashed
  const normalizedEmail = normalizeEmail(userData.email);
  if (normalizedEmail) {
    metaUserData.em = [hashSha256(normalizedEmail)];
  }

  // 3. First name: normalized and hashed
  const normalizedName = normalizeText(userData.name);
  if (normalizedName) {
    metaUserData.fn = [hashSha256(normalizedName)];
  }

  // 4. City / District: normalized and hashed
  const normalizedCity = normalizeText(userData.district);
  if (normalizedCity) {
    metaUserData.ct = [hashSha256(normalizedCity)];
  }

  // 5. Country: hashed 'bd' if customer demographic signals are present
  if (normalizedPhone || normalizedCity || normalizedName || normalizedEmail) {
    metaUserData.country = [hashSha256('bd')];
  }

  // 6. First-party cookies: _fbp and _fbc (never hashed)
  if (userData.fbp?.trim()) {
    metaUserData.fbp = userData.fbp.trim();
  }
  let fbc = userData.fbc?.trim();
  if (!fbc && userData.fbclid?.trim()) {
    fbc = `fb.1.${Math.floor(Date.now() / 1000)}.${userData.fbclid.trim()}`;
  }
  if (fbc) {
    metaUserData.fbc = fbc;
  }

  // 7. External ID: hashed
  if (userData.externalId?.trim()) {
    metaUserData.external_id = [hashSha256(userData.externalId.trim())];
  }

  // 8. Client IP: validated public IP
  const clientIp = sanitizePublicIp(userData.ipAddress);
  if (clientIp) {
    metaUserData.client_ip_address = clientIp;
  }

  // 9. Client User Agent
  if (userData.userAgent?.trim()) {
    metaUserData.client_user_agent = userData.userAgent.trim();
  }

  // Clean custom data
  const cleanedCustomData: Record<string, any> = {
    currency: customData.currency || 'BDT',
    ...customData,
  };
  if (cleanedCustomData.value === undefined && customData.value !== undefined) {
    cleanedCustomData.value = Number(customData.value);
  }

  const eventObject: Record<string, any> = {
    event_name: eventName,
    event_time: eventTime || Math.floor(Date.now() / 1000),
    event_id: eventId,
    event_source_url: eventSourceUrl || 'https://medimartbd.shop',
    action_source: payload.actionSource || 'website',
    user_data: metaUserData,
    custom_data: cleanedCustomData,
  };

  const formattedPayload: Record<string, any> = {
    data: [eventObject],
  };

  if (testEventCode) {
    formattedPayload.test_event_code = testEventCode;
  }

  // If credentials are not configured yet, record a SIMULATED event
  if (!pixelId || !accessToken) {
    return {
      success: true,
      status: 'SIMULATED',
      statusCode: 200,
      eventsReceived: 1,
      message: 'Simulated CAPI (Configure META_PIXEL_ID and META_ACCESS_TOKEN to enable live transmission)',
      eventId,
      eventName,
    };
  }

  // Dispatch to Meta Graph API
  try {
    const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedPayload),
    });

    const resData: any = await response.json().catch(() => ({}));
    const isOk = response.ok;

    return {
      success: isOk,
      status: isOk ? 'SUCCESS' : 'FAILED',
      statusCode: response.status,
      eventsReceived: resData?.events_received || (isOk ? 1 : 0),
      message: isOk
        ? `Events received by Meta: ${resData?.events_received || 1}`
        : (resData?.error?.message || `HTTP ${response.status} from Meta Graph API`),
      eventId,
      eventName,
    };
  } catch (err: any) {
    // Non-blocking network error handling
    return {
      success: false,
      status: 'FAILED',
      statusCode: 500,
      message: err?.message || 'Network error communicating with Meta Graph API',
      eventId,
      eventName,
    };
  }
}
