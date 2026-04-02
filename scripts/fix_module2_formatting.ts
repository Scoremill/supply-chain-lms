import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const prisma = new PrismaClient();

async function fixModule2() {
  try {
    // Read current Module 2 content
    const module2 = await prisma.module.findUnique({
      where: { moduleNumber: 2 }
    });
    
    if (!module2) {
      console.log('❌ Module 2 not found');
      return;
    }
    
    let content = module2.content;
    console.log('📖 Original content length:', content.length);
    
    // STEP 1: Fix the title section
    // Replace the existing title with properly formatted white card
    const titlePattern = /<div class="module-container">\s*<h1>Module 2: Foundation Stage<\/h1>/;
    const newTitleSection = `<div style="background: white; padding: 40px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
  <h1 style="margin: 0 0 20px 0; font-size: 2.5em; font-weight: 700; color: black;">Module 2: Foundation Stage</h1>
  <p style="font-size: 1.2em; margin: 0; color: #333;">Advanced Construction Management and Civil Engineering Practice</p>
</div>`;
    
    content = content.replace(titlePattern, newTitleSection);
    console.log('✅ Title section updated');
    
    // STEP 2: Fix the conclusion section
    // Find and wrap the conclusion section with rose background
    const conclusionPattern = /<h2>Conclusion<\/h2>\s*([\s\S]*?)(?=<\/div>\s*'''|\s*'''|$)/;
    const conclusionMatch = content.match(conclusionPattern);
    
    if (conclusionMatch) {
      const conclusionText = conclusionMatch[1].trim();
      
      // Extract paragraphs from conclusion text
      const paragraphMatches = conclusionText.match(/<p>[\s\S]*?<\/p>/g);
      
      if (paragraphMatches && paragraphMatches.length >= 4) {
        // Format the conclusion section with rose background
        const formattedConclusion = `<div style="background: #fee2e2; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
  <h2 style="margin: 0 0 20px 0; color: black; font-weight: bold;">🎓 Conclusion</h2>
  <p style="font-size: 1.05em; line-height: 1.8; margin: 0; color: black;">${paragraphMatches[0].replace(/<\/?p>/g, '').trim()}</p>
  
  <p style="font-size: 1.05em; line-height: 1.8; margin: 20px 0 0 0; color: black;"><strong>${paragraphMatches[1].replace(/<\/?p>/g, '').trim()}</strong></p>
  
  <p style="font-size: 1.05em; line-height: 1.8; margin: 20px 0 0 0; color: black;">${paragraphMatches[2].replace(/<\/?p>/g, '').trim()}</p>
  
  <p style="font-size: 1.05em; line-height: 1.8; margin: 20px 0 0 0; color: black;">${paragraphMatches[3].replace(/<\/?p>/g, '').trim()}</p>
</div>`;
        
        content = content.replace(conclusionPattern, formattedConclusion);
        console.log('✅ Conclusion section updated');
      }
    }
    
    // Clean up any remaining artifacts
    content = content.replace(/'''[\s\S]*$/g, '').trim();
    
    console.log('📝 New content length:', content.length);
    
    // Update the database
    await prisma.module.update({
      where: { moduleNumber: 2 },
      data: { content }
    });
    
    console.log('✅ Module 2 updated in database');
    
    // Save to file for verification
    fs.writeFileSync('/tmp/module2_updated.html', content);
    console.log('✅ Updated content saved to /tmp/module2_updated.html');
    
  } catch (error) {
    console.error('❌ Error fixing Module 2:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixModule2();
