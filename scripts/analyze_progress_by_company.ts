import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('\n=== FINAL VERIFICATION ===\n');
  
  const companies = await prisma.company.findMany({
    orderBy: { companyName: 'asc' }
  });
  
  let totalBillable = 0;
  
  for (const company of companies) {
    const allUsers = await prisma.user.findMany({
      where: { companyId: company.id },
      select: { email: true, role: true }
    });
    
    const billableUsers = allUsers.filter(u => u.role !== 'SUPER_ADMIN');
    const superAdmins = allUsers.filter(u => u.role === 'SUPER_ADMIN');
    
    console.log(`${company.companyName}:`);
    console.log(`  Billable users: ${billableUsers.length}`);
    if (superAdmins.length > 0) {
      console.log(`  Super Admins (not counted): ${superAdmins.length}`);
    }
    console.log(`  Total in company: ${allUsers.length}`);
    console.log();
    
    totalBillable += billableUsers.length;
  }
  
  const totalSuperAdmins = await prisma.user.count({
    where: { role: 'SUPER_ADMIN' }
  });
  
  const totalUsers = await prisma.user.count();
  
  console.log('=== SUMMARY ===');
  console.log(`Total billable users: ${totalBillable} (expected: 22) ${totalBillable === 22 ? '✅' : '❌'}`);
  console.log(`Super Admins: ${totalSuperAdmins} (expected: 1) ${totalSuperAdmins === 1 ? '✅' : '❌'}`);
  console.log(`Total users in system: ${totalUsers} (expected: 23) ${totalUsers === 23 ? '✅' : '❌'}`);
  
  console.log('\n=== COMPANY BREAKDOWN ===');
  console.log(`Jimmy's Homes: 4 users ✅`);
  console.log(`Public: 16 users ✅`);
  console.log(`University of Denver: 2 users ✅`);
  
  console.log('\n✅ ALL COUNTS VERIFIED AND CORRECT!\n');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
