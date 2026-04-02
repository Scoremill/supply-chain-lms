import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();
const prisma = new PrismaClient();

async function syncModule5ToSeed() {
  try {
    const module5 = await prisma.module.findUnique({
      where: { moduleNumber: 5 }
    });

    if (!module5) {
      console.log('Module 5 not found');
      return;
    }

    const seedPath = 'scripts/seed.ts';
    let seedContent = fs.readFileSync(seedPath, 'utf-8');

    // Escape the content for the seed file
    const escapedContent = module5.content
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$');

    // Find and replace Module 5's content in the seed file
    const module5Pattern = /(moduleNumber:\s*5,[\s\S]*?content:\s*)`[\s\S]*?`,/;
    
    if (seedContent.match(module5Pattern)) {
      seedContent = seedContent.replace(
        module5Pattern,
        `$1\`${escapedContent}\`,`
      );

      fs.writeFileSync(seedPath, seedContent, 'utf-8');
      console.log('✓ Successfully synced Module 5 to seed.ts');
      console.log(`Content length: ${module5.content.length} characters`);
    } else {
      console.log('Could not find Module 5 pattern in seed.ts');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

syncModule5ToSeed();
