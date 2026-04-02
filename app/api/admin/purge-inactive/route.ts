import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'COMPANY_ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { companyId, days } = await req.json();

    let targetCompanyId = companyId;

    if (session.user.role === 'COMPANY_ADMIN') {
      targetCompanyId = session.user.companyId;
    }

    if (!targetCompanyId) {
      return NextResponse.json({ error: 'No company specified' }, { status: 400 });
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - (days || 365));

    const inactiveUsers = await prisma.user.findMany({
      where: {
        companyId: targetCompanyId,
        role: 'STUDENT',
        OR: [
          {
            progress: {
              none: {}
            }
          },
          {
            progress: {
              every: {
                OR: [
                  { lastAttemptDate: null },
                  { lastAttemptDate: { lt: cutoffDate } }
                ]
              }
            }
          }
        ]
      }
    });

    const deleteResult = await prisma.user.deleteMany({
      where: {
        id: {
          in: inactiveUsers.map((u: any) => u.id)
        }
      }
    });

    return NextResponse.json({
      success: true,
      deletedCount: deleteResult.count
    });
  } catch (error) {
    console.error('Purge inactive error:', error);
    return NextResponse.json({ error: 'Failed to purge inactive users' }, { status: 500 });
  }
}
