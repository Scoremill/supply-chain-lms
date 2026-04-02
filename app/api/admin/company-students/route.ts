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

    // Log for debugging
    console.log(`[company-students API] Fetching students for companyId: ${targetCompanyId}`);

    const students = await prisma.user.findMany({
      where: {
        companyId: targetCompanyId,
        role: 'STUDENT'
      },
      include: {
        progress: {
          include: {
            module: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`[company-students API] Found ${students.length} students for companyId: ${targetCompanyId}`);

    const totalModules = await prisma.module.count();

    const formattedStudents = students.map((student: any) => {
      const completedModules = student.progress.filter((p: any) => p.completedAt !== null).length;
      const progressPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
      
      const quizScores = student.progress
        .filter((p: any) => p.quizScore !== null)
        .map((p: any) => p.quizScore);
      const avgScore = quizScores.length > 0
        ? Math.round(quizScores.reduce((a: any, b: any) => a + b, 0) / quizScores.length)
        : null;

      const totalAttempts = student.progress
        .reduce((sum: number, p: any) => sum + (p.quizAttempts || 0), 0);

      const sortedByDate = student.progress
        .filter((p: any) => p.lastAttemptDate)
        .sort((a: any, b: any) => b.lastAttemptDate.getTime() - a.lastAttemptDate.getTime());
      const lastAttempt = sortedByDate[0]?.lastAttemptDate;
      const lastQuizScore = sortedByDate[0]?.quizScore ?? null;

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const isActive = lastAttempt && lastAttempt >= thirtyDaysAgo;

      return {
        id: student.id,
        name: student.name,
        email: student.email,
        signupCode: student.signupCode ?? null,
        createdAt: student.createdAt,
        progress: completedModules,
        totalModules,
        progressPercent,
        avgScore,
        lastQuizScore,
        totalAttempts,
        status: isActive ? 'active' : 'inactive',
        lastActivity: lastAttempt ? lastAttempt.toLocaleDateString() : 'Never'
      };
    });

    const response = NextResponse.json(formattedStudents);
    // Prevent caching to ensure fresh data after user reassignments
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    return response;
  } catch (error) {
    console.error('Company students error:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}
