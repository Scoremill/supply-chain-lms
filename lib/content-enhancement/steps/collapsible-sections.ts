import type { CheerioAPI } from 'cheerio';

export function wrapCollapsibleSections($: CheerioAPI): void {
  const selectors = ['.technical-note', '.regulatory-box', '.best-practice', '.key-concept', '.emphasis-box', '.success-box', '.technical-spec'];

  for (const selector of selectors) {
    $(selector).each((_, el) => {
      const $el = $(el);
      // Skip if already wrapped in details
      if ($el.parent().is('details')) return;

      const title = $el.find('h4, h5, strong, .box-title').first().text().trim()
        || $el.prev('h2, h3, h4').text().trim()
        || 'Details';
      const html = $.html($el);

      $el.replaceWith(
        `<details class="collapsible-section">
          <summary class="collapsible-section__summary">${title}</summary>
          ${html}
        </details>`
      );
    });
  }
}
