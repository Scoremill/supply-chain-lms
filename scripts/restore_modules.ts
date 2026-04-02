
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function restoreModules() {
  console.log('Restoring modules from backup files...\n');
  
  for (let i = 1; i <= 9; i++) {
    const backupFile = `/tmp/module${i}_original.html`;
    
    if (!fs.existsSync(backupFile)) {
      console.log(`❌ Backup file for Module ${i} not found`);
      continue;
    }
    
    const originalContent = fs.readFileSync(backupFile, 'utf-8');
    
    const module = await prisma.module.findFirst({
      where: { moduleNumber: i }
    });
    
    if (module) {
      await prisma.module.update({
        where: { id: module.id },
        data: { content: originalContent }
      });
      
      console.log(`✅ Module ${i} restored (${originalContent.length} chars)`);
    }
  }
  
  console.log('\n✅ All modules restored from backup');
  await prisma.$disconnect();
}

restoreModules();
