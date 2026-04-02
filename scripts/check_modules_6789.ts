import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function checkModules() {
  try {
    for (const moduleNum of [6, 7, 8, 9]) {
      const module = await prisma.module.findUnique({
        where: { moduleNumber: moduleNum }
      });
      
      if (module) {
        console.log(`\n===== MODULE ${moduleNum} =====`);
        console.log(`Title: ${module.title}`);
        console.log(`Description: ${module.description}`);
        console.log(`\nContent preview (first 1500 chars):`);
        console.log(module.content.substring(0, 1500));
        console.log('\n---');
      }
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkModules();
