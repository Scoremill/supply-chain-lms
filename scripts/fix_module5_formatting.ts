import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function fixModule5Formatting() {
  try {
    const module5 = await prisma.module.findUnique({
      where: { moduleNumber: 5 }
    });
    
    if (!module5) {
      console.log('Module 5 not found');
      return;
    }

    let updatedContent = module5.content;

    // 1. Replace the old title header section with the new white card styling
    const oldHeaderPattern = /<div class="header-section">[\s\S]*?<\/div>\s*<\/div>/;
    const newHeaderSection = `
<div style="background: white; padding: 40px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
  <h1 style="margin: 0 0 15px 0; font-size: 2.5em; color: black; font-weight: bold;">Module 5: Mechanical, Electrical, and Plumbing Rough-In (MEPs)</h1>
  <p style="margin: 0; font-size: 1.2em; color: #555;">Advanced Building Systems Integration and Trade Coordination Practice</p>
</div>
`;
    updatedContent = updatedContent.replace(oldHeaderPattern, newHeaderSection);

    // 2. Fix Learning Objectives section - add green background
    const learningObjectivesPattern = /<h2>Learning Objectives<\/h2>\s*<ul>([\s\S]*?)<\/ul>/;
    const learningObjectivesMatch = updatedContent.match(learningObjectivesPattern);
    
    if (learningObjectivesMatch) {
      const listItems = learningObjectivesMatch[1];
      const newLearningObjectives = `
<div style="background: #BEFFD1; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
  <h2 style="margin: 0 0 20px 0; font-size: 1.8em; color: black; font-weight: bold;">🎯 Learning Objectives</h2>
  <ul style="margin: 0; padding-left: 20px; font-size: 1.05em; line-height: 1.8; color: black;">${listItems}</ul>
</div>
`;
      updatedContent = updatedContent.replace(learningObjectivesPattern, newLearningObjectives);
    }

    // 3. Fix Conclusion section - add rose background matching Key Takeaways
    const conclusionPattern = /<h2>Conclusion: Integration Excellence as Foundation for Quality<\/h2>([\s\S]*?)(?=<div|$)/;
    const conclusionMatch = updatedContent.match(conclusionPattern);
    
    if (conclusionMatch) {
      const conclusionContent = conclusionMatch[1];
      const newConclusion = `
<div style="background: #fee2e2; padding: 30px; border-radius: 12px; margin-top: 30px;">
  <h2 style="margin: 0 0 20px 0; font-size: 1.8em; color: black; font-weight: bold;">🎓 Conclusion: Integration Excellence as Foundation for Quality</h2>
  <div style="color: black; line-height: 1.8;">${conclusionContent}</div>
</div>
`;
      updatedContent = updatedContent.replace(conclusionPattern, newConclusion);
    }

    // Update the database
    await prisma.module.update({
      where: { moduleNumber: 5 },
      data: { content: updatedContent }
    });

    console.log('✓ Successfully fixed Module 5 formatting');
    console.log('  - Added white card title header');
    console.log('  - Applied green background to Learning Objectives');
    console.log('  - Applied rose background to Conclusion section');
    console.log('\nPreview of updated content (first 2000 chars):');
    console.log(updatedContent.substring(0, 2000));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixModule5Formatting();
