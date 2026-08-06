declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = "G-ZKRH1JH2H0";
const GTM_ID = "GTM-K3FSMT5C";

let analyticsLoaded = false;

/**
 * Loads Google Analytics (gtag) and Google Tag Manager scripts.
 *
 * This must only be called after the visitor has consented to analytics
 * cookies (cookie banner "Accept all" / saved analytics consent). The
 * scripts are deliberately NOT present in index.html so that no analytics
 * data is sent before consent is given.
 */
export function initAnalytics() {
  if (analyticsLoaded || typeof window === "undefined") {
    return;
  }
  analyticsLoaded = true;

  // gtag base script
  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function (...args: unknown[]) {
      window.dataLayer!.push(args);
    };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);

  // Google Tag Manager (shares the same dataLayer as gtag)
  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });
  const gtmScript = document.createElement("script");
  gtmScript.async = true;
  gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(gtmScript);
}
