import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function restoreModule4Header() {
  try {
    const module4 = await prisma.module.findUnique({
      where: { moduleNumber: 4 }
    });
    
    if (!module4) {
      console.log('Module 4 not found');
      return;
    }

    // The header that needs to be added back
    const headerSection = `
<div style="background: white; padding: 40px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
  <h1 style="margin: 0 0 15px 0; font-size: 2.5em; color: black; font-weight: bold;">Module 4: Exterior Finishes & Building Envelope</h1>
  <p style="margin: 0; font-size: 1.2em; color: #555;">Advanced Construction Management and Weatherproofing Systems</p>
</div>
`;

    // Insert the header at the beginning, right after the opening main div
    let updatedContent = module4.content;
    
    // Find the position right after the opening main div
    const mainDivPattern = /<div style="font-family: system-ui[^>]+>/;
    const match = updatedContent.match(mainDivPattern);
    
    if (match && match.index !== undefined) {
      const insertPosition = match.index + match[0].length;
      updatedContent = updatedContent.slice(0, insertPosition) + '\n' + headerSection + '\n' + updatedContent.slice(insertPosition);
    } else {
      console.log('Could not find main div pattern');
      return;
    }

    // Update the database
    await prisma.module.update({
      where: { moduleNumber: 4 },
      data: { content: updatedContent }
    });

    console.log('✓ Successfully restored Module 4 header');
    console.log('\nPreview of updated content (first 1500 chars):');
    console.log(updatedContent.substring(0, 1500));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

restoreModule4Header();
