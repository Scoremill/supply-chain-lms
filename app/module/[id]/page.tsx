
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import ModuleContent from '@/components/module/module-content';
import { enhanceModuleContent } from '@/lib/content-enhancement/enhance-module-content';

export default async function ModulePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth');
  }

  // Allow students, company admins, and super admins to access module content
  const allowedRoles = ['STUDENT', 'COMPANY_ADMIN', 'SUPER_ADMIN'];
  if (!allowedRoles.includes(session.user.role)) {
    redirect('/dashboard');
  }

  const isAdmin = session.user.role === 'COMPANY_ADMIN' || session.user.role === 'SUPER_ADMIN';

  try {
    // Get module with progress
    const module = await prisma.module.findUnique({
      where: { id: params.id },
      include: {
        progress: {
          where: { userId: session.user.id }
        },
        quizzes: {
          orderBy: { id: 'asc' }
        }
      }
    });

    if (!module) {
      redirect('/dashboard');
    }

    // For students, check if module is unlocked
    // Admins can access all modules without restrictions
    if (!isAdmin && module.moduleNumber > 1) {
      const previousModules = await prisma.module.findMany({
        where: {
          moduleNumber: { lt: module.moduleNumber }
        },
        include: {
          progress: {
            where: { userId: session.user.id }
          }
        }
      });

      const allPreviousCompleted = previousModules.every(m => 
        m.progress?.[0]?.quizPassed === true
      );

      if (!allPreviousCompleted) {
        redirect('/dashboard');
      }
    }

    // Enhance module content (feature-gated to Module 1)
    const enhanced = enhanceModuleContent(module.content, module.moduleNumber, module.quizzes);

    return (
      <ModuleContent
        module={{ ...module, content: enhanced.html }}
        toc={enhanced.toc}
        isEnhanced={enhanced.enhanced}
        session={session}
      />
    );

  } catch (error) {
    console.error('Module page error:', error);
    redirect('/dashboard');
  }
}
