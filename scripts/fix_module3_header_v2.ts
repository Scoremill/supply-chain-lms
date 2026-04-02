import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const prisma = new PrismaClient();

async function fixModule3Header() {
  try {
    // Read the module again
    const module3 = await prisma.module.findUnique({
      where: { moduleNumber: 3 }
    });
    
    if (!module3) {
      console.log('❌ Module 3 not found');
      return;
    }
    
    let content = module3.content;
    console.log('📖 Current content length:', content.length);
    
    // Remove the nested/duplicate title structure
    // Pattern: Find everything from the old header container up to Learning Objectives
    const cleanupPattern = /<div class="container">[\s\S]*?<h1 class="module-title">[\s\S]*?(<div style="background: #BEFFD1)/;
    
    const newStart = `<div style="background: white; padding: 40px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
  <h1 style="margin: 0 0 20px 0; font-size: 2.5em; font-weight: 700; color: black;">Module 3: Framing</h1>
  <p style="font-size: 1.2em; margin: 0; color: #333;">Advanced Construction Management and Civil Engineering Practice</p>
</div>

`;
    
    if (cleanupPattern.test(content)) {
      content = content.replace(cleanupPattern, newStart + '$1');
      console.log('✅ Cleaned up nested title structure');
    }
    
    console.log('📝 New content length:', content.length);
    
    // Update the database
    await prisma.module.update({
      where: { moduleNumber: 3 },
      data: { content }
    });
    
    console.log('✅ Module 3 header fixed and cleaned in database');
    
    // Save to file for verification
    fs.writeFileSync('/tmp/module3_final.html', content);
    console.log('✅ Final content saved to /tmp/module3_final.html');
    
  } catch (error) {
    console.error('❌ Error fixing Module 3 header:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixModule3Header();
