import type { CheerioAPI } from 'cheerio';

const BACKGROUND_TO_CLASS: Record<string, string> = {
  '#fef3c7': 'field-card field-card--warning',
  '#f0f9ff': 'field-card field-card--info',
  '#f0fdf4': 'field-card field-card--success',
  '#fee2e2': 'field-card field-card--error',
};

const CLASS_TO_FIELD_CARD: Record<string, string> = {
  'technical-spec': 'field-card field-card--info',
  'warning-box': 'field-card field-card--warning',
  'info-box': 'field-card field-card--info',
  'success-box': 'field-card field-card--success',
  'error-box': 'field-card field-card--error',
};

export function normalizeCallouts($: CheerioAPI): void {
  // Map inline style backgrounds to CSS classes
  $('[style]').each((_, el) => {
    const style = $(el).attr('style') || '';
    for (const [color, className] of Object.entries(BACKGROUND_TO_CLASS)) {
      if (style.includes(color)) {
        $(el).addClass(className);
        $(el).removeAttr('style');
        break;
      }
    }
  });

  // Map existing class names to unified field-card variants
  for (const [oldClass, newClass] of Object.entries(CLASS_TO_FIELD_CARD)) {
    $(`.${oldClass}`).each((_, el) => {
      $(el).addClass(newClass);
    });
  }
}
