import * as cheerio from 'cheerio';
import sanitizeHtml from 'sanitize-html';
import type { QuizInput, EnhancedContent } from './types';
import { sanitizeConfig } from './sanitize-config';
import { extractToc } from './steps/extract-toc';
import { normalizeCallouts } from './steps/normalize-callouts';
import { wrapCollapsibleSections } from './steps/collapsible-sections';
import { insertCheckpoints } from './steps/insert-checkpoints';
import { addSectionSpacing } from './steps/section-spacing';
import { insertSectionImages } from './steps/insert-images';

export function enhanceModuleContent(
  rawHtml: string,
  moduleNumber: number,
  quizzes: QuizInput[]
): EnhancedContent {
  // Feature gate: only enhance configured modules
  const enhancedModules = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  if (!enhancedModules.has(moduleNumber)) {
    return {
      html: sanitizeHtml(rawHtml, sanitizeConfig),
      toc: [],
      enhanced: false,
    };
  }

  // Parse HTML with cheerio
  const $ = cheerio.load(rawHtml);

  // Module-specific content patches
  if (moduleNumber === 4) {
    // Add Passive Turbine Vents item after Ridge Vent Requirements
    $('li:has(strong)').filter((_, el) => $(el).find('strong').first().text().startsWith('Ridge Vent Requirements')).after(
      '<li><strong>Passive Turbine Vents:</strong> These vents are a great way to remove hot air from the attic. They are wind driven and allow for improved air circulation.</li>'
    );
  }
  if (moduleNumber === 5) {
    // Mark blue info callout boxes for collapsible treatment
    $('[style*="#f0f9ff"]').addClass('technical-spec');
  }
  if (moduleNumber === 6) {
    // Mark blue info boxes and green best-practice boxes for collapsible treatment
    $('[style*="#f0f9ff"]').addClass('technical-spec');
    $('[style*="#f0fdf4"]').addClass('success-box');
  }
  if (moduleNumber === 7) {
    // Mark blue info boxes and green best-practice boxes for collapsible treatment
    $('[style*="#f0f9ff"]').addClass('technical-spec');
    $('[style*="#f0fdf4"]').addClass('success-box');
    // Orange/peach cabinet mistakes box for collapsible treatment
    $('[style*="#fff7ed"]').addClass('emphasis-box');
    // Insert countertop image after the appliance rough-opening paragraph
    $('p').filter((_, el) => $(el).text().includes('Rough opening dimensions provided by appliance manufacturers')).after(
      `<figure class="section-image">
        <img src="${encodeURI('/images/modules/module-7/09_Countertops_Installed.png')}" alt="Countertops installed on lower cabinets showing templated stone countertop with sink and appliance cutouts" width="1200" height="675" loading="lazy" />
        <figcaption class="section-image__caption">Countertops installed: Templated and fabricated to fit the completed cabinet layout</figcaption>
      </figure>`
    );
  }
  if (moduleNumber === 8) {
    $('[style*="#f0f9ff"]').addClass('technical-spec');
    $('[style*="#f0fdf4"]').addClass('success-box');
    $('[style*="#fef3c7"]').addClass('emphasis-box');
    $('[style*="#fef2f2"]').addClass('emphasis-box');
    $('div[style*="#f0f9ff"]').filter((_, el) => $(el).text().includes('Electrical Final Device Testing Standards')).after(
      `<figure class="section-image">
        <img src="${encodeURI('/images/modules/module-8/Cool_Home_Transition pic.jpeg')}" alt="Modern home exterior showcasing completed electrical, mechanical, and finish systems" width="1200" height="675" loading="lazy" />
        <figcaption class="section-image__caption">Completed home: Final electrical and mechanical systems integrated</figcaption>
      </figure>`
    );
  }
  if (moduleNumber === 9) {
    $('[style*="#f0f9ff"]').addClass('technical-spec');
    $('[style*="#f0fdf4"]').addClass('success-box');
    $('[style*="#fef3c7"]').addClass('emphasis-box');
    $('.note').filter(function() { return $(this).text().includes('Delivery Best Practice'); }).addClass('emphasis-box');
  }
  if (moduleNumber === 10) {
    $('[style*="#f0f9ff"]').addClass('technical-spec');
    $('[style*="#f0fdf4"]').addClass('success-box');
    $('[style*="#fff7ed"]').addClass('emphasis-box');
    $('[style*="#fef3c7"]').addClass('emphasis-box');
    $('[style*="#fef2f2"]').addClass('emphasis-box');
  }

  // Pipeline steps (sequential, mutating cheerio DOM)
  // 1. Extract TOC + inject anchor IDs on h3 headings
  const toc = extractToc($);

  // 2. Normalize callout boxes (inline styles -> CSS classes)
  normalizeCallouts($);

  // 3. Wrap .technical-note/.regulatory-box in <details>
  wrapCollapsibleSections($);

  // 4. Insert section images after h3 headings
  insertSectionImages($, moduleNumber);

  // 5. Insert checkpoint questions at configured positions
  insertCheckpoints($, quizzes, moduleNumber);

  // 6. Add section dividers between h3 sections
  addSectionSpacing($);

  // 7. Extract final HTML and sanitize
  const enhancedHtml = $('body').html() || '';
  const sanitized = sanitizeHtml(enhancedHtml, sanitizeConfig);

  return {
    html: sanitized,
    toc,
    enhanced: true,
  };
}
