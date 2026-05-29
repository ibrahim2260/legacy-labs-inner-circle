// Lightweight analytics module — pluggable for GTM, PostHog, or GA4.
// All events fire to console in dev and push to window.dataLayer for GTM.
// To add PostHog: install posthog-js and uncomment the posthog.capture call.
// To add GA4 direct: uncomment the gtag call.

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
    };
    gtag?: (
      command: string,
      event: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export type AnalyticsEvent =
  | "funnel_started"
  | "step_view"
  | "step_complete"
  | "application_submit"
  | "qualified"
  | "not_qualified"
  | "booking_click"
  | "skool_click";

export function track(
  event: AnalyticsEvent | string,
  properties?: Record<string, unknown>
): void {
  if (process.env.NODE_ENV === "development") {
    console.log(`%c[Analytics] ${event}`, "color: #2D6BFF; font-weight: bold;", properties ?? "");
  }

  if (typeof window === "undefined") return;

  // Google Tag Manager
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...properties });
  }

  // PostHog (uncomment after installing posthog-js)
  // window.posthog?.capture(event, properties);

  // GA4 direct (uncomment if not using GTM)
  // window.gtag?.("event", event, properties);
}
