/**
 * Meta Event ID Generation & Transaction Deduplication Utility
 * Ensures Browser Pixel and Server Conversions API (CAPI) share the exact same event_id.
 */

// Memory cache of fired purchase order IDs to prevent double firing on re-renders
const firedPurchaseOrderIds = new Set<string>();

/**
 * Generates a cryptographically secure event ID.
 * Prefers crypto.randomUUID() where available (Node.js 16.7+ and modern browsers),
 * falling back to timestamp + high-entropy random string.
 */
export function generateMetaEventId(prefix = 'evt'): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      const uuid = crypto.randomUUID();
      return prefix ? `${prefix}_${uuid}` : uuid;
    }
  } catch (e) {
    // Fallback if crypto.randomUUID is restricted in iframe/environment
  }

  const timestamp = Date.now();
  const randomEntropy = Math.random().toString(36).substring(2, 10);
  const perfEntropy = typeof performance !== 'undefined' ? Math.floor(performance.now() * 1000).toString(36) : '';
  return `${prefix}_${timestamp}_${randomEntropy}${perfEntropy}`;
}

/**
 * Returns a stable, deterministic Purchase event ID based on the order ID.
 */
export function getPurchaseEventId(orderId: string): string {
  if (!orderId) return generateMetaEventId('purchase');
  if (orderId.startsWith('purchase_')) return orderId;
  return `purchase_${orderId}`;
}

/**
 * Checks if a Purchase event has already fired for a specific order.
 * Verifies both in-memory Set and browser sessionStorage to survive page refresh.
 */
export function isPurchaseFired(orderId: string): boolean {
  if (!orderId) return false;

  if (firedPurchaseOrderIds.has(orderId)) {
    return true;
  }

  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const stored = window.sessionStorage.getItem(`_meta_purchase_fired_${orderId}`);
      if (stored === 'true') {
        firedPurchaseOrderIds.add(orderId);
        return true;
      }
    } catch (e) {
      // sessionStorage might be restricted
    }
  }

  return false;
}

/**
 * Marks a Purchase event as fired for a specific order ID.
 */
export function markPurchaseFired(orderId: string): void {
  if (!orderId) return;
  firedPurchaseOrderIds.add(orderId);

  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      window.sessionStorage.setItem(`_meta_purchase_fired_${orderId}`, 'true');
    } catch (e) {
      // sessionStorage might be restricted
    }
  }
}
