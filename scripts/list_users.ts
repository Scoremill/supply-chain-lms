import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        company: true
      },
      orderBy: {
        role: 'asc'
      }
    });

    console.log(`\nTotal users: ${users.length}\n`);
    
    users.forEach(user => {
      console.log(`Email: ${user.email}`);
      console.log(`Name: ${user.name}`);
      console.log(`Role: ${user.role}`);
      console.log(`Company: ${user.company?.companyName || 'None'}`);
      console.log('---');
    });
    
  } catch (error) {
    console.error('Error listing users:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

listUsers();
