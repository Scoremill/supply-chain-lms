import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const drew = await prisma.user.findUnique({
    where: { email: 'drujac5@hotmail.com' },
    include: { company: true }
  });

  console.log('\n=== Drew Jones Details ===');
  console.log(JSON.stringify(drew, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
