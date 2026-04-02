import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const prisma = new PrismaClient();

async function fixModule3Header() {
  try {
    // Read current Module 3 content
    const module3 = await prisma.module.findUnique({
      where: { moduleNumber: 3 }
    });
    
    if (!module3) {
      console.log('❌ Module 3 not found');
      return;
    }
    
    let content = module3.content;
    console.log('📖 Original content length:', content.length);
    
    // Save backup
    fs.writeFileSync('/tmp/module3_before_fix.html', content);
    console.log('✅ Backup saved to /tmp/module3_before_fix.html');
    
    // Find the existing title section
    // Looking for patterns like:
    // "Module 3: Framing"
    // "Building the Skeleton: From Foundation to Roof Structure"
    // "Advanced Construction Management and Civil Engineering Practice"
    
    // Replace the title section with proper white card formatting
    // This pattern should match the beginning title area before Learning Objectives
    const titlePattern = /(<div[^>]*>[\s\S]*?)(Module 3:\s*Framing[\s\S]*?Advanced Construction Management and Civil Engineering Practice[\s\S]*?)(<div[^>]*background:\s*#BEFFD1)/i;
    
    const newTitleSection = `<div style="background: white; padding: 40px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
  <h1 style="margin: 0 0 20px 0; font-size: 2.5em; font-weight: 700; color: black;">Module 3: Framing</h1>
  <p style="font-size: 1.2em; margin: 0; color: #333;">Advanced Construction Management and Civil Engineering Practice</p>
</div>

`;
    
    if (titlePattern.test(content)) {
      content = content.replace(titlePattern, `$1${newTitleSection}$3`);
      console.log('✅ Title section updated using pattern match');
    } else {
      // Alternative approach: find and replace the specific text directly
      // Look for the plain text version and replace it
      const simplePattern = /Module 3:\s*Framing[\s\S]{0,200}?Advanced Construction Management and Civil Engineering Practice/i;
      
      if (simplePattern.test(content)) {
        content = content.replace(simplePattern, newTitleSection.trim());
        console.log('✅ Title section updated using simple pattern');
      } else {
        console.log('⚠️  Could not find title pattern, trying manual insertion');
        // Insert before Learning Objectives as a fallback
        const learningObjectivesPattern = /(<div[^>]*background:\s*#BEFFD1)/i;
        if (learningObjectivesPattern.test(content)) {
          content = content.replace(learningObjectivesPattern, `${newTitleSection}$1`);
          console.log('✅ Title section inserted before Learning Objectives');
        }
      }
    }
    
    console.log('📝 New content length:', content.length);
    
    // Update the database
    await prisma.module.update({
      where: { moduleNumber: 3 },
      data: { content }
    });
    
    console.log('✅ Module 3 header updated in database');
    
    // Save to file for verification
    fs.writeFileSync('/tmp/module3_updated.html', content);
    console.log('✅ Updated content saved to /tmp/module3_updated.html');
    
  } catch (error) {
    console.error('❌ Error fixing Module 3 header:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixModule3Header();
