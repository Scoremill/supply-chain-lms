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
      return NextResponse.json({ error: 'Company ID required' }, { status: 400 });
    }

    if (!targetCompanyId) {
      return NextResponse.json({ error: 'No company specified' }, { status: 400 });
    }

    const userProgress = await prisma.userProgress.findMany({
      where: {
        user: {
          companyId: targetCompanyId,
          role: 'STUDENT'
        }
      },
      include: {
        user: true,
        module: true
      },
      orderBy: {
        module: {
          moduleNumber: 'asc'
        }
      }
    });

    const formattedStats = userProgress.map((progress: any) => {
      let status = 'Not Started';
      if (progress.completedAt) {
        status = 'Completed';
      } else if (progress.lastAttemptDate) {
        const hoursSinceAccess = (Date.now() - progress.lastAttemptDate.getTime()) / (1000 * 60 * 60);
        if (hoursSinceAccess < 24) {
          status = 'In Progress';
        } else {
          status = 'Paused';
        }
      }

      // Convert seconds to minutes, round to nearest minute
      const timeSpentMinutes = Math.round((progress.timeSpent || 0) / 60);

      return {
        id: `${progress.userId}-${progress.moduleId}`,
        userId: progress.userId,
        name: progress.user.name,
        email: progress.user.email,
        moduleNumber: progress.module.moduleNumber,
        moduleTitle: progress.module.title,
        timeSpent: timeSpentMinutes,
        status,
        hasTakeaways: !!progress.takeaways
      };
    });

    const response = NextResponse.json(formattedStats);
    // Prevent caching to ensure fresh data after user reassignments
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    return response;
  } catch (error) {
    console.error('User stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch user stats' }, { status: 500 });
  }
}
