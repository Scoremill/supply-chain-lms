import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function checkModule4() {
  try {
    const module4 = await prisma.module.findUnique({
      where: { moduleNumber: 4 }
    });
    
    if (module4) {
      console.log('Module 4 Content (first 2000 chars):');
      console.log(module4.content.substring(0, 2000));
      console.log('\n--- End of preview ---');
    } else {
      console.log('Module 4 not found');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkModule4();
