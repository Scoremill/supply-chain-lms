
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function fixConclusions() {
  try {
    console.log('🔧 Fixing conclusion sections...\n');
    
    for (let modNum = 1; modNum <= 9; modNum++) {
      const module = await prisma.module.findFirst({
        where: { moduleNumber: modNum }
      });
      
      if (!module) continue;
      
      let content = module.content;
      
      // Pattern: h2 with "Conclusion" followed by content until next h2 or closing divs
      const conclusionPattern = /(<h2[^>]*>.*?Conclusion.*?<\/h2>)([\s\S]*?)(?=<h2|<\/section>|<\/div>\s*<\/div>\s*$)/gi;
      
      const matches = [];
      let match;
      while ((match = conclusionPattern.exec(content)) !== null) {
        matches.push({ index: match.index, fullMatch: match[0], heading: match[1], content: match[2] });
      }
      
      // Process matches in reverse order to maintain indices
      for (const m of matches.reverse()) {
        const conclusionContent = m.content.trim();
        
        const newConclusion = `<div style="background: #fee2e2; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
  <h2 style="margin: 0 0 20px 0; color: black; font-weight: bold;">🎓 Conclusion</h2>
${conclusionContent}
</div>`;
        
        content = content.substring(0, m.index) + newConclusion + content.substring(m.index + m.fullMatch.length);
      }
      
      if (matches.length > 0) {
        await prisma.module.update({
          where: { id: module.id },
          data: { content }
        });
        
        console.log(`✅ Module ${modNum}: Fixed ${matches.length} conclusion section(s)`);
      } else {
        console.log(`ℹ️  Module ${modNum}: No conclusion sections found or already formatted`);
      }
    }
    
    console.log('\n✅ All conclusion sections fixed!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixConclusions();
