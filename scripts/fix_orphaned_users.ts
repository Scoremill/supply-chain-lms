
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixOrphanedUsers() {
  try {
    // Find the companies
    const publicCompany = await prisma.company.findFirst({
      where: { companyName: 'Public' }
    });

    const jimmysHomes = await prisma.company.findFirst({
      where: { companyName: "Jimmy's Homes" }
    });

    if (!publicCompany) {
      console.error('❌ Could not find "public" company');
      return;
    }

    if (!jimmysHomes) {
      console.error('❌ Could not find "Jimmy\'s Homes" company');
      return;
    }

    console.log('✅ Found companies:');
    console.log(`   - public: ${publicCompany.id}`);
    console.log(`   - Jimmy's Homes: ${jimmysHomes.id}`);

    // Update john@doe.com to public company
    const johnUpdate = await prisma.user.updateMany({
      where: { email: 'john@doe.com' },
      data: { companyId: publicCompany.id }
    });

    console.log(`\n✅ Updated john@doe.com: ${johnUpdate.count} record(s)`);

    // Update testuserqarw488p@example.com to Jimmy's Homes
    const testUserUpdate = await prisma.user.updateMany({
      where: { email: 'testuserqarw488p@example.com' },
      data: { companyId: jimmysHomes.id }
    });

    console.log(`✅ Updated testuserqarw488p@example.com: ${testUserUpdate.count} record(s)`);

    // Verify the updates
    const john = await prisma.user.findUnique({
      where: { email: 'john@doe.com' },
      include: { company: true }
    });

    const testUser = await prisma.user.findUnique({
      where: { email: 'testuserqarw488p@example.com' },
      include: { company: true }
    });

    console.log('\n📊 Verification:');
    console.log(`   - john@doe.com → ${john?.company?.companyName || 'NO COMPANY'}`);
    console.log(`   - testuserqarw488p@example.com → ${testUser?.company?.companyName || 'NO COMPANY'}`);

  } catch (error) {
    console.error('❌ Error fixing orphaned users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixOrphanedUsers();
