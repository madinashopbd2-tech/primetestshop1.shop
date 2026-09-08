/**
 * Client-Side Meta Pixel Service
 * Handles single initialization, deduplication eventID injection,
 * standard/custom event tracking, and development-only debug logging.
 */

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
    __META_PIXEL_INITIALIZED__?: boolean;
    __META_PIXEL_ID__?: string;
    __META_DEBUG__?: boolean;
  }
}

export interface MetaTrackOptions {
  eventName: string;
  parameters?: Record<string, any>;
  eventId: string;
  isCustom?: boolean;
}

/**
 * Check if Meta Debug mode is active (development environment or debug flag)
 */
export function isMetaDebugEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.__META_DEBUG__ === true ||
    (typeof import.meta !== 'undefined' && Boolean(import.meta.env?.DEV))
  );
}

/**
 * Safe sanitized debug logger that never exposes raw PII or secret tokens
 */
export function logMetaDebug(info: {
  eventName: string;
  eventId: string;
  browserStatus: 'Sent' | 'Failed' | 'Queued';
  serverStatus?: 'Sent' | 'Pending' | 'Failed' | 'Simulated';
  error?: string;
}) {
  if (!isMetaDebugEnabled()) return;

  const timestamp = new Date().toLocaleTimeString();
  console.groupCollapsed(
    `%c[Meta Tracking] %c${info.eventName} %c(${info.eventId})`,
    'color: #1877F2; font-weight: bold;',
    'color: #059669; font-weight: bold;',
    'color: #64748B; font-weight: normal;'
  );
  console.log(`Event: %c${info.eventName}`, 'font-weight: bold');
  console.log(`Event ID: %c${info.eventId}`, 'font-family: monospace; color: #0284C7;');
  console.log(`Browser: %c${info.browserStatus}`, info.browserStatus === 'Sent' ? 'color: #16A34A;' : 'color: #DC2626;');
  if (info.serverStatus) {
    console.log(`Server: %c${info.serverStatus}`, info.serverStatus === 'Sent' ? 'color: #16A34A;' : 'color: #EAB308;');
  }
  console.log(`Timestamp: ${timestamp}`);
  if (info.error) {
    console.warn(`Note: ${info.error}`);
  }
  console.groupEnd();
}

/**
 * Initialize Meta Pixel script in document head.
 * Guarantees STRICT SINGLE INITIALIZATION across React re-renders,
 * StrictMode double invokes, and page navigations.
 */
export function initMetaPixel(pixelId?: string): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  // Priority: passed pixelId -> env variable -> already initialized
  const resolvedId = (
    pixelId?.trim() ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_META_PIXEL_ID?.trim()) ||
    window.__META_PIXEL_ID__ ||
    ''
  );

  if (!resolvedId) {
    return false;
  }

  // Prevent multiple initializations of the same pixel
  if (window.__META_PIXEL_INITIALIZED__ && window.__META_PIXEL_ID__ === resolvedId) {
    return true;
  }

  // Standard Meta Pixel snippet
  if (!window.fbq) {
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.id = 'meta-pixel-script';
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  }

  try {
    window.fbq?.('init', resolvedId);
    window.__META_PIXEL_INITIALIZED__ = true;
    window.__META_PIXEL_ID__ = resolvedId;

    if (isMetaDebugEnabled()) {
      console.log(`%c[Meta Tracking] Pixel initialized with ID: ${resolvedId}`, 'color: #1877F2; font-weight: bold;');
    }
    return true;
  } catch (err) {
    console.warn('[Meta Tracking] Failed to initialize pixel:', err);
    return false;
  }
}

/**
 * Core Browser Meta Pixel Dispatcher with eventID deduplication parameter
 */
export function trackMetaEvent({
  eventName,
  parameters = {},
  eventId,
  isCustom = false,
}: MetaTrackOptions): boolean {
  if (typeof window === 'undefined') return false;

  if (!window.fbq) {
    logMetaDebug({
      eventName,
      eventId,
      browserStatus: 'Queued',
      error: 'Pixel script loading or not initialized yet',
    });
    return false;
  }

  try {
    const action = isCustom ? 'trackCustom' : 'track';
    // Deduplication object MUST have exact key: { eventID: eventId }
    window.fbq(action, eventName, parameters, { eventID: eventId });

    logMetaDebug({
      eventName,
      eventId,
      browserStatus: 'Sent',
    });
    return true;
  } catch (err: any) {
    logMetaDebug({
      eventName,
      eventId,
      browserStatus: 'Failed',
      error: err?.message,
    });
    return false;
  }
}
