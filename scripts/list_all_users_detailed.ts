import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    orderBy: { email: 'asc' },
    include: {
      company: true
    }
  });

  console.log('\n=== ALL USERS IN DATABASE ===\n');
  
  const byCompany: { [key: string]: any[] } = {};
  
  users.forEach(user => {
    const companyName = user.company?.companyName || 'No Company';
    if (!byCompany[companyName]) {
      byCompany[companyName] = [];
    }
    byCompany[companyName].push(user);
  });

  Object.keys(byCompany).sort().forEach(companyName => {
    console.log(`\n${companyName}:`);
    byCompany[companyName].forEach(user => {
      console.log(`  - ${user.email} (${user.role})`);
    });
    console.log(`  Total: ${byCompany[companyName].length}`);
  });

  console.log('\n=== SUMMARY ===');
  console.log(`Total users in database: ${users.length}`);
  const superAdmins = users.filter(u => u.role === 'SUPER_ADMIN').length;
  const billableUsers = users.length - superAdmins;
  console.log(`Super Admins: ${superAdmins}`);
  console.log(`Billable users: ${billableUsers}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
