import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        company: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    console.log('\n=== All Remaining Users ===\n');
    users.forEach(user => {
      console.log(`${user.email} - ${user.role} - ${user.company?.companyName || 'No Company'}`);
    });
    
    console.log(`\nTotal: ${users.length} users`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listUsers();
