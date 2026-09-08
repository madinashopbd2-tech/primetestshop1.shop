/**
 * Meta CAPI Data Normalization and Privacy Hashing (SHA-256)
 * Follows Meta Business SDK & Conversions API specifications.
 */

import crypto from 'crypto';

/**
 * Clean & normalize Bangladeshi / international phone number for Meta hashing.
 * Rules:
 * - Strip all non-numeric characters, spaces, hyphens, parentheses
 * - Remove leading zeros if preceded by country code
 * - Bangladeshi local numbers (e.g. 017...) must have country code '88' prepended
 */
export function normalizeBdPhone(phone: string | undefined | null): string {
  if (!phone) return '';
  let cleaned = String(phone).replace(/\D/g, '');
  if (!cleaned) return '';

  if (cleaned.startsWith('8801') && cleaned.length === 13) {
    return cleaned;
  }
  if (cleaned.startsWith('01') && cleaned.length === 11) {
    return '88' + cleaned;
  }
  if (cleaned.startsWith('1') && cleaned.length === 10) {
    return '880' + cleaned;
  }
  return cleaned;
}

/**
 * Clean & normalize email address for Meta hashing.
 * Rules:
 * - Trim leading/trailing whitespace
 * - Convert to strictly lowercase
 */
export function normalizeEmail(email: string | undefined | null): string {
  if (!email) return '';
  return String(email).trim().toLowerCase();
}

/**
 * Clean & normalize text fields (first name, city, district)
 */
export function normalizeText(text: string | undefined | null): string {
  if (!text) return '';
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/[^\w\s\u0980-\u09FF]/gi, ''); // preserves Bengali unicode characters and alphanumeric
}

/**
 * SHA-256 Hash helper
 */
export function hashSha256(value: string | undefined | null): string {
  if (!value) return '';
  const normalized = String(value).trim().toLowerCase();
  if (!normalized) return '';
  return crypto.createHash('sha256').update(normalized).digest('hex');
}
