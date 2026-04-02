import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanup() {
  try {
    // Find all test users created during testing
    const testUsers = await prisma.user.findMany({
      where: {
        email: {
          contains: 'testuser'
        }
      }
    });

    console.log(`Found ${testUsers.length} test users to delete`);
    
    for (const user of testUsers) {
      console.log(`Deleting: ${user.email}`);
      await prisma.user.delete({
        where: { id: user.id }
      });
    }
    
    console.log('✅ Cleanup complete');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanup();
