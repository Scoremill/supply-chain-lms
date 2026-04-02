import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const prisma = new PrismaClient();

async function fixModule4LearningObjectives() {
  try {
    // Read current Module 4 content
    const module4 = await prisma.module.findUnique({
      where: { moduleNumber: 4 }
    });
    
    if (!module4) {
      console.log('❌ Module 4 not found');
      return;
    }
    
    let content = module4.content;
    console.log('📖 Original content length:', content.length);
    
    // Save backup
    fs.writeFileSync('/tmp/module4_before_fix.html', content);
    console.log('✅ Backup saved to /tmp/module4_before_fix.html');
    
    // Find and extract the Learning Objectives section
    // Looking for the section that starts with "Learning Objectives" and contains the bullet list
    const learningObjectivesPattern = /<div[^>]*>[\s\S]*?<h2[^>]*>\s*🎯?\s*Learning Objectives\s*<\/h2>([\s\S]*?)<\/div>/i;
    
    // Alternative pattern to match the current white background section
    const alternativePattern = /<div[^>]*style="[^"]*background[^"]*"[^>]*>[\s\S]*?Learning Objectives[\s\S]*?(<ul[\s\S]*?<\/ul>)[\s\S]*?<\/div>/i;
    
    const match = content.match(learningObjectivesPattern) || content.match(alternativePattern);
    
    if (match) {
      console.log('✅ Found Learning Objectives section');
      
      // Extract the list items
      const listItemsMatch = match[0].match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
      
      if (listItemsMatch) {
        console.log(`✅ Found ${listItemsMatch.length} learning objectives`);
        
        // Build the new Learning Objectives section with proper styling
        const newLearningObjectives = `<div style="background: #BEFFD1; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
  <h2 style="margin: 0 0 20px 0; font-size: 1.8em; color: black; font-weight: bold;">🎯 Learning Objectives</h2>
  <ul style="margin: 0; padding-left: 20px; font-size: 1.05em; line-height: 1.8; color: black;">
${listItemsMatch.map(li => {
  // Clean up the list item and ensure proper styling
  const cleanLi = li.replace(/<li[^>]*>/, '    <li>').replace(/<\/li>/, '</li>');
  return cleanLi;
}).join('\n')}
  </ul>
</div>`;
        
        // Replace the old section with the new one
        content = content.replace(match[0], newLearningObjectives);
        console.log('✅ Learning Objectives section updated with pale green background');
      }
    } else {
      console.log('⚠️  Could not find Learning Objectives section with standard pattern');
      console.log('Trying broader search...');
      
      // Broader search pattern
      const broadPattern = /(<[^>]+>[\s\S]*?Learning Objectives[\s\S]*?<ul[\s\S]*?<\/ul>[\s\S]*?<\/div>)/i;
      const broadMatch = content.match(broadPattern);
      
      if (broadMatch) {
        console.log('✅ Found Learning Objectives with broader search');
        
        // Extract list items from the matched section
        const listItemsMatch = broadMatch[0].match(/<li[^>]*>[\s\S]*?<\/li>/gi);
        
        if (listItemsMatch) {
          console.log(`✅ Found ${listItemsMatch.length} learning objectives`);
          
          const newLearningObjectives = `<div style="background: #BEFFD1; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
  <h2 style="margin: 0 0 20px 0; font-size: 1.8em; color: black; font-weight: bold;">🎯 Learning Objectives</h2>
  <ul style="margin: 0; padding-left: 20px; font-size: 1.05em; line-height: 1.8; color: black;">
${listItemsMatch.map(li => {
  // Clean and extract text content
  const textContent = li.replace(/<li[^>]*>/, '').replace(/<\/li>/, '').trim();
  return `    <li>${textContent}</li>`;
}).join('\n')}
  </ul>
</div>`;
          
          content = content.replace(broadMatch[0], newLearningObjectives);
          console.log('✅ Learning Objectives section replaced with proper formatting');
        }
      }
    }
    
    console.log('📝 New content length:', content.length);
    
    // Update the database
    await prisma.module.update({
      where: { moduleNumber: 4 },
      data: { content }
    });
    
    console.log('✅ Module 4 Learning Objectives updated in database');
    
    // Save to file for verification
    fs.writeFileSync('/tmp/module4_updated.html', content);
    console.log('✅ Updated content saved to /tmp/module4_updated.html');
    
  } catch (error) {
    console.error('❌ Error fixing Module 4 Learning Objectives:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixModule4LearningObjectives();
