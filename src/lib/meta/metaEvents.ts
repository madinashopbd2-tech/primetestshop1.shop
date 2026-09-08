/**
 * Meta Pixel & CAPI Dual-Layer Standard & Interaction Event Handlers
 * Synchronizes client-side fbq and server CAPI with unified event IDs
 */

import { generateMetaEventId, generatePurchaseEventId } from './eventId';
import { trackMetaPixel, trackMetaCustom } from './metaPixel';

export interface ProductMetaInfo {
  id?: string;
  title: string;
  price: number;
  category?: string;
}

export interface PurchaseMetaInfo {
  orderId: string;
  totalAmount: number;
  productTitle: string;
  quantity: number;
  customerPhone?: string;
  customerName?: string;
  district?: string;
}

/**
 * 1. PageView Event
 */
export function trackMetaPageView(): string {
  const eventId = generateMetaEventId('pageview');
  trackMetaPixel('PageView', {}, eventId);
  return eventId;
}

/**
 * 2. ViewContent Event
 */
export function trackMetaViewContent(product: ProductMetaInfo): string {
  const eventId = generateMetaEventId('view_content');
  trackMetaPixel(
    'ViewContent',
    {
      content_name: product.title,
      content_category: product.category || 'Health & Personal Care',
      content_ids: [product.id || 'COD-PROD-01'],
      content_type: 'product',
      value: product.price,
      currency: 'BDT',
    },
    eventId
  );
  return eventId;
}

/**
 * 3. AddToCart Event
 */
export function trackMetaAddToCart(
  productTitle: string,
  price: number,
  quantity = 1,
  packageName?: string
): string {
  const eventId = generateMetaEventId('add_to_cart');
  trackMetaPixel(
    'AddToCart',
    {
      content_name: productTitle,
      content_ids: ['COD-PROD-01'],
      content_type: 'product',
      value: price,
      currency: 'BDT',
      num_items: quantity,
      package_name: packageName,
    },
    eventId
  );
  return eventId;
}

/**
 * 4. InitiateCheckout Event
 */
export function trackMetaInitiateCheckout(
  productTitle: string,
  value: number,
  numItems = 1
): string {
  const eventId = generateMetaEventId('initiate_checkout');
  trackMetaPixel(
    'InitiateCheckout',
    {
      content_name: productTitle,
      content_ids: ['COD-PROD-01'],
      content_type: 'product',
      value,
      currency: 'BDT',
      num_items: numItems,
    },
    eventId
  );
  return eventId;
}

/**
 * 5. Purchase Event
 */
export function trackMetaPurchase(order: PurchaseMetaInfo): string {
  const eventId = generatePurchaseEventId(order.orderId);
  trackMetaPixel(
    'Purchase',
    {
      content_name: order.productTitle,
      content_ids: ['COD-PROD-01'],
      content_type: 'product',
      value: order.totalAmount,
      currency: 'BDT',
      num_items: order.quantity,
      order_id: order.orderId,
    },
    eventId
  );
  return eventId;
}

/**
 * 6. WatchVideo Event
 */
export function trackMetaWatchVideo(videoTitle: string, videoUrl?: string): string {
  const eventId = generateMetaEventId('watch_video');
  trackMetaCustom(
    'WatchVideo',
    {
      content_name: videoTitle,
      video_url: videoUrl,
    },
    eventId
  );
  return eventId;
}

/**
 * 7. Contact Event (WhatsApp / Phone call)
 */
export function trackMetaContact(contactType: 'WhatsApp' | 'PhoneCall', contactTarget: string): string {
  const eventId = generateMetaEventId('contact');
  trackMetaPixel(
    'Contact',
    {
      contact_method: contactType,
      contact_target: contactTarget,
    },
    eventId
  );
  return eventId;
}

/**
 * 8. ScrollDepth Event
 */
export function trackMetaScrollDepth(percentage: number): string {
  const eventId = generateMetaEventId('scroll');
  trackMetaCustom(
    'ScrollDepth',
    {
      depth_percentage: percentage,
    },
    eventId
  );
  return eventId;
}
