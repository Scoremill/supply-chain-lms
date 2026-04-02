import type { CheerioAPI } from 'cheerio';

export function addSectionSpacing($: CheerioAPI): void {
  const h3Elements = $('h3').toArray();

  h3Elements.forEach((el, index) => {
    // Add class for scroll margin
    $(el).addClass('content-section-heading');

    // Insert divider before each h3 except the first,
    // but only if one doesn't already exist in the raw content
    if (index > 0) {
      const prev = $(el).prev();
      if (!prev.is('hr.section-divider') && !prev.is('div.section-divider')) {
        $(el).before('<hr class="section-divider" />');
      }
    }
  });
}
