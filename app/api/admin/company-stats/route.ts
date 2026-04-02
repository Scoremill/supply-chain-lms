import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get('companyId');

    let targetCompanyId = companyId;

    if (session.user.role === 'COMPANY_ADMIN') {
      targetCompanyId = session.user.companyId;
    } else if (session.user.role === 'SUPER_ADMIN' && !companyId) {
      return NextResponse.json({ error: 'Company ID required for Super Admin' }, { status: 400 });
    }

    if (!targetCompanyId) {
      return NextResponse.json({ error: 'No company specified' }, { status: 400 });
    }

    const company = await prisma.company.findUnique({
      where: { id: targetCompanyId },
      include: {
        users: {
          // Exclude Super Admins from company user data for accurate billing
          where: {
            role: {
              in: ['STUDENT', 'COMPANY_ADMIN']
            }
          },
          include: {
            progress: {
              include: {
                module: true
              }
            }
          }
        },
        companyCodes: {
          orderBy: { createdAt: 'asc' }
        }
      } as any
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    const totalStudents = company.users.filter((u: any) => u.role === 'STUDENT').length;
    const totalAdmins = company.users.filter((u: any) => u.role === 'COMPANY_ADMIN').length;
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const activeStudents = company.users.filter((u: any) => {
      if (u.role !== 'STUDENT') return false;
      return u.progress.some((p: any) => p.lastAttemptDate && p.lastAttemptDate >= thirtyDaysAgo);
    }).length;

    const totalModules = await prisma.module.count();
    let totalCompleted = 0;
    let totalPossible = 0;

    company.users.forEach((user: any) => {
      if (user.role === 'STUDENT') {
        totalPossible += totalModules;
        totalCompleted += user.progress.filter((p: any) => p.completedAt !== null).length;
      }
    });

    const completionRate = totalPossible > 0 ? (totalCompleted / totalPossible) * 100 : 0;

    const certificatesIssued = company.users.filter((u: any) => {
      if (u.role !== 'STUDENT') return false;
      return u.progress.filter((p: any) => p.completedAt !== null).length === totalModules;
    }).length;

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const recentEnrollments = company.users.filter((u: any) => 
      u.role === 'STUDENT' && u.createdAt >= oneMonthAgo
    ).length;

    const allCodes = (company as any).companyCodes?.map((c: any) => c.code) ?? [company.companyCode];

    const response = NextResponse.json({
      company: {
        name: company.companyName,
        companyCode: company.companyCode,
        companyCodes: allCodes,
        totalUsers: company.users.length
      },
      totalStudents,
      totalAdmins,
      activeStudents,
      completionRate: completionRate.toFixed(1),
      certificatesIssued,
      recentEnrollments,
      engagementRate: totalStudents > 0 ? ((activeStudents / totalStudents) * 100).toFixed(1) : '0.0'
    });
    
    // Prevent caching to ensure fresh data after user reassignments
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    return response;
  } catch (error) {
    console.error('Company stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch company stats' }, { status: 500 });
  }
}
