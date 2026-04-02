import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function checkModule5() {
  try {
    const module5 = await prisma.module.findUnique({
      where: { moduleNumber: 5 }
    });
    
    if (module5) {
      console.log('Module 5 Title:', module5.title);
      console.log('\nModule 5 Content (first 3000 chars):');
      console.log(module5.content.substring(0, 3000));
      console.log('\n--- Looking for Conclusion section ---');
      const conclusionMatch = module5.content.match(/Conclusion[^<]*<\/h2>[\s\S]{0,1000}/);
      if (conclusionMatch) {
        console.log('Found Conclusion section:', conclusionMatch[0]);
      }
    } else {
      console.log('Module 5 not found');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkModule5();
