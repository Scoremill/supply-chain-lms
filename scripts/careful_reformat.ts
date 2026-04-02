import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function reformatModuleCarefully(moduleNumber: number) {
  const module = await prisma.module.findFirst({
    where: { moduleNumber }
  });
  
  if (!module) {
    console.log(`Module ${moduleNumber} not found`);
    return;
  }
  
  console.log(`\nReformatting Module ${moduleNumber}: ${module.title}`);
  console.log(`Original content length: ${module.content.length}`);
  
  let content = module.content;
  
  // Step 1: Remove doctype, html, head tags and embedded styles
  content = content
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<html[^>]*>/gi, '')
    .replace(/<\/html>/gi, '')
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
    .replace(/<body[^>]*>/gi, '')
    .replace(/<\/body>/gi, '');
  
  // Step 2: Update title section (first occurrence of h1 with its container)
  const titleRegex = /<(?:header|div)[^>]*>\s*<h1[^>]*>(.*?)<\/h1>\s*<p[^>]*class="subtitle"[^>]*>(.*?)<\/p>\s*<\/(?:header|div)>/is;
  const titleMatch = content.match(titleRegex);
  
  if (titleMatch) {
    const titleText = titleMatch[1].replace(/<[^>]*>/g, '').trim();
    const subtitleText = titleMatch[2].replace(/<[^>]*>/g, '').trim() || 'Advanced Construction Management and Civil Engineering Practice';
    
    const newTitleSection = `<div style="background: white; padding: 40px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
  <h1 style="margin: 0 0 20px 0; font-size: 2.5em; font-weight: 700; color: black;">${titleText}</h1>
  <p style="font-size: 1.2em; margin: 0; color: #333;">${subtitleText}</p>
</div>`;
    
    content = content.replace(titleRegex, newTitleSection);
  }
  
  // Step 3: Update Learning Objectives section
  const loRegex = /<(?:section|div)[^>]*class="learning[-_]objectives"[^>]*>([\s\S]*?)<\/(?:section|div)>/i;
  const loMatch = content.match(loRegex);
  
  if (loMatch) {
    const loContent = loMatch[1];
    const liMatches = loContent.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
    const cleanItems = liMatches.map(li => li.replace(/<\/?li[^>]*>/gi, '').trim()).filter(Boolean);
    
    const itemsHtml = cleanItems.map(item => `    <li>${item}</li>`).join('\n');
    
    const newLOSection = `<div style="background: #BEFFD1; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
  <h2 style="margin: 0 0 20px 0; font-size: 1.8em; color: black; font-weight: bold;">🎯 Learning Objectives</h2>
  <ul style="margin: 0; padding-left: 20px; font-size: 1.05em; line-height: 1.8; color: black;">
${itemsHtml}
  </ul>
</div>`;
    
    content = content.replace(loRegex, newLOSection);
  }
  
  // Step 4: Find and update Conclusion sections
  const conclusionRegex = /<(?:section|div)[^>]*>\s*<h2[^>]*>.*?Conclusion.*?<\/h2>([\s\S]*?)<\/(?:section|div)>/gi;
  
  content = content.replace(conclusionRegex, (match, conclusionContent) => {
    return `<div style="background: #fee2e2; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
  <h2 style="margin: 0 0 20px 0; color: black; font-weight: bold;">🎓 Conclusion</h2>
${conclusionContent.trim()}
</div>`;
  });
  
  // Step 5: Wrap everything in the standard container
  const wrapped = `
<div style="font-family: system-ui, -apple-system, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; line-height: 1.6;">

${content.trim()}

</div>
`;
  
  // Update in database
  await prisma.module.update({
    where: { id: module.id },
    data: { content: wrapped }
  });
  
  console.log(`✅ Module ${moduleNumber} reformatted successfully`);
  console.log(`New content length: ${wrapped.length}`);
}

async function reformatAllModules() {
  try {
    console.log('🎨 Carefully reformatting all modules...\n');
    
    for (let i = 1; i <= 9; i++) {
      await reformatModuleCarefully(i);
    }
    
    console.log('\n🎉 All modules reformatted with consistent styling!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

reformatAllModules();
