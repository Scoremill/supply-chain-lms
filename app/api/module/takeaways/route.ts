
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { moduleId, takeaways } = await request.json();

    if (!moduleId || !takeaways) {
      return NextResponse.json(
        { error: 'Module ID and takeaways are required' },
        { status: 400 }
      );
    }

    // Check existing progress to see if quiz is already passed
    const existingProgress = await prisma.userProgress.findUnique({
      where: {
        userId_moduleId: {
          userId: session.user.id,
          moduleId: moduleId,
        },
      },
    });

    const quizAlreadyPassed = existingProgress?.quizPassed === true;
    const notYetCompleted = !existingProgress?.completedAt;
    const shouldComplete = quizAlreadyPassed && notYetCompleted;

    // Update or create user progress with takeaways
    const userProgress = await prisma.userProgress.upsert({
      where: {
        userId_moduleId: {
          userId: session.user.id,
          moduleId: moduleId,
        },
      },
      update: {
        takeaways: takeaways,
        completedAt: shouldComplete ? new Date() : existingProgress?.completedAt,
        updatedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        moduleId: moduleId,
        takeaways: takeaways,
        videoWatched: false,
        quizPassed: false,
        quizAttempts: 0,
      },
    });

    // If this save completes the module, unlock the next module
    if (shouldComplete) {
      const currentModule = await prisma.module.findUnique({
        where: { id: moduleId },
        select: { moduleNumber: true },
      });

      if (currentModule) {
        const nextModule = await prisma.module.findFirst({
          where: { moduleNumber: currentModule.moduleNumber + 1 },
        });

        if (nextModule) {
          await prisma.userProgress.upsert({
            where: {
              userId_moduleId: {
                userId: session.user.id,
                moduleId: nextModule.id,
              },
            },
            update: {},
            create: {
              userId: session.user.id,
              moduleId: nextModule.id,
              videoWatched: false,
              quizPassed: false,
              quizAttempts: 0,
            },
          });
        }
      }
    }

    return NextResponse.json({ success: true, data: userProgress, moduleCompleted: shouldComplete });
  } catch (error) {
    console.error('Error saving takeaways:', error);
    return NextResponse.json(
      { error: 'Failed to save takeaways' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const moduleId = searchParams.get('moduleId');

    if (!moduleId) {
      return NextResponse.json(
        { error: 'Module ID is required' },
        { status: 400 }
      );
    }

    const userProgress = await prisma.userProgress.findUnique({
      where: {
        userId_moduleId: {
          userId: session.user.id,
          moduleId: moduleId,
        },
      },
    });

    return NextResponse.json({
      takeaways: userProgress?.takeaways || '',
    });
  } catch (error) {
    console.error('Error fetching takeaways:', error);
    return NextResponse.json(
      { error: 'Failed to fetch takeaways' },
      { status: 500 }
    );
  }
}
