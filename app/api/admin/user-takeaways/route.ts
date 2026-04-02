
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is an admin
    if (session.user.role !== 'COMPANY_ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const moduleNumber = searchParams.get('moduleNumber');

    if (!userId || !moduleNumber) {
      return NextResponse.json(
        { error: 'User ID and module number are required' },
        { status: 400 }
      );
    }

    // Get the module by module number
    const module = await prisma.module.findUnique({
      where: {
        moduleNumber: parseInt(moduleNumber),
      },
    });

    if (!module) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      );
    }

    // Get the user's progress for this module
    const userProgress = await prisma.userProgress.findUnique({
      where: {
        userId_moduleId: {
          userId: userId,
          moduleId: module.id,
        },
      },
    });

    return NextResponse.json({
      takeaways: userProgress?.takeaways || '',
    });
  } catch (error) {
    console.error('Error fetching user takeaways:', error);
    return NextResponse.json(
      { error: 'Failed to fetch takeaways' },
      { status: 500 }
    );
  }
}
