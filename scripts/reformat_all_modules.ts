// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

// Helper function to extract text content from HTML
function extractTextContent(html: string): string {
  // Remove HTML tags but preserve structure
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<html[^>]*>/gi, '')
    .replace(/<\/html>/gi, '')
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
    .replace(/<body[^>]*>/gi, '')
    .replace(/<\/body>/gi, '');
}

// Helper function to format content with new styling
function formatModuleContent(moduleNumber: number, title: string, rawContent: string): string {
  // Extract the clean content
  const cleanContent = extractTextContent(rawContent);
  
  return `
<div style="font-family: system-ui, -apple-system, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; line-height: 1.6;">

${cleanContent}

</div>
`;
}

// Function to replace styling patterns in existing content
function updateStyling(content: string, moduleTitle: string): string {
  let updated = content;
  
  // Find and replace title sections (various formats)
  // Pattern 1: Gradient backgrounds for titles
  updated = updated.replace(
    /(<div[^>]*background:[^>]*gradient[^>]*>[\s\S]*?<h1[^>]*>)([\s\S]*?)(<\/h1>[\s\S]*?<\/div>)/gi,
    (match, opening, titleText, closing) => {
      return `<div style="background: white; padding: 40px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
  <h1 style="margin: 0 0 20px 0; font-size: 2.5em; font-weight: 700; color: black;">${titleText.replace(/<[^>]*>/g, '').trim()}</h1>
  <p style="font-size: 1.2em; margin: 0; color: #333;">Advanced Construction Management and Civil Engineering Practice</p>
</div>`;
    }
  );
  
  // Pattern 2: Learning Objectives sections
  updated = updated.replace(
    /(<section[^>]*learning[-_]objectives[^>]*>|<div[^>]*>[\s\S]*?<h2[^>]*>.*?Learning Objectives.*?<\/h2>)([\s\S]*?)(<\/section>|<\/div>)/gi,
    (match, opening, content, closing) => {
      // Extract the list items
      const listItems = content.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
      const cleanItems = listItems.map(li => li.replace(/<\/?li[^>]*>/gi, '').trim());
      
      return `<div style="background: #BEFFD1; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
  <h2 style="margin: 0 0 20px 0; font-size: 1.8em; color: black; font-weight: bold;">🎯 Learning Objectives</h2>
  <ul style="margin: 0; padding-left: 20px; font-size: 1.05em; line-height: 1.8; color: black;">
${cleanItems.map(item => `    <li>${item}</li>`).join('\n')}
  </ul>
</div>`;
    }
  );
  
  // Pattern 3: Conclusion sections
  updated = updated.replace(
    /(<div[^>]*>[\s\S]*?<h2[^>]*>.*?Conclusion.*?<\/h2>)([\s\S]*?)(<\/div>)/gi,
    (match, opening, content, closing) => {
      const cleanContent = content.replace(/<\/?p[^>]*>/gi, '\n<p style="font-size: 1.05em; line-height: 1.8; margin: 0; color: black;">').replace(/\n+/g, '\n').trim();
      
      return `<div style="background: #fee2e2; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
  <h2 style="margin: 0 0 20px 0; color: black; font-weight: bold;">🎓 Conclusion</h2>
${cleanContent}
</div>`;
    }
  );
  
  return updated;
}

async function reformatAllModules() {
  try {
    console.log('Starting module reformatting process...\n');
    
    for (let moduleNum = 1; moduleNum <= 9; moduleNum++) {
      const module = await prisma.module.findFirst({
        where: { moduleNumber: moduleNum }
      });
      
      if (!module) {
        console.log(`❌ Module ${moduleNum} not found, skipping...`);
        continue;
      }
      
      console.log(`\n=== Processing Module ${moduleNum}: ${module.title} ===`);
      console.log(`Current content length: ${module.content.length} characters`);
      
      let newContent = module.content;
      
      // Apply styling updates
      newContent = updateStyling(newContent, module.title);
      
      // Save to file for manual review if needed
      const fs = require('fs');
      fs.writeFileSync(`/tmp/module${moduleNum}_reformed.txt`, newContent);
      
      // Update in database
      await prisma.module.update({
        where: { id: module.id },
        data: { content: newContent }
      });
      
      console.log(`✅ Module ${moduleNum} reformatted successfully`);
      console.log(`New content length: ${newContent.length} characters`);
    }
    
    console.log('\n🎉 All modules have been reformatted with consistent styling!');
    
  } catch (error) {
    console.error('Error reformatting modules:', error);
  } finally {
    await prisma.$disconnect();
  }
}

reformatAllModules();
