
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import StudentDashboard from '@/components/dashboard/student-dashboard';
import CompanyAdminDashboard from '@/components/dashboard/company-admin-dashboard';
import SuperAdminDashboard from '@/components/dashboard/super-admin-dashboard';

export default async function DashboardPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth');
  }

  // Check if Super Admin is emulating a company
  const isEmulating = searchParams?.emulating === 'true';
  const emulatedCompanyId = searchParams?.companyId as string;
  const emulationView = searchParams?.view as string;

  // If Super Admin is emulating, show appropriate dashboard based on view
  if (session.user.role === 'SUPER_ADMIN' && isEmulating && emulatedCompanyId) {
    // Fetch company details
    const company = await prisma.company.findUnique({
      where: { id: emulatedCompanyId },
      include: {
        users: true
      }
    });

    if (!company) {
      redirect('/dashboard'); // Company not found, return to Super Admin dashboard
    }

    // Create a simulated session for the company
    const emulatedSession = {
      ...session,
      user: {
        ...session.user,
        companyId: company.id
      }
    };

    // Show Student View if view=student, otherwise show Company Admin view
    if (emulationView === 'student') {
      return <StudentDashboard session={emulatedSession} />;
    } else {
      return (
        <CompanyAdminDashboard 
          session={session} 
          emulatedCompanyId={emulatedCompanyId}
          emulatedCompanyName={company.companyName}
        />
      );
    }
  }

  // Handle Company Admin view toggle
  if (session.user.role === 'COMPANY_ADMIN') {
    const companyAdminView = searchParams?.view as string;
    
    // Default to student view if no view parameter is specified
    if (!companyAdminView || companyAdminView === 'student') {
      return <StudentDashboard session={session} />;
    } else if (companyAdminView === 'admin') {
      return <CompanyAdminDashboard session={session} />;
    }
  }

  // Role-based dashboard rendering
  switch (session.user.role) {
    case 'STUDENT':
      return <StudentDashboard session={session} />;
    case 'COMPANY_ADMIN':
      return <CompanyAdminDashboard session={session} />;
    case 'SUPER_ADMIN':
      return <SuperAdminDashboard session={session} />;
    default:
      redirect('/auth');
  }
}
