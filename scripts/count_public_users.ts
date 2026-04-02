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
    select: {
      email: true,
      role: true,
      name: true
    },
    orderBy: { email: 'asc' }
  });

  const billableUsers = allPublicUsers.filter(u => u.role !== 'SUPER_ADMIN');
  const superAdmins = allPublicUsers.filter(u => u.role === 'SUPER_ADMIN');

  console.log('\n=== PUBLIC COMPANY USER COUNT ===\n');
  
  console.log('Billable Users (non-Super-Admins):');
  billableUsers.forEach((u, idx) => {
    console.log(`  ${idx + 1}. ${u.email} - ${u.role}`);
  });
  
  console.log('\nSuper Admins (not counted for billing):');
  superAdmins.forEach((u, idx) => {
    console.log(`  ${idx + 1}. ${u.email} - ${u.role}`);
  });
  
  console.log('\n=== COUNT SUMMARY ===');
  console.log(`Total users in Public company: ${allPublicUsers.length}`);
  console.log(`Billable users: ${billableUsers.length}`);
  console.log(`Super Admins (not billed): ${superAdmins.length}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
