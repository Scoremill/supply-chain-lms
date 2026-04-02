
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { moduleId, timeSpent } = body;

    if (!moduleId || typeof timeSpent !== 'number') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Get current progress to check if module is completed
    const currentProgress = await prisma.userProgress.findUnique({
      where: {
        userId_moduleId: {
          userId: session.user.id,
          moduleId: moduleId,
        },
      },
    });

    // Don't update time if module is already completed
    if (currentProgress?.completedAt) {
      return NextResponse.json({ 
        success: true, 
        message: 'Module completed, time tracking stopped' 
      });
    }

    // Update or create progress record with new time
    await prisma.userProgress.upsert({
      where: {
        userId_moduleId: {
          userId: session.user.id,
          moduleId: moduleId,
        },
      },
      update: {
        timeSpent: {
          increment: timeSpent
        },
        updatedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        moduleId: moduleId,
        videoWatched: false,
        quizPassed: false,
        quizAttempts: 0,
        timeSpent: timeSpent,
      },
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Time tracking API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
