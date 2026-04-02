import type { CheerioAPI } from 'cheerio';
import type { TocEntry } from '../types';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function extractToc($: CheerioAPI): TocEntry[] {
  const entries: TocEntry[] = [];

  $('h3').each((_, el) => {
    const text = $(el).text().trim();
    if (!text) return;

    const id = slugify(text);
    $(el).attr('id', id);
    entries.push({ id, text, level: 3 });
  });

  return entries;
}
