
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { companyId } = await request.json();
    const { id } = params;

    const user = await prisma.user.update({
      where: { id },
      data: { companyId: companyId || null }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user company:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
