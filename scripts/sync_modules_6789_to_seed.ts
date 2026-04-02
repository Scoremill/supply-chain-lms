import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();
const prisma = new PrismaClient();

async function syncModulesToSeed() {
  try {
    const seedPath = 'scripts/seed.ts';
    let seedContent = fs.readFileSync(seedPath, 'utf-8');

    for (const moduleNum of [6, 7, 8, 9]) {
      const module = await prisma.module.findUnique({
        where: { moduleNumber: moduleNum }
      });

      if (!module) {
        console.log(`Module ${moduleNum} not found`);
        continue;
      }

      // Escape the content for the seed file
      const escapedContent = module.content
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$');

      // Find and replace the module's content in the seed file
      const modulePattern = new RegExp(
        `(moduleNumber:\\s*${moduleNum},[\\s\\S]*?content:\\s*)\`[\\s\\S]*?\`,`,
        ''
      );
      
      if (seedContent.match(modulePattern)) {
        seedContent = seedContent.replace(
          modulePattern,
          `$1\`${escapedContent}\`,`
        );
        console.log(`✓ Synced Module ${moduleNum} to seed.ts (${module.content.length} chars)`);
      } else {
        console.log(`Could not find Module ${moduleNum} pattern in seed.ts`);
      }
    }

    // Write back to seed.ts
    fs.writeFileSync(seedPath, seedContent, 'utf-8');
    console.log('\n✓ All modules synced to seed.ts successfully');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

syncModulesToSeed();
