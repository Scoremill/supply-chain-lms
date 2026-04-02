
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const codeEntry = await (prisma as any).companyCode.findUnique({ where: { id } });

    if (!codeEntry) {
      return NextResponse.json({ error: 'Code not found' }, { status: 404 });
    }

    // Prevent deleting the last code for a company
    const totalCodes = await (prisma as any).companyCode.count({
      where: { companyId: codeEntry.companyId }
    });

    if (totalCodes <= 1) {
      return NextResponse.json(
        { error: 'Cannot delete the last enrollment code for a company' },
        { status: 400 }
      );
    }

    await (prisma as any).companyCode.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting company code:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
