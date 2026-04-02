import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const userToDelete = 'testuserifbbtwxc@example.com';
  
  console.log(`Deleting newly created user: ${userToDelete}`);
  
  await prisma.user.delete({
    where: { email: userToDelete }
  });
  
  console.log(`✅ Deleted: ${userToDelete}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
