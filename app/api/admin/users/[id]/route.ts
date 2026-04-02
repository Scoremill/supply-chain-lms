
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

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
    const url = new URL(request.url);
    const replacementAdminId = url.searchParams.get('replacementAdminId');

    // Prevent self-deletion
    if (session.user.id === id) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
    }

    // Get the user to check if they're a company admin
    const user = await prisma.user.findUnique({
      where: { id },
      select: { role: true, companyId: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // If deleting a company admin, check if they're the last admin
    if (user.role === 'COMPANY_ADMIN' && user.companyId) {
      const companyAdmins = await prisma.user.count({
        where: {
          companyId: user.companyId,
          role: 'COMPANY_ADMIN'
        }
      });

      if (companyAdmins <= 1) {
        // This is the last admin, require a replacement
        if (!replacementAdminId) {
          return NextResponse.json(
            { 
              error: 'This is the last admin of the company. A replacement admin must be selected.',
              requiresReplacement: true
            },
            { status: 400 }
          );
        }

        // Promote the replacement user to admin
        const replacementUser = await prisma.user.findUnique({
          where: { id: replacementAdminId },
          select: { companyId: true }
        });

        if (!replacementUser || replacementUser.companyId !== user.companyId) {
          return NextResponse.json(
            { error: 'Replacement admin must be from the same company' },
            { status: 400 }
          );
        }

        // Promote replacement to admin
        await prisma.user.update({
          where: { id: replacementAdminId },
          data: { role: 'COMPANY_ADMIN' }
        });
      }
    }

    // Delete the user
    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
