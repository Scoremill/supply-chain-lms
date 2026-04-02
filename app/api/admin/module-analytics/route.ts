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

    const modules = await prisma.module.findMany({
      include: {
        progress: {
          where: {
            user: {
              companyId: targetCompanyId,
              role: 'STUDENT'
            }
          }
        }
      },
      orderBy: {
        moduleNumber: 'asc'
      }
    });

    const formattedModules = modules.map((module: any) => {
      const enrolledCount = module.progress.length;
      const completedCount = module.progress.filter((p: any) => p.completedAt !== null).length;
      const completionRate = enrolledCount > 0 
        ? Math.round((completedCount / enrolledCount) * 100) 
        : 0;

      const scores = module.progress
        .filter((p: any) => p.quizScore !== null)
        .map((p: any) => p.quizScore);
      const avgScore = scores.length > 0
        ? Math.round(scores.reduce((a: any, b: any) => a + b, 0) / scores.length)
        : 0;

      const avgTime = module.moduleNumber === 1 ? 25 : module.moduleNumber === 2 ? 30 : 35;

      return {
        id: module.id,
        moduleNumber: module.moduleNumber,
        title: module.title,
        enrolledCount,
        completedCount,
        completionRate,
        avgScore,
        avgTime: `${avgTime}min`
      };
    });

    const response = NextResponse.json(formattedModules);
    // Prevent caching to ensure fresh data after user reassignments
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    return response;
  } catch (error) {
    console.error('Module analytics error:', error);
    return NextResponse.json({ error: 'Failed to fetch module analytics' }, { status: 500 });
  }
}
