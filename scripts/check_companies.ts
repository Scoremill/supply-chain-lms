import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const companies = await prisma.company.findMany({
    orderBy: { companyName: 'asc' }
  });

  console.log('\n=== COMPANIES IN DATABASE ===\n');
  companies.forEach(company => {
    console.log(`- ${company.companyName} (ID: ${company.id}, Code: ${company.companyCode}, Public: ${company.isPublic})`);
  });
  console.log(`\nTotal companies: ${companies.length}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
