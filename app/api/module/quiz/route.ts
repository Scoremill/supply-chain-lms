
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

const PASSING_SCORE = 85;
const MAX_ATTEMPTS_BEFORE_LOCKOUT = 3;
const LOCKOUT_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { moduleId, answers } = body;

    if (!moduleId || !answers) {
      return NextResponse.json({ error: 'Module ID and answers are required' }, { status: 400 });
    }

    // Fetch existing progress first so we can check lockout and preserve quizPassed
    const existingProgress = await prisma.userProgress.findUnique({
      where: {
        userId_moduleId: {
          userId: session.user.id,
          moduleId,
        },
      },
    });

    // Lockout check: only applies to students who have NOT yet passed
    if (existingProgress && !existingProgress.quizPassed) {
      const attempts = existingProgress.quizAttempts;
      if (
        attempts > 0 &&
        attempts % MAX_ATTEMPTS_BEFORE_LOCKOUT === 0 &&
        existingProgress.lastAttemptDate
      ) {
        const elapsed = Date.now() - new Date(existingProgress.lastAttemptDate).getTime();
        if (elapsed < LOCKOUT_MS) {
          const msRemaining = LOCKOUT_MS - elapsed;
          const hoursRemaining = Math.ceil(msRemaining / (60 * 60 * 1000));
          const lockedUntil = new Date(
            new Date(existingProgress.lastAttemptDate).getTime() + LOCKOUT_MS
          ).toISOString();
          return NextResponse.json(
            {
              error: 'locked_out',
              message: `Maximum attempts reached. Please try again in ${hoursRemaining} hour(s).`,
              hoursRemaining,
              lockedUntil,
            },
            { status: 429 }
          );
        }
      }
    }

    // Get quiz questions
    const quizzes = await prisma.quiz.findMany({
      where: { moduleId },
      orderBy: { id: 'asc' }
    });

    if (quizzes.length === 0) {
      return NextResponse.json({ error: 'No quiz questions found' }, { status: 404 });
    }

    // Calculate score
    let correctCount = 0;
    const correctAnswers: { [key: string]: string } = {};

    quizzes.forEach(quiz => {
      correctAnswers[quiz.id] = quiz.correctAnswer;
      if (answers[quiz.id] === quiz.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / quizzes.length) * 100);
    const passed = score >= PASSING_SCORE;

    // Only complete the module if quiz passed AND takeaways have been submitted
    const hasTakeaways = !!(existingProgress?.takeaways && existingProgress.takeaways.trim());
    const canComplete = passed && hasTakeaways;

    // Once quizPassed is true it stays true — never revert after a passing attempt
    const newQuizPassed = existingProgress?.quizPassed ? true : passed;

    await prisma.userProgress.upsert({
      where: {
        userId_moduleId: {
          userId: session.user.id,
          moduleId,
        },
      },
      update: {
        quizScore: score,
        quizPassed: newQuizPassed,
        quizAttempts: (existingProgress?.quizAttempts || 0) + 1,
        lastAttemptDate: new Date(),
        completedAt: canComplete ? new Date() : existingProgress?.completedAt,
        updatedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        moduleId,
        videoWatched: existingProgress?.videoWatched || false,
        quizScore: score,
        quizPassed: passed,
        quizAttempts: 1,
        lastAttemptDate: new Date(),
        completedAt: canComplete ? new Date() : null,
      },
    });

    // If passed and takeaways submitted, unlock the next module
    if (canComplete) {
      const currentModule = await prisma.module.findUnique({
        where: { id: moduleId },
        select: { moduleNumber: true }
      });

      if (currentModule) {
        const nextModule = await prisma.module.findFirst({
          where: { moduleNumber: currentModule.moduleNumber + 1 }
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

    return NextResponse.json({
      score,
      passed,
      correctAnswers,
      totalQuestions: quizzes.length,
      correctCount,
      passingScore: PASSING_SCORE,
    });

  } catch (error) {
    console.error('Quiz API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
