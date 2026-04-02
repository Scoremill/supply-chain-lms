import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const companies = await prisma.company.findMany({
    orderBy: { companyName: 'asc' }
  });

  console.log('\n=== ALL COMPANY USER COUNTS ===\n');

  let totalBillable = 0;
  let totalSuperAdmins = 0;

  for (const company of companies) {
    const users = await prisma.user.findMany({
      where: { companyId: company.id },
      select: { email: true, role: true }
    });

    const billable = users.filter(u => u.role !== 'SUPER_ADMIN').length;
    const superAdmins = users.filter(u => u.role === 'SUPER_ADMIN').length;

    totalBillable += billable;
    totalSuperAdmins += superAdmins;

    console.log(`${company.companyName} (${company.companyCode}):`);
    console.log(`  Billable: ${billable}`);
    console.log(`  Super Admins: ${superAdmins}`);
    console.log(`  Total: ${users.length}\n`);
  }

  console.log('=== TOTALS ===');
  console.log(`Total Billable Users: ${totalBillable}`);
  console.log(`Total Super Admins: ${totalSuperAdmins}`);
  console.log(`Grand Total: ${totalBillable + totalSuperAdmins}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
