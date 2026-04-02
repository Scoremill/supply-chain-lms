import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();
const prisma = new PrismaClient();

async function syncModule4ToSeed() {
  try {
    // Get the current Module 4 content from the database
    const module4 = await prisma.module.findUnique({
      where: { moduleNumber: 4 }
    });

    if (!module4) {
      console.log('Module 4 not found');
      return;
    }

    // Read the seed.ts file
    const seedPath = 'scripts/seed.ts';
    let seedContent = fs.readFileSync(seedPath, 'utf-8');

    // Create a properly escaped version of the content for the seed file
    const escapedContent = module4.content
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$');

    // Find and replace Module 4's content in the seed file
    // Look for the pattern: moduleNumber: 4, followed by content field
    const module4Pattern = /(moduleNumber:\s*4,[\s\S]*?content:\s*)`[\s\S]*?`,/;
    
    if (seedContent.match(module4Pattern)) {
      seedContent = seedContent.replace(
        module4Pattern,
        `$1\`${escapedContent}\`,`
      );

      // Write back to seed.ts
      fs.writeFileSync(seedPath, seedContent, 'utf-8');
      console.log('✓ Successfully synced Module 4 to seed.ts');
      console.log(`Content length: ${module4.content.length} characters`);
    } else {
      console.log('Could not find Module 4 pattern in seed.ts');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

syncModule4ToSeed();
