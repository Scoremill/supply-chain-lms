import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    // Redirect authenticated users to dashboard
    redirect('/dashboard');
  } else {
    // Redirect non-authenticated users to auth page
    redirect('/auth');
  }
}