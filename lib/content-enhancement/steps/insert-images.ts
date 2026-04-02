import type { CheerioAPI } from 'cheerio';
import { sectionImages } from '../image-config';
import type { SectionImage } from '../image-config';

/**
 * Inserts section images near h2, h3, or h4 headings based on the image config.
 * Default placement is immediately after the heading; use position: 'before'
 * to insert above the heading instead.
 *
 * Multiple images for the same heading are wrapped in a side-by-side grid.
 * Use float: 'right' to float an image alongside text content.
 */
export function insertSectionImages($: CheerioAPI, moduleNumber: number): void {
  const moduleImages = sectionImages[moduleNumber];
  if (!moduleImages) return;

  // Slugify helper (matches extract-toc.ts)
  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  $('h2, h3, h4').each((_, el) => {
    // h3s already have IDs from extract-toc; set IDs on h2s/h4s
    let id = $(el).attr('id');
    if (!id) {
      const text = $(el).text().trim();
      if (!text) return;
      id = slugify(text);
      $(el).attr('id', id);
    }
    if (!moduleImages[id]) return;

    const images = moduleImages[id];
    const position = images[0]?.position || 'after';

    if (images.length > 1) {
      const figuresHtml = images.map((img) => buildFigureHtml(img)).join('\n');
      const trioClass = images.length === 3 ? ' section-image-trio' : '';
      const pairHtml = `<div class="section-image-pair${trioClass}">${figuresHtml}</div>`;

      if (position === 'before') {
        $(el).before(pairHtml);
      } else {
        $(el).after(pairHtml);
      }
    } else {
      // Single image
      const img = images[0];
      const figureHtml = buildFigureHtml(img);

      if (img.position === 'before') {
        $(el).before(figureHtml);
      } else {
        $(el).after(figureHtml);
      }
    }
  });
}

function buildFigureHtml(img: SectionImage): string {
  const captionHtml = img.caption
    ? `<figcaption class="section-image__caption">${img.caption}</figcaption>`
    : '';

  const encodedSrc = encodeURI(img.src);
  const floatClass = img.float === 'right' ? ' section-image--float-right' : '';
  const sizeClass = img.size === 'small' ? ' section-image--small' : '';

  return `
    <figure class="section-image${floatClass}${sizeClass}">
      <img src="${encodedSrc}" alt="${img.alt}" width="1200" height="675" loading="lazy" />
      ${captionHtml}
    </figure>
  `;
}
