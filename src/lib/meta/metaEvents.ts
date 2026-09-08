/**
 * High-Level Meta Tracking Dispatcher (Browser Pixel + Server CAPI with Guaranteed Deduplication)
 * Supports standard events (PageView, ViewContent, AddToCart, InitiateCheckout, Purchase)
 * and custom events (Mantra Paid Webinar, etc.).
 */

import { generateMetaEventId, getPurchaseEventId, isPurchaseFired, markPurchaseFired } from './eventId';
import { trackMetaEvent, logMetaDebug } from './metaPixel';
import { ProductData, OrderData } from '../../types';

// Browser context extractor for first-party tracking
export function getBrowserMarketingContext() {
  if (typeof window === 'undefined') {
    return { fbp: '', fbc: '', fbclid: '', externalId: '', pageUrl: '' };
  }

  const urlParams = new URLSearchParams(window.location.search);
  const nowTs = Math.floor(Date.now() / 1000);

  // 1. fbclid
  let fbclid = urlParams.get('fbclid') || '';
  if (fbclid) {
    try {
      localStorage.setItem('_meta_fbclid', fbclid);
    } catch (e) {}
  } else {
    try {
      fbclid = localStorage.getItem('_meta_fbclid') || '';
    } catch (e) {}
  }

  // 2. _fbc
  let fbc = '';
  const matchFbc = document.cookie.match(/(?:^|; )_fbc=([^;]*)/);
  if (matchFbc && matchFbc[1]) {
    fbc = decodeURIComponent(matchFbc[1]);
  }
  if (!fbc && fbclid) {
    fbc = `fb.1.${nowTs}.${fbclid}`;
    document.cookie = `_fbc=${encodeURIComponent(fbc)}; path=/; max-age=7776000; SameSite=Lax`;
  }

  // 3. _fbp
  let fbp = '';
  const matchFbp = document.cookie.match(/(?:^|; )_fbp=([^;]*)/);
  if (matchFbp && matchFbp[1]) {
    fbp = decodeURIComponent(matchFbp[1]);
  }
  if (!fbp) {
    try {
      fbp = localStorage.getItem('_meta_fbp') || '';
    } catch (e) {}
  }
  if (!fbp) {
    const randomSubId = Math.floor(1000000000 + Math.random() * 9000000000);
    fbp = `fb.1.${nowTs}.${randomSubId}`;
    try {
      localStorage.setItem('_meta_fbp', fbp);
    } catch (e) {}
    document.cookie = `_fbp=${encodeURIComponent(fbp)}; path=/; max-age=7776000; SameSite=Lax`;
  }

  // 4. externalId (device/browser fingerprint)
  let externalId = '';
  try {
    externalId = localStorage.getItem('_medimart_device_fingerprint') || '';
  } catch (e) {}

  return {
    fbp,
    fbc,
    fbclid,
    externalId,
    pageUrl: window.location.href,
  };
}

/**
 * Sends server-side CAPI event via the backend API with EXACT same event_id
 */
