
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

    const { companyName, companyCode, isPublic } = await request.json();
    const { id } = params;

    if (!companyName || !companyCode) {
      return NextResponse.json({ error: 'Company name and code are required' }, { status: 400 });
    }

    // Check if company code already exists for another company
    const existing = await prisma.company.findFirst({
      where: {
        companyCode: companyCode.toUpperCase(),
        NOT: { id }
      }
    });

    if (existing) {
      return NextResponse.json({ error: 'Company code already exists' }, { status: 400 });
    }

    const company = await prisma.company.update({
      where: { id },
      data: {
        companyName,
        companyCode: companyCode.toUpperCase(),
        isPublic: isPublic || false
      }
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error('Error updating company:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // Delete company (users will have their companyId set to null due to CASCADE)
    await prisma.company.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting company:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
