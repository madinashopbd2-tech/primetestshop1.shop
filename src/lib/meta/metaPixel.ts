/**
 * Browser-side Meta Pixel (fbq) tracking wrapper
 * Handles safe initialization, deduplication with eventID, and standard e-commerce events
 */

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

let isPixelInitialized = false;
let currentPixelId = '';

/**
 * Initialize Meta Pixel script safely once
 */
export function initMetaPixel(pixelId: string) {
  if (typeof window === 'undefined' || !pixelId) return;
  if (isPixelInitialized && currentPixelId === pixelId) return;

  currentPixelId = pixelId;

  // Official Meta Pixel base code loader
  if (!window.fbq) {
    const fbq: any = function (...args: any[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    };
    if (!window._fbq) window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    window.fbq = fbq;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }

  window.fbq('init', pixelId);
  isPixelInitialized = true;
}

/**
 * Track Meta Pixel Standard or Custom Event with eventID for CAPI deduplication
 */
export function trackMetaPixel(
  eventName: string,
  params: Record<string, any> = {},
  eventId?: string
) {
  if (typeof window === 'undefined' || !window.fbq) return;

  const options: Record<string, any> = {};
  if (eventId) {
    options.eventID = eventId;
  }

  window.fbq('track', eventName, params, options);
}

/**
 * Track Meta Custom Event
 */
export function trackMetaCustom(
  customEventName: string,
  params: Record<string, any> = {},
  eventId?: string
) {
  if (typeof window === 'undefined' || !window.fbq) return;

  const options: Record<string, any> = {};
  if (eventId) {
    options.eventID = eventId;
  }

  window.fbq('trackCustom', customEventName, params, options);
}
