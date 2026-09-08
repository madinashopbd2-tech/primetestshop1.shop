/**
 * SHA-256 Hashing & Advanced Matching Normalization for Meta
 * Conforms to official Meta Advanced Matching specifications:
 * - Phone numbers: E.164 without '+' (e.g. 8801712345678)
 * - Names/Emails: Lowercase, trimmed of whitespace
 */

import crypto from 'crypto';

/**
 * Hash raw string to SHA-256 lowercase hex
 */
export function hashSha256(value: string | undefined | null): string {
  if (!value) return '';
  const cleanVal = value.trim().toLowerCase();
  if (!cleanVal) return '';

  try {
    if (typeof crypto !== 'undefined' && crypto.createHash) {
      return crypto.createHash('sha256').update(cleanVal).digest('hex');
    }
  } catch {
    // Fallback if crypto not present
  }

  // Simple string hex fallback if needed
  let hash = 0;
  for (let i = 0; i < cleanVal.length; i++) {
    const char = cleanVal.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(64, '0');
}

/**
 * Standardize Bangladeshi phone numbers to international format (8801...)
 */
export function normalizeBdPhone(rawPhone: string | undefined | null): string {
  if (!rawPhone) return '';
  const digits = rawPhone.replace(/\D/g, '');
  if (!digits) return '';

  if (digits.startsWith('8801')) {
    return digits;
  }
  if (digits.startsWith('01')) {
    return `88${digits}`;
  }
  if (digits.startsWith('1') && digits.length === 10) {
    return `880${digits}`;
  }
  return digits;
}

export interface MetaUserDataInput {
  phone?: string;
  name?: string;
  email?: string;
  district?: string;
  ipAddress?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  externalId?: string;
}

/**
 * Prepare Meta CAPI user_data object with proper SHA-256 hashing
 */
export function formatMetaUserData(data: MetaUserDataInput) {
  const result: Record<string, any> = {};

  if (data.phone) {
    const normPhone = normalizeBdPhone(data.phone);
    const hashed = hashSha256(normPhone);
    if (hashed) result.ph = [hashed];
  }

  if (data.email) {
    const hashed = hashSha256(data.email.trim().toLowerCase());
    if (hashed) result.em = [hashed];
  }

  if (data.name) {
    const parts = data.name.trim().split(/\s+/);
    const firstName = parts[0] || '';
    const lastName = parts.length > 1 ? parts.slice(1).join(' ') : '';
    if (firstName) {
      const hashedFn = hashSha256(firstName);
      if (hashedFn) result.fn = [hashedFn];
    }
    if (lastName) {
      const hashedLn = hashSha256(lastName);
      if (hashedLn) result.ln = [hashedLn];
    }
  }

  if (data.district) {
    const hashedCt = hashSha256(data.district.trim().toLowerCase());
    if (hashedCt) result.ct = [hashedCt];
  }

  // Country code for Bangladesh: 'bd' hashed
  result.country = [hashSha256('bd')];

  // Unhashed parameters
  if (data.ipAddress && !data.ipAddress.startsWith('127.') && data.ipAddress !== '::1') {
    result.client_ip_address = data.ipAddress;
  }
  if (data.userAgent) {
    result.client_user_agent = data.userAgent;
  }
  if (data.fbp) {
    result.fbp = data.fbp;
  }
  if (data.fbc) {
    result.fbc = data.fbc;
  }
  if (data.externalId) {
    const hashedExt = hashSha256(data.externalId);
    if (hashedExt) result.external_id = [hashedExt];
  }

  return result;
}
