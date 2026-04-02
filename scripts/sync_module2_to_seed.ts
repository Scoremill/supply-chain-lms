import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const prisma = new PrismaClient();

async function syncToSeed() {
  try {
    // Get current Module 2 content from database
    const module2 = await prisma.module.findUnique({
      where: { moduleNumber: 2 }
    });
    
    if (!module2) {
      console.log('❌ Module 2 not found');
      return;
    }
    
    console.log('📖 Reading seed.ts...');
    const seedPath = 'scripts/seed.ts';
    let seedContent = fs.readFileSync(seedPath, 'utf-8');
    
    // Find the Module 2 content section in seed.ts
    // We need to match the pattern for moduleNumber: 2
    const module2Pattern = /({[\s\S]*?moduleNumber:\s*2,[\s\S]*?content:\s*`)([\s\S]*?)`(\s*,[\s\S]*?})/;
    
    const match = seedContent.match(module2Pattern);
    
    if (match) {
      // Escape backticks in the content for template literal
      const escapedContent = module2.content.replace(/`/g, '\\`').replace(/\$/g, '\\$');
      
      // Replace the content
      const replacement = `${match[1]}${escapedContent}\`${match[3]}`;
      seedContent = seedContent.replace(module2Pattern, replacement);
      
      // Write back to seed.ts
      fs.writeFileSync(seedPath, seedContent);
      console.log('✅ seed.ts updated with Module 2 changes');
    } else {
      console.log('⚠️  Could not find Module 2 pattern in seed.ts');
    }
    
  } catch (error) {
    console.error('❌ Error syncing to seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

syncToSeed();
