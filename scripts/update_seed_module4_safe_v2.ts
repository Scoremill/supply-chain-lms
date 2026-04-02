import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const prisma = new PrismaClient();

async function updateSeedSafely() {
  try {
    // Get Module 4 content from database
    const module4 = await prisma.module.findUnique({
      where: { moduleNumber: 4 }
    });
    
    if (!module4) {
      console.log('❌ Module 4 not found in database');
      return;
    }
    
    console.log(`✅ Retrieved Module 4 content (${module4.content.length} chars)`);
    
    // Read seed.ts
    const seedPath = 'scripts/seed.ts';
    let seedContent = fs.readFileSync(seedPath, 'utf-8');
    
    // Find Module 4 section start
    const module4Start = seedContent.indexOf('moduleNumber: 4,');
    if (module4Start === -1) {
      console.log('❌ Could not find Module 4');
      return;
    }
    
    // Find content: ` after Module 4
    const contentMarker = seedContent.indexOf('content: `', module4Start);
    if (contentMarker === -1) {
      console.log('❌ Could not find content marker');
      return;
    }
    
    const contentStart = contentMarker + 'content: `'.length;
    
    // Find the end of content - look for ` followed by },
    let bracketCount = 1; // We're inside the module object
    let inBacktick = true; // We're inside the content template literal
    let i = contentStart;
    let contentEnd = -1;
    
    while (i < seedContent.length && bracketCount > 0) {
      const char = seedContent[i];
      const prevChar = i > 0 ? seedContent[i - 1] : '';
      
      // Check for unescaped backtick
      if (char === '`' && prevChar !== '\\') {
        if (inBacktick) {
          // Found the closing backtick for content
          contentEnd = i;
          break;
        }
      }
      
      i++;
    }
    
    if (contentEnd === -1) {
      console.log('❌ Could not find end of content');
      return;
    }
    
    console.log('✅ Found Module 4 content section in seed.ts');
    console.log(`   Old content length: ${contentEnd - contentStart} chars`);
    
    // Escape content for template literal
    let escapedContent = module4.content
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$');
    
    // Build new seed content
    const newSeedContent = 
      seedContent.substring(0, contentStart) +
      escapedContent +
      seedContent.substring(contentEnd);
    
    // Verify the replacement
    if (newSeedContent.length < seedContent.length * 0.9) {
      console.log('❌ Replacement resulted in unexpectedly short file, aborting');
      return;
    }
    
    console.log(`   New seed file length: ${newSeedContent.length} chars`);
    
    // Write back
    fs.writeFileSync(seedPath, newSeedContent);
    console.log('✅ seed.ts updated successfully');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateSeedSafely();