async function dispatchServerCapiEvent(
  eventName: string,
  eventId: string,
  customData: Record<string, any> = {},
  userData: Record<string, any> = {}
) {
  if (typeof window === 'undefined') return;

  try {
    const context = getBrowserMarketingContext();
    const mergedUserData = {
      fbp: context.fbp,
      fbc: context.fbc,
      fbclid: context.fbclid,
      externalId: context.externalId,
      ...userData,
    };

    const payload = {
      event_name: eventName,
      event_id: eventId,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: context.pageUrl || window.location.href,
      action_source: 'website',
      user_data: mergedUserData,
      custom_data: customData,
    };

    const res = await fetch('/api/meta/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    });

    const result = await res.json().catch(() => ({}));
    logMetaDebug({
      eventName,
      eventId,
      browserStatus: 'Sent',
      serverStatus: result?.status === 'SUCCESS' ? 'Sent' : result?.status === 'SIMULATED' ? 'Simulated' : 'Pending',
    });
  } catch (err: any) {
    logMetaDebug({
      eventName,
      eventId,
      browserStatus: 'Sent',
      serverStatus: 'Failed',
      error: err?.message,
    });
  }
}

/**
 * 1. Track PageView Event (Single eventId for Browser + Server)
 */
export function trackPageView(customData: Record<string, any> = {}, userData: Record<string, any> = {}): string {
  const eventId = generateMetaEventId('pageview');

  // Browser Pixel
  trackMetaEvent({
    eventName: 'PageView',
    parameters: {
      page_title: typeof document !== 'undefined' ? document.title : '',
      page_location: typeof window !== 'undefined' ? window.location.href : '',
      ...customData,
    },
    eventId,
    isCustom: false,
  });

  // Server CAPI
  dispatchServerCapiEvent(
    'PageView',
    eventId,
    {
      page_title: typeof document !== 'undefined' ? document.title : '',
      ...customData,
    },
    userData
  );

  return eventId;
}

/**
 * 2. Track ViewContent Event
 */
export function trackViewContent(
  product: ProductData,
  customData: Record<string, any> = {},
  userData: Record<string, any> = {}
): string {
  const eventId = generateMetaEventId('viewcontent');
  const price = product.offerPrice || product.regularPrice;

  const standardData = {
    content_ids: ['COD-PROD-01'],
    content_name: product.title,
    content_type: 'product',
    value: price,
    currency: 'BDT',
    ...customData,
  };

  // Browser Pixel
  trackMetaEvent({
    eventName: 'ViewContent',
    parameters: standardData,
    eventId,
    isCustom: false,
  });

  // Server CAPI
  dispatchServerCapiEvent('ViewContent', eventId, standardData, userData);

  return eventId;
}

/**
 * 3. Track AddToCart Event
 * Fires ONLY when the user performs a true Add to Cart or package selection action.
 */
export function trackAddToCart(
  product: ProductData,
  quantity = 1,
  customData: Record<string, any> = {},
  userData: Record<string, any> = {}
): string {
  const eventId = generateMetaEventId('add_to_cart');
  const unitPrice = product.offerPrice || product.regularPrice;
  const totalPrice = unitPrice * quantity;

  const standardData = {
    content_ids: ['COD-PROD-01'],
    content_name: product.title,
    content_type: 'product',
    value: totalPrice,
    currency: 'BDT',
    num_items: quantity,
    ...customData,
  };

  // Browser Pixel
  trackMetaEvent({
    eventName: 'AddToCart',
    parameters: standardData,
    eventId,
    isCustom: false,
  });

  // Server CAPI
  dispatchServerCapiEvent('AddToCart', eventId, standardData, userData);

  return eventId;
}

/**
 * 4. Track InitiateCheckout Event
 */
export function trackInitiateCheckout(
  productTitle: string,
  value: number,
  details: Record<string, any> = {},
  userData: Record<string, any> = {}
): string {
  const eventId = generateMetaEventId('initiate_checkout');

  const standardData = {
    content_ids: ['COD-PROD-01'],
    content_name: productTitle,
    content_type: 'product',
    value,
    currency: 'BDT',
    num_items: details.quantity || 1,
    ...details,
  };

  // Browser Pixel
  trackMetaEvent({
    eventName: 'InitiateCheckout',
    parameters: standardData,
    eventId,
    isCustom: false,
  });

  // Server CAPI
  dispatchServerCapiEvent('InitiateCheckout', eventId, standardData, userData);

  return eventId;
}

/**
 * 5. Track Purchase Event
 * GUARANTEED:
 * - Uses stable, deterministic event_id derived from the transaction (order.eventId or purchase_${order.id})
 * - Checks isPurchaseFired(order.id) to PREVENT DOUBLE FIRING upon page refresh or re-render
 * - Synchronizes the exact same event_id between Browser and Server
 */
export function trackPurchase(
  order: OrderData,
  productTitle = 'Single Product',
  details: Record<string, any> = {}
): string | null {
  if (!order || !order.id) return null;

  // Prevent duplicate firing on page refresh / re-render
  if (isPurchaseFired(order.id)) {
    if (typeof console !== 'undefined') {
      console.log(`[Meta Tracking] Duplicate Purchase ignored for order: ${order.id}`);
    }
    return null;
  }

  // Mark order as fired immediately
  markPurchaseFired(order.id);

  const eventId = order.eventId || getPurchaseEventId(order.id);

  const standardData = {
    value: order.totalAmount,
    currency: 'BDT',
    content_name: productTitle,
    content_type: 'product',
    content_ids: ['COD-PROD-01'],
    num_items: order.quantity,
    ...details,
  };

  // Browser Pixel
  trackMetaEvent({
    eventName: 'Purchase',
    parameters: standardData,
    eventId,
    isCustom: false,
  });

  // Note: For orders created via server actions, the backend already dispatches
  // Server CAPI Purchase with this exact same eventId.
  // In case client-initiated dispatch is needed as a backup:
  dispatchServerCapiEvent(
    'Purchase',
    eventId,
    standardData,
    {
      phone: order.phone,
      name: order.customerName,
      address: order.address,
      district: order.district,
      externalId: order.deviceId,
    }
  );

  return eventId;
}

/**
 * 6. Track Custom Event
 * For any custom event name, including "Mantra Paid Webinar".
 * Both Browser Pixel (trackCustom) and Server CAPI receive the EXACT SAME eventName and eventId.
 */
export function trackCustomEvent(
  eventName: string,
  parameters: Record<string, any> = {},
  customData: Record<string, any> = {},
  userData: Record<string, any> = {}
): string {
  const cleanName = eventName.trim();
  const eventId = generateMetaEventId(`custom_${cleanName.toLowerCase().replace(/\s+/g, '_')}`);

  const mergedData = {
    ...parameters,
    ...customData,
  };

  // Browser Pixel (trackCustom)
  trackMetaEvent({
    eventName: cleanName,
    parameters: mergedData,
    eventId,
    isCustom: true,
  });

  // Server CAPI
  dispatchServerCapiEvent(cleanName, eventId, mergedData, userData);

  return eventId;
}

/**
 * 7. Track "Mantra Paid Webinar" Custom Event
 * Required Custom Event matching user specification.
 */
export function trackMantraPaidWebinar(
  customData: {
    webinar_id?: string;
    topic?: string;
    value?: number;
    currency?: string;
    [key: string]: any;
  } = {},
  userData: Record<string, any> = {}
): string {
  return trackCustomEvent(
    'Mantra Paid Webinar',
    {
      content_name: customData.topic || 'Mantra Paid Webinar Session',
      content_category: 'Webinar',
      value: customData.value || 499,
      currency: customData.currency || 'BDT',
    },
    customData,
    userData
  );
}
