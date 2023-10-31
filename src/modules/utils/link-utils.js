/**
 * Checks if a URL is an absolute URL.
 *
 * @param {string} url - The URL to be checked.
 * @returns {boolean} Returns true if the URL is an absolute URL, false otherwise.
 */
function isAbsoluteURL(url) {
  const absoluteRegex = /^(https?|ftp|file):\/\/.*/i;
  return absoluteRegex.test(url);
}

/**
 * Converts an absolute URL to a relative URL within the context of a base URL.
 *
 * @param {string} url - The absolute URL to be converted.
 * @param {string} baseUrl - The base URL used as a reference for creating a relative URL.
 * @returns {string} Returns the relative URL.
 */
function absoluteToRelative(url, baseUrl) {
  const absolute = new URL(url);
  const base = new URL(baseUrl);

  if (absolute.origin !== base.origin) return url;

  const relativeUrl = url.split(baseUrl).pop();
  return relativeUrl;
}

/**
 * Updates specified attributes of HTML elements within the given document.
 * It converts absolute URLs to relative URLs using a base URL.
 *
 * @param {Document} document - The HTML document where elements will be updated.
 * @param {string} selector - A CSS selector for selecting elements to update.
 * @param {string} attribute - The attribute to update (e.g., 'href' or 'src').
 */
function updateLink(document, selector, attribute) {
  const elements = document.querySelectorAll(selector);
  if (!elements) return;

  elements.forEach((el) => {
    const url = el.getAttribute(attribute);
    const baseUrl = 'https://experienceleague.adobe.com';

    if (isAbsoluteURL(url)) el[attribute] = absoluteToRelative(url, baseUrl);
  });
}

/**
 * Handles converting absolute URLs to relative URLs for links and images within a document.
 *
 * @param {Document} document - The HTML document to process.
 */
export default function handleAbsoluteUrl(document) {
  updateLink(document, 'a', 'href');
}
