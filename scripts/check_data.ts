import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    select: {
      email: true,
      role: true,
      companyId: true,
      company: {
        select: {
          companyName: true,
          companyCode: true
        }
      }
    },
    orderBy: { email: 'asc' }
  });

  console.log('\n=== USER COMPANY ASSOCIATIONS ===\n');
  
  const byCompany: { [key: string]: any[] } = {};
  
  users.forEach(user => {
    const companyName = user.company?.companyName || 'No Company';
    if (!byCompany[companyName]) {
      byCompany[companyName] = [];
    }
    byCompany[companyName].push(user);
  });

  Object.keys(byCompany).sort().forEach(companyName => {
    const users = byCompany[companyName];
    const nonSuperAdmins = users.filter(u => u.role !== 'SUPER_ADMIN');
    console.log(`\n${companyName}: ${nonSuperAdmins.length} billable users`);
    users.forEach(user => {
      const roleLabel = user.role === 'SUPER_ADMIN' ? '(SUPER_ADMIN - not counted)' : `(${user.role})`;
      console.log(`  - ${user.email} ${roleLabel}`);
    });
  });

  const totalUsers = users.length;
  const superAdmins = users.filter(u => u.role === 'SUPER_ADMIN').length;
  const billableUsers = totalUsers - superAdmins;
  
  console.log('\n=== SUMMARY ===');
  console.log(`Total users: ${totalUsers}`);
  console.log(`Super Admins (not billable): ${superAdmins}`);
  console.log(`Billable users: ${billableUsers}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
