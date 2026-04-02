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

    const totalModules = await prisma.module.count();

    let csv = 'Name,Email,Registration Date,Modules Completed,Progress %,Average Score,Status,Last Activity\n';

    students.forEach((student: any) => {
      const completedModules = student.progress.filter((p: any) => p.completedAt !== null).length;
      const progressPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
      
      const quizScores = student.progress
        .filter((p: any) => p.quizScore !== null)
        .map((p: any) => p.quizScore);
      const avgScore = quizScores.length > 0 
        ? Math.round(quizScores.reduce((a: any, b: any) => a + b, 0) / quizScores.length)
        : 0;

      const lastAttempt = student.progress
        .map((p: any) => p.lastAttemptDate)
        .filter((d: any) => d)
        .sort((a: any, b: any) => b.getTime() - a.getTime())[0];

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const isActive = lastAttempt && lastAttempt >= thirtyDaysAgo;

      csv += `"${student.name || 'No name'}","${student.email}","${new Date(student.createdAt).toLocaleDateString()}",${completedModules},${progressPercent}%,${avgScore}%,${isActive ? 'active' : 'inactive'},"${lastAttempt ? lastAttempt.toLocaleDateString() : 'Never'}"\n`;
    });

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=students.csv'
      }
    });
  } catch (error) {
    console.error('Export students error:', error);
    return NextResponse.json({ error: 'Failed to export students' }, { status: 500 });
  }
}
