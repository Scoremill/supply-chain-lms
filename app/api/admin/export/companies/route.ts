
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

    const companies = await prisma.company.findMany({
      include: {
        users: true,
        companyCodes: {
          orderBy: { createdAt: 'asc' }
        }
      } as any,
      orderBy: { companyName: 'asc' }
    });

    // One row per enrollment code — scales to any number of codes.
    // Company info repeats on each row so the CSV is filterable by code or company in Excel/Sheets.
    const csvRows: string[][] = [];
    csvRows.push([
      'Company Name',
      'Enrollment Code',
      'Students via This Code',
      'Total Company Students',
      'Type',
      'Admin Names',
      'Admin Emails',
      'Code Added Date',
      'Company Created Date'
    ]);

    for (const company of companies as any[]) {
      const allStudents  = company.users.filter((u: any) => u.role === 'STUDENT');
      const adminUsers   = company.users.filter((u: any) => u.role === 'COMPANY_ADMIN');
      const adminNames   = adminUsers.map((u: any) => u.name || 'No name').join(', ');
      const adminEmails  = adminUsers.map((u: any) => u.email).join(', ');
      const companyType  = company.isPublic ? 'Public' : 'Private';
      const companyCreated = new Date(company.createdAt).toISOString().split('T')[0];

      const codes: any[] = company.companyCodes ?? [];
      // Fallback for companies that pre-date the CompanyCode table
      if (codes.length === 0 && company.companyCode) {
        codes.push({ code: company.companyCode, createdAt: company.createdAt });
      }

      for (const codeEntry of codes) {
        const codeStudents = allStudents.filter((u: any) => u.signupCode === codeEntry.code).length;
        csvRows.push([
          company.companyName,
          codeEntry.code,
          codeStudents.toString(),
          allStudents.length.toString(),
          companyType,
          adminNames,
          adminEmails,
          new Date(codeEntry.createdAt).toISOString().split('T')[0],
          companyCreated
        ]);
      }
    }

    const csvContent = csvRows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="companies-export-${new Date().toISOString().split('T')[0]}.csv"`
      }
    });
  } catch (error) {
    console.error('Error exporting companies:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
