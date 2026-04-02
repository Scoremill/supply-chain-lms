import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('\n=== FIXING USER COMPANIES ===\n');

  // Get company IDs
  const publicCompany = await prisma.company.findFirst({ where: { companyCode: 'PUBLIC' } });
  const jimmysHomes = await prisma.company.findFirst({ where: { companyCode: 'JH-110125' } });
  const universityOfDenver = await prisma.company.findFirst({ where: { companyCode: 'UD-010126' } });

  if (!publicCompany || !jimmysHomes || !universityOfDenver) {
    console.error('ERROR: Could not find all companies!');
    return;
  }

  console.log('Found companies:');
  console.log(`- Public: ${publicCompany.id}`);
  console.log(`- Jimmy's Homes: ${jimmysHomes.id}`);
  console.log(`- University of Denver: ${universityOfDenver.id}`);

  // Step 1: Delete orphaned user
  console.log('\n--- Step 1: Deleting orphaned user ---');
  const orphanedEmail = 'testuserey4dves4@example.com';
  const deleteResult = await prisma.user.deleteMany({
    where: { email: orphanedEmail }
  });
  console.log(`Deleted ${deleteResult.count} orphaned user(s): ${orphanedEmail}`);

  // Step 2: Reassociate users with correct companies
  console.log('\n--- Step 2: Reassociating users with companies ---');

  // Public company users (16 users)
  const publicUsers = [
    'testuservcvinsa9@example.com',
    'testuser0opa8f6j@example.com',
    'testuser3n4p9mua@example.com',
    'testuserqebbvprw@example.com',
    'testusernyyfynvn@example.com',
    'testuserzpj0xkbx@example.com',
    'testuser3lp022ql@example.com',
    'testuser056569z8@example.com',
    'testuserad7uavyg@example.com',
    'testuserehng1lae@example.com',
    'testuservd5nke70@example.com',
    'testuser1k2uo305@example.com',
    'testuseroz83r3j6@example.com',
    'testuserkzqr7bpi@example.com',
    'testuser4ipz11fz@example.com',
    'john@doe.com'
  ];

  const publicResult = await prisma.user.updateMany({
    where: { email: { in: publicUsers } },
    data: { companyId: publicCompany.id }
  });
  console.log(`✓ Associated ${publicResult.count} users with Public company`);

  // Jimmy's Homes users (4 users)
  const jimmysUsers = [
    'Jimmy.Smith@Jimmyshomes.pro',
    'testusery803poeb@example.com',
    'testuser8obwubsm@example.com',
    'testuserqarw488p@example.com'
  ];

  const jimmysResult = await prisma.user.updateMany({
    where: { email: { in: jimmysUsers } },
    data: { companyId: jimmysHomes.id }
  });
  console.log(`✓ Associated ${jimmysResult.count} users with Jimmy's Homes`);

  // University of Denver users (2 users)
  const denverUsers = [
    'drujac5@hotmail.com',
    'Eric.Holt@du.edu'
  ];

  const denverResult = await prisma.user.updateMany({
    where: { email: { in: denverUsers } },
    data: { companyId: universityOfDenver.id }
  });
  console.log(`✓ Associated ${denverResult.count} users with University of Denver`);

  // Super Admin should have Public company but isn't counted
  const superAdminResult = await prisma.user.updateMany({
    where: { email: 'leanhomebuildingadvisors@gmail.com' },
    data: { companyId: publicCompany.id }
  });
  console.log(`✓ Associated ${superAdminResult.count} Super Admin with Public company`);

  // Verify final counts
  console.log('\n--- Step 3: Verifying final counts ---');
  
  const publicCount = await prisma.user.count({
    where: { 
      companyId: publicCompany.id,
      role: { not: 'SUPER_ADMIN' }
    }
  });
  console.log(`Public: ${publicCount} users (expected: 16)`);

  const jimmysCount = await prisma.user.count({
    where: { companyId: jimmysHomes.id }
  });
  console.log(`Jimmy's Homes: ${jimmysCount} users (expected: 4)`);

  const denverCount = await prisma.user.count({
    where: { companyId: universityOfDenver.id }
  });
  console.log(`University of Denver: ${denverCount} users (expected: 2)`);

  const totalBillable = publicCount + jimmysCount + denverCount;
  console.log(`\nTotal billable users: ${totalBillable} (expected: 22)`);

  const superAdminCount = await prisma.user.count({
    where: { role: 'SUPER_ADMIN' }
  });
  console.log(`Super Admins (not billable): ${superAdminCount}`);
  console.log(`Total users in system: ${totalBillable + superAdminCount}`);

  console.log('\n✅ FIX COMPLETE!\n');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
