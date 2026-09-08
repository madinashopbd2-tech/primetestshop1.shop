/**
 * Server-Side Meta Conversions API (CAPI) Integration
 * Direct dispatch to Meta Graph API v19.0 / v20.0 bypassing AdBlockers and iOS restrictions
 */

import { formatMetaUserData, MetaUserDataInput } from './hashing';

export interface MetaCapiEventPayload {
  eventName: string;
  eventId: string;
  eventTime?: number;
  eventSourceUrl?: string;
  userData: MetaUserDataInput;
  customData?: {
    currency?: string;
    value?: number;
    content_name?: string;
    content_type?: string;
    content_ids?: string[];
    num_items?: number;
    [key: string]: any;
  };
}

export interface MetaCapiResponse {
  success: boolean;
  status: number;
  data?: any;
  error?: string;
}

/**
 * Dispatch an event directly to Meta Graph API Conversions Endpoint
 */
export async function sendMetaCapiEvent(
  pixelId: string,
  accessToken: string,
  payload: MetaCapiEventPayload,
  testEventCode?: string | null
): Promise<MetaCapiResponse> {
  if (!pixelId || !accessToken) {
    return {
      success: false,
      status: 400,
      error: 'Missing pixelId or accessToken',
    };
  }

  const {
    eventName,
    eventId,
    eventTime = Math.floor(Date.now() / 1000),
    eventSourceUrl = 'https://malaysianbd.shop',
    userData,
    customData = {},
  } = payload;

  const formattedUserData = formatMetaUserData(userData);

  const eventData: Record<string, any> = {
    event_name: eventName,
    event_time: eventTime,
    event_id: eventId,
    event_source_url: eventSourceUrl,
    action_source: 'website',
    user_data: formattedUserData,
    custom_data: {
      currency: customData.currency || 'BDT',
      value: customData.value ?? 0,
      content_name: customData.content_name,
      content_type: customData.content_type || 'product',
      content_ids: customData.content_ids || ['COD-PROD-01'],
      num_items: customData.num_items || 1,
      ...customData,
    },
  };

  const body: Record<string, any> = {
    data: [eventData],
  };

  if (testEventCode && testEventCode.trim()) {
    body.test_event_code = testEventCode.trim();
  }

  try {
    const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    return {
      success: res.ok,
      status: res.status,
      data: json,
      error: res.ok ? undefined : JSON.stringify(json.error || json),
    };
  } catch (err: any) {
    return {
      success: false,
      status: 500,
      error: err?.message || 'Network error calling Meta CAPI',
    };
  }
}
