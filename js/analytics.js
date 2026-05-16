/**
 * Anri Commerciale - Centralized Analytics & Tracking
 * This file handles GA4 initialization and provides helper functions for event tracking.
 * 
 * Replace 'G-XXXXXXXXXX' with your actual GA4 Measurement ID.
 */

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Initialize GA4
function initGA4() {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
}

// Track Custom Events
window.trackEvent = function(eventName, params = {}) {
    if (typeof gtag === 'function') {
        gtag('event', eventName, params);
        console.log(`[Analytics] Tracked: ${eventName}`, params);
    } else {
        console.warn(`[Analytics] gtag not initialized. Event ${eventName} skipped.`);
    }
};

// Auto-initialize
initGA4();
