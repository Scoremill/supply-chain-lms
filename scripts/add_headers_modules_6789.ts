import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function addHeadersToModules() {
  try {
    const modulesData = [
      {
        number: 6,
        title: "Module 6: Insulation and Drywall",
        subtitle: "Thermal Envelope Engineering and Interior Systems Installation"
      },
      {
        number: 7,
        title: "Module 7: Interior Finishes",
        subtitle: "Professional Painting, Trim Carpentry, and Flooring Installation"
      },
      {
        number: 8,
        title: "Module 8: Final Mechanicals & Exterior Completion",
        subtitle: "Trim-Out Systems, HVAC Commissioning, and Site Finishing"
      },
      {
        number: 9,
        title: "Module 9: Final Finishes & Cleaning",
        subtitle: "Appliance Installation, Quality Assurance, and Pre-Occupancy Preparation"
      }
    ];

    for (const moduleData of modulesData) {
      const module = await prisma.module.findUnique({
        where: { moduleNumber: moduleData.number }
      });
      
      if (!module) {
        console.log(`Module ${moduleData.number} not found`);
        continue;
      }

      let updatedContent = module.content;

      // Create the white card header
      const headerSection = `
<div style="background: white; padding: 40px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
  <h1 style="margin: 0 0 15px 0; font-size: 2.5em; color: black; font-weight: bold;">${moduleData.title}</h1>
  <p style="margin: 0; font-size: 1.2em; color: #555;">${moduleData.subtitle}</p>
</div>
`;

      // For Module 9, we need to remove the existing plain text header first
      if (moduleData.number === 9) {
        // Remove the old plain header
        updatedContent = updatedContent.replace(
          /<div class="module-container">\s*<h1>Module 9: Final Finishes & Pre-Occupancy Preparation<\/h1>\s*<p><strong>Advanced Construction Management and Quality Assurance Practice<\/strong><\/p>/,
          '<div class="module-container">'
        );
      }

      // Find the position right after the opening main div or module-content div
      const patterns = [
        /<div style="font-family: system-ui[^>]+>/,
        /<div class="module-content">/,
        /<div class="module-container">/
      ];

      let inserted = false;
      for (const pattern of patterns) {
        const match = updatedContent.match(pattern);
        if (match && match.index !== undefined) {
          const insertPosition = match.index + match[0].length;
          updatedContent = updatedContent.slice(0, insertPosition) + '\n' + headerSection + '\n' + updatedContent.slice(insertPosition);
          inserted = true;
          break;
        }
      }

      if (!inserted) {
        console.log(`Could not find insertion point for Module ${moduleData.number}`);
        continue;
      }

      // Update the database
      await prisma.module.update({
        where: { moduleNumber: moduleData.number },
        data: { content: updatedContent }
      });

      console.log(`✓ Successfully added header to Module ${moduleData.number}`);
      console.log(`  Title: ${moduleData.title}`);
      console.log(`  Subtitle: ${moduleData.subtitle}\n`);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addHeadersToModules();
