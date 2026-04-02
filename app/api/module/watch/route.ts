
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
    const { moduleId } = body;

    if (!moduleId) {
      return NextResponse.json({ error: 'Module ID is required' }, { status: 400 });
    }

    // Update or create progress record
    await prisma.userProgress.upsert({
      where: {
        userId_moduleId: {
          userId: session.user.id,
          moduleId: moduleId,
        },
      },
      update: {
        videoWatched: true,
        updatedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        moduleId: moduleId,
        videoWatched: true,
        quizPassed: false,
        quizAttempts: 0,
      },
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Watch API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
