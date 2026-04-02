import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyState() {
  try {
    const allUsers = await prisma.user.findMany({
      include: {
        company: true,
      },
    });

    console.log(`\n📊 Total Users: ${allUsers.length}`);
    
    const superAdmins = allUsers.filter(u => u.role === 'SUPER_ADMIN');
    const companyAdmins = allUsers.filter(u => u.role === 'COMPANY_ADMIN');
    const students = allUsers.filter(u => u.role === 'STUDENT');
    
    console.log(`   - Super Admins: ${superAdmins.length}`);
    console.log(`   - Company Admins: ${companyAdmins.length}`);
    console.log(`   - Students: ${students.length}`);
    
    const orphaned = allUsers.filter(u => u.role !== 'SUPER_ADMIN' && !u.companyId);
    console.log(`\n⚠️  Orphaned Users (should be 0): ${orphaned.length}`);
    
    if (orphaned.length > 0) {
      console.log('Orphaned users:', orphaned.map(u => u.email));
    }
    
    const companies = await prisma.company.findMany({
      include: {
        _count: {
          select: { users: true }
        }
      }
    });
    
    console.log(`\n🏢 Companies: ${companies.length}`);
    companies.forEach(c => {
      console.log(`   - ${c.companyName}: ${c._count.users} users`);
    });
    
    console.log('\n✅ Database state verified\n');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyState();
