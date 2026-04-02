import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteUser() {
  try {
    const email = 'Eric.Holt@du.edu';
    
    // First, check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        company: true,
        progress: true
      }
    });

    if (!user) {
      console.log(`User with email ${email} not found.`);
      return;
    }

    console.log(`Found user: ${user.name} (${user.email})`);
    console.log(`Role: ${user.role}`);
    console.log(`Company: ${user.company?.companyName || 'None'}`);
    console.log(`Progress records: ${user.progress.length}`);
    
    // Delete the user (UserProgress will be cascade deleted)
    await prisma.user.delete({
      where: { email }
    });

    console.log(`\n✅ Successfully deleted user: ${email}`);
    console.log('All associated progress records have been removed.');
    
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

deleteUser();
