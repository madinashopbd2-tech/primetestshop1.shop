/**
 * Deterministic Event ID Generator for Meta Pixel & CAPI Deduplication
 * Generates identical event IDs across client-side (fbq) and server-side (CAPI)
 */

export function generateMetaEventId(prefix = 'evt'): string {
  const timestamp = Date.now();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}_${timestamp}_${random}`;
}

export function generatePurchaseEventId(orderId: string): string {
  return `purchase_${orderId}`;
}
