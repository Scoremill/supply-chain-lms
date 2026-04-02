import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const userToDelete = 'testusercucywvlx@example.com';
  
  console.log(`Deleting test user created during testing: ${userToDelete}`);
  
  await prisma.user.delete({
    where: { email: userToDelete }
  });
  
  console.log(`✅ Deleted: ${userToDelete}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
