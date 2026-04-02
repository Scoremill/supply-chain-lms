import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getCompanyUsers(companyId: string) {
  return await prisma.user.findMany({
    where: {
      companyId: companyId,
      role: { not: 'SUPER_ADMIN' }
    },
    orderBy: { name: 'asc' }
  });
}

async function main() {
  const companies = await prisma.company.findMany({
    orderBy: { companyName: 'asc' }
  });

  console.log('\n=== Testing Company Dropdown Data ===\n');
  
  for (const company of companies) {
    const users = await getCompanyUsers(company.id);
    console.log(`${company.companyName} (${users.length} users)`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
