import type { IOptions } from 'sanitize-html';

export const sanitizeConfig: IOptions = {
  allowedTags: [
    // Structure
    'div', 'span', 'p', 'br', 'hr',
    // Headings
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    // Lists
    'ul', 'ol', 'li',
    // Tables
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
    // Inline
    'a', 'strong', 'em', 'b', 'i', 'u', 'sub', 'sup', 'mark',
    // Media
    'img', 'figure', 'figcaption',
    // Details/Summary (progressive disclosure)
    'details', 'summary',
    // Semantic
    'blockquote', 'pre', 'code',
    // Enhanced content
    'nav', 'section',
    // Interactive
    'button',
  ],
  allowedAttributes: {
    '*': ['class', 'id'],
    'a': ['href', 'target', 'rel'],
    'img': ['src', 'alt', 'width', 'height', 'loading'],
    'th': ['colspan', 'rowspan', 'scope'],
    'td': ['colspan', 'rowspan'],
    'details': ['class', 'open'],
    'hr': ['class'],
    'div': ['data-correct', 'data-option'],
    'button': ['disabled'],
  },
  // Class attributes are allowed via allowedAttributes['*'] above.
  // No allowedClasses restriction needed — our pipeline generates trusted
  // HTML server-side, so class names are safe. The tag/attribute filtering
  // handles XSS prevention.
  //
  // Note: sanitize-html does NOT support '*' as a wildcard key in
  // allowedClasses (only specific tag names work), so a '*' key would
  // silently strip all classes.

  // Strip all inline styles — we use CSS classes instead
  allowedStyles: {},
};
