
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

// Function to intelligently reformat module content
function reformatContent(content: string, moduleNumber: number, title: string): string {
  // Remove HTML doctype, html, head, and body wrapper tags
  let cleaned = content
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<\/?html[^>]*>/gi, '')
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
    .replace(/<\/?body[^>]*>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Replace title sections - look for h1 with various container patterns
  cleaned = cleaned.replace(
    /(<(?:div|section)[^>]*>[\s\S]*?)(<h1[^>]*>)([\s\S]*?)(<\/h1>)([\s\S]*?<\/(?:div|section)>)/i,
    (match, before, h1Open, titleContent, h1Close, after) => {
      const cleanTitle = titleContent.replace(/<[^>]*>/g, '').trim();
      return `<div style="background: white; padding: 40px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
  <h1 style="margin: 0 0 20px 0; font-size: 2.5em; font-weight: 700; color: black;">${cleanTitle}</h1>
  <p style="font-size: 1.2em; margin: 0; color: #333;">Advanced Construction Management and Civil Engineering Practice</p>
</div>`;
    }
  );
  
  // Replace Learning Objectives sections
  cleaned = cleaned.replace(
    /(<(?:section|div)[^>]*learning[-_]objectives[^>]*>[\s\S]*?<h2[^>]*>[\s\S]*?Learning Objectives[\s\S]*?<\/h2>)([\s\S]*?)(<\/(?:section|div)>)/gi,
    (match, header, content, closing) => {
      // Extract list items
      const liMatches = content.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
      const cleanItems = liMatches.map((li: string) => 
        li.replace(/<\/?li[^>]*>/gi, '').replace(/<[^>]*>/g, '').trim()
      ).filter((item: string) => item.length > 0);
      
      const itemsHtml = cleanItems.map((item: string) => `    <li>${item}</li>`).join('\n');
      
      return `<div style="background: #BEFFD1; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
  <h2 style="margin: 0 0 20px 0; font-size: 1.8em; color: black; font-weight: bold;">🎯 Learning Objectives</h2>
  <ul style="margin: 0; padding-left: 20px; font-size: 1.05em; line-height: 1.8; color: black;">
${itemsHtml}
  </ul>
</div>`;
    }
  );
  
  // Replace Conclusion sections
  cleaned = cleaned.replace(
    /(<(?:div|section)[^>]*>[\s\S]*?<h2[^>]*>[\s\S]*?Conclusion[\s\S]*?<\/h2>)([\s\S]*?)(<\/(?:div|section)>)/gi,
    (match, header, content, closing) => {
      // Keep paragraphs but update styling
      const styledContent = content.replace(
        /<p([^>]*)>/gi,
        '<p style="font-size: 1.05em; line-height: 1.8; margin: 20px 0 0 0; color: black;">'
      ).replace(
        /<p style="font-size: 1\.05em[^"]*">\s*/i,
        '<p style="font-size: 1.05em; line-height: 1.8; margin: 0; color: black;">'
      );
      
      return `<div style="background: #fee2e2; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
  <h2 style="margin: 0 0 20px 0; color: black; font-weight: bold;">🎓 Conclusion</h2>
${styledContent}
</div>`;
    }
  );
  
  // Wrap in main container
  const wrapped = `
<div style="font-family: system-ui, -apple-system, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; line-height: 1.6;">

${cleaned}

</div>
`;
  
  return wrapped;
}

async function batchReformat() {
  try {
    console.log('🔄 Starting batch module reformatting...\n');
    
    for (let modNum = 1; modNum <= 9; modNum++) {
      const module = await prisma.module.findFirst({
        where: { moduleNumber: modNum }
      });
      
      if (!module) {
        console.log(`❌ Module ${modNum} not found`);
        continue;
      }
      
      console.log(`\n=== Module ${modNum}: ${module.title} ===`);
      console.log(`Original length: ${module.content.length} chars`);
      
      const reformatted = reformatContent(module.content, modNum, module.title);
      
      console.log(`Reformatted length: ${reformatted.length} chars`);
      
      // Update database
      await prisma.module.update({
        where: { id: module.id },
        data: { content: reformatted }
      });
      
      console.log(`✅ Module ${modNum} updated successfully`);
    }
    
    console.log('\n\n🎉 All modules reformatted with consistent styling!');
    console.log('\nStyling applied:');
    console.log('- Title: White card with bold black text');
    console.log('- Learning Objectives: Pale green (#BEFFD1)');
    console.log('- Conclusion: Rose (#fee2e2)');
    
  } catch (error) {
    console.error('Error during batch reformatting:', error);
  } finally {
    await prisma.$disconnect();
  }
}

batchReformat();
