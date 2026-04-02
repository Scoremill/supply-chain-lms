
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all modules
    const modules = await prisma.module.findMany({
      orderBy: { order: 'asc' },
      include: {
        progress: {
          where: { userId: session.user.id }
        }
      }
    });

    // Calculate progress stats
    const totalModules = modules.length;
    const completedModules = modules.filter(module => 
      module.progress?.[0]?.quizPassed === true
    ).length;
    
    const progressPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

    // Calculate average quiz score
    const completedProgress = modules
      .map(m => m.progress?.[0])
      .filter(p => p?.quizPassed && p?.quizScore !== null);
    
    const averageScore = completedProgress.length > 0
      ? Math.round(completedProgress.reduce((sum, p) => sum + (p?.quizScore || 0), 0) / completedProgress.length)
      : 0;

    // Find next module to take
    const nextModule = modules.find(module => {
      const progress = module.progress?.[0];
      return !progress?.quizPassed;
    });

    return NextResponse.json({
      totalModules,
      completedModules,
      progressPercentage,
      averageScore,
      nextModule: nextModule ? {
        id: nextModule.id,
        moduleNumber: nextModule.moduleNumber,
        title: nextModule.title,
        description: nextModule.description
      } : null,
      modules: modules.map(module => ({
        id: module.id,
        moduleNumber: module.moduleNumber,
        title: module.title,
        description: module.description,
        progress: module.progress?.[0] ? {
          videoWatched: module.progress[0].videoWatched,
          quizPassed: module.progress[0].quizPassed,
          quizScore: module.progress[0].quizScore,
          quizAttempts: module.progress[0].quizAttempts,
          completedAt: module.progress[0].completedAt
        } : null,
        isUnlocked: module.moduleNumber === 1 || (modules
          .filter(m => m.moduleNumber < module.moduleNumber)
          .every(m => m.progress?.[0]?.quizPassed === true)
        )
      }))
    });

  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
