
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { companyId, code } = await request.json();

    if (!companyId || !code) {
      return NextResponse.json({ error: 'companyId and code are required' }, { status: 400 });
    }

    const normalized = code.trim().toUpperCase();

    if (!normalized) {
      return NextResponse.json({ error: 'Code cannot be empty' }, { status: 400 });
    }

    const entry = await (prisma as any).companyCode.create({
      data: { companyId, code: normalized }
    });

    return NextResponse.json(entry);
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'That code already exists' }, { status: 400 });
    }
    console.error('Error adding company code:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
