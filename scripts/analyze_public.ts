import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const publicCompany = await prisma.company.findFirst({
    where: { companyCode: 'PUBLIC' }
  });

  if (!publicCompany) {
    console.error('Public company not found!');
    return;
  }

  const allPublicUsers = await prisma.user.findMany({
    where: { companyId: publicCompany.id },
    orderBy: { email: 'asc' }
  });

  console.log('\n=== ALL Public Company Users ===\n');
  console.log(`Total users in Public company: ${allPublicUsers.length}`);
  
  const superAdmins = allPublicUsers.filter(u => u.role === 'SUPER_ADMIN');
  const nonSuperAdmins = allPublicUsers.filter(u => u.role !== 'SUPER_ADMIN');
  
  console.log(`\nSuper Admins (not counted): ${superAdmins.length}`);
  superAdmins.forEach(u => console.log(`  - ${u.email}`));
  
  console.log(`\nBillable users (non-Super-Admins): ${nonSuperAdmins.length}`);
  nonSuperAdmins.forEach((u, idx) => console.log(`  ${idx + 1}. ${u.email} (${u.role})`));
  
  console.log('\n=== EXPECTED FROM PDF ===');
  console.log('Public should have 16 billable users');
  console.log('Plus 1 Super Admin (not counted in billing)');
  console.log('Total in Public company record: 17');
  console.log('\n=== ACTUAL ===');
  console.log(`Billable users: ${nonSuperAdmins.length}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
