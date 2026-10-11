import { useEffect } from 'react';

/**
 * Custom hook to update document title and meta tags dynamically for SPA SEO.
 */
export const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
}) => {
  useEffect(() => {
    // 1. Update document title
    if (title) {
      document.title = title;
    }

    const setMetaTag = (selector, attribute, value) => {
      if (!value) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const parts = selector.replace('meta[', '').replace(']', '').split('=');
        if (parts.length === 2) {
          el.setAttribute(parts[0], parts[1].replace(/['"]/g, ''));
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attribute, value);
    };

    // 2. Meta description & keywords
    if (description) {
      setMetaTag('meta[name="description"]', 'content', description);
      setMetaTag('meta[property="og:description"]', 'content', ogDescription || description);
      setMetaTag('meta[property="twitter:description"]', 'content', ogDescription || description);
    }

    if (keywords) {
      setMetaTag('meta[name="keywords"]', 'content', keywords);
    }

    if (title) {
      setMetaTag('meta[name="title"]', 'content', title);
      setMetaTag('meta[property="og:title"]', 'content', ogTitle || title);
      setMetaTag('meta[property="twitter:title"]', 'content', ogTitle || title);
    }

    if (ogImage) {
      setMetaTag('meta[property="og:image"]', 'content', ogImage);
      setMetaTag('meta[property="twitter:image"]', 'content', ogImage);
    }

    // 3. Canonical link
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
      setMetaTag('meta[property="og:url"]', 'content', canonical);
      setMetaTag('meta[property="twitter:url"]', 'content', canonical);
    }
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogImage]);
};

export default useSEO;
