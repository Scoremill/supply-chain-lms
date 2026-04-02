import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const userToDelete = 'testuser0b806xe5@example.com';
  
  console.log(`Attempting to delete user: ${userToDelete}`);
  
  const user = await prisma.user.findUnique({
    where: { email: userToDelete }
  });
  
  if (!user) {
    console.log(`User ${userToDelete} not found.`);
    return;
  }
  
  // Delete the user
  await prisma.user.delete({
    where: { email: userToDelete }
  });
  
  console.log(`✅ Successfully deleted user: ${userToDelete}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
