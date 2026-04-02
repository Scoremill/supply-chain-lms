import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const prisma = new PrismaClient();

async function readModules() {
  try {
    // Read Module 2
    const module2 = await prisma.module.findUnique({
      where: { moduleNumber: 2 }
    });
    
    if (module2) {
      fs.writeFileSync('/tmp/module2_current.html', module2.content);
      console.log('✅ Module 2 content saved to /tmp/module2_current.html');
      console.log(`Module 2 content length: ${module2.content.length} characters`);
    }
    
    // Read Module 10
    const module10 = await prisma.module.findUnique({
      where: { moduleNumber: 10 }
    });
    
    if (module10) {
      fs.writeFileSync('/tmp/module10_current.html', module10.content);
      console.log('✅ Module 10 content saved to /tmp/module10_current.html');
      console.log(`Module 10 content length: ${module10.content.length} characters`);
    }
    
  } catch (error) {
    console.error('❌ Error reading modules:', error);
  } finally {
    await prisma.$disconnect();
  }
}

readModules();
