// Checkout URL Configuration


export const DEEP_DIVE_ONLY_CHECKOUT_BASE = 
  "https://www.servicestewards.com/checkout-deep-dive"; 

export const DEEP_DIVE_BUNDLE_CHECKOUT_BASE = 
  "https://www.servicestewards.com/checkout-profile-bundle"; 

/**
 * Builds a complete checkout URL with profile slug parameter
 * @param {string} baseUrl - The base checkout URL from Systeme.io
 * @param {string} profileSlug - The profile slug (e.g., "agape-giver")
 * @returns {string} Complete checkout URL or empty string if not configured
 */
export function buildCheckoutUrl(baseUrl, profileSlug) {
  // Return empty if either parameter is missing
  if (!baseUrl || !profileSlug) {
    return "";
  }

  // Determine if we need ? or & for the query parameter
  const separator = baseUrl.includes("?") ? "&" : "?";
  
  // Build and return the complete URL
  return `${baseUrl}${separator}profile=${encodeURIComponent(profileSlug)}`;
}