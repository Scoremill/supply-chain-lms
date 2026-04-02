
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Exclude Super Admins from all user counts for accurate billing
    const [totalCompanies, totalUsers, totalStudents, totalCompanyAdmins, totalModules] = await Promise.all([
      prisma.company.count(),
      // Only count STUDENT and COMPANY_ADMIN roles (exclude SUPER_ADMIN)
      prisma.user.count({ 
        where: { 
          role: { 
            in: ['STUDENT', 'COMPANY_ADMIN'] 
          } 
        } 
      }),
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.user.count({ where: { role: 'COMPANY_ADMIN' } }),
      prisma.module.count()
    ]);

    return NextResponse.json({
      totalCompanies,
      totalUsers,
      totalStudents,
      totalCompanyAdmins,
      totalModules
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
