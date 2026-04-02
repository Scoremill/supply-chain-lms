import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const prisma = new PrismaClient();

async function syncToSeed() {
  try {
    // Get current Module 3 content from database
    const module3 = await prisma.module.findUnique({
      where: { moduleNumber: 3 }
    });
    
    if (!module3) {
      console.log('❌ Module 3 not found');
      return;
    }
    
    console.log('📖 Reading seed.ts...');
    const seedPath = 'scripts/seed.ts';
    let seedContent = fs.readFileSync(seedPath, 'utf-8');
    
    // Find the Module 3 content section in seed.ts
    const module3Pattern = /({[\s\S]*?moduleNumber:\s*3,[\s\S]*?content:\s*`)([\s\S]*?)`(\s*,[\s\S]*?})/;
    
    const match = seedContent.match(module3Pattern);
    
    if (match) {
      // Escape backticks in the content for template literal
      const escapedContent = module3.content.replace(/`/g, '\\`').replace(/\$/g, '\\$');
      
      // Replace the content
      const replacement = `${match[1]}${escapedContent}\`${match[3]}`;
      seedContent = seedContent.replace(module3Pattern, replacement);
      
      // Write back to seed.ts
      fs.writeFileSync(seedPath, seedContent);
      console.log('✅ seed.ts updated with Module 3 changes');
    } else {
      console.log('⚠️  Could not find Module 3 pattern in seed.ts');
    }
    
  } catch (error) {
    console.error('❌ Error syncing to seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

syncToSeed();
