

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

    const { companyId, role, action } = await request.json();
    const { id: userId } = params;

    // Get the user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { company: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Validate role
    if (role && !['STUDENT', 'COMPANY_ADMIN', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Handle reassignment to a different company
    if (action === 'reassign' && companyId !== undefined) {
      // If reassigning to a new company, set role to STUDENT unless specified otherwise
      const newRole = role || 'STUDENT';
      
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { 
          companyId: companyId || null,
          role: newRole
        },
        include: { company: true }
      });

      return NextResponse.json(updatedUser);
    }

    // Handle role change within the same company
    if (action === 'change_role' && role) {
      // Check if we're demoting the last admin of a company
      if (user.role === 'COMPANY_ADMIN' && role !== 'COMPANY_ADMIN' && user.companyId) {
        const companyAdmins = await prisma.user.count({
          where: {
            companyId: user.companyId,
            role: 'COMPANY_ADMIN'
          }
        });

        if (companyAdmins <= 1) {
          return NextResponse.json(
            { error: 'Cannot demote the last admin of a company. Please assign a new admin first.' },
            { status: 400 }
          );
        }
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { role },
        include: { company: true }
      });

      return NextResponse.json(updatedUser);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error managing user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
