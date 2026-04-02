
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      include: {
        company: true,
        progress: {
          include: {
            module: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Create CSV
    const csvRows = [];
    csvRows.push(['Name', 'Email', 'Role', 'Company', 'Company Code', 'Joined Date', 'Modules Completed', 'Progress %']);

    for (const user of users) {
      const completedModules = user.progress.filter(p => p.quizPassed).length;
      const progressPercentage = (completedModules / 10) * 100;
      
      csvRows.push([
        user.name || 'N/A',
        user.email,
        user.role,
        user.company?.companyName || 'No Company',
        user.company?.companyCode || 'N/A',
        new Date(user.createdAt).toISOString().split('T')[0],
        completedModules.toString(),
        progressPercentage.toFixed(1) + '%'
      ]);
    }

    const csvContent = csvRows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="users-export-${new Date().toISOString().split('T')[0]}.csv"`
      }
    });
  } catch (error) {
    console.error('Error exporting users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
