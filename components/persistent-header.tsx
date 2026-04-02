
'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Building2, Settings, LogOut, ArrowLeft, Shield, Eye, MessageCircle } from 'lucide-react';
import ChatModal from '@/components/chat-modal';
import HelpModal from '@/components/help-modal';

export default function PersistentHeader() {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Check emulation state from URL params
  const isEmulating = searchParams?.get('emulating') === 'true';
  const emulatedCompanyId = searchParams?.get('companyId') || '';
  const emulationView = searchParams?.get('view') || 'admin'; // Default to admin view

  // Check Company Admin view state
  const companyAdminView = searchParams?.get('view') || 'student'; // Default to student view
  const isCompanyAdminInAdminView = session?.user?.role === 'COMPANY_ADMIN' && companyAdminView === 'admin' && pathname === '/dashboard';
  const isCompanyAdminInStudentView = session?.user?.role === 'COMPANY_ADMIN' && (companyAdminView === 'student' || !searchParams?.get('view')) && pathname === '/dashboard';

  // Check if we're on a module page
  const isModulePage = pathname?.startsWith('/module/');

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth' });
  };

  const handleSuperAdminDashboard = () => {
    // Return to Super Admin view
    router.push('/dashboard');
  };

  const handleToggleView = () => {
    // Toggle between student and admin view during emulation
    if (emulationView === 'student') {
      // Switch to admin view
      router.push(`/dashboard?emulating=true&companyId=${emulatedCompanyId}&view=admin`);
    } else {
      // Switch to student view
      router.push(`/dashboard?emulating=true&companyId=${emulatedCompanyId}&view=student`);
    }
  };

  const handleCompanyAdminToggle = () => {
    // Toggle between student and admin view for Company Admins
    if (companyAdminView === 'student' || !searchParams?.get('view')) {
      // Switch to admin view
      router.push('/dashboard?view=admin');
    } else {
      // Switch to student view
      router.push('/dashboard?view=student');
    }
  };

  const handleAdminPanel = () => {
    if (isEmulating) {
      // Toggle view during emulation
      handleToggleView();
    } else {
      router.push('/dashboard');
    }
  };

  const handleBackToDashboard = () => {
    // Company Admins should go back to student view
    if (session?.user?.role === 'COMPANY_ADMIN') {
      router.push('/dashboard?view=student');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <>
      <ChatModal 
        open={isChatModalOpen} 
        onOpenChange={setIsChatModalOpen}
      />
      <HelpModal 
        isOpen={isHelpModalOpen} 
        onClose={() => setIsHelpModalOpen(false)}
      />
      
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
        <header className="w-full max-w-[calc(1200px+4rem)] bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg pointer-events-auto">
          <div className="px-6 py-4">
            <div className="flex items-center gap-6">
              {/* Back to Dashboard button - leftmost position on module pages */}
              {isModulePage && session && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToDashboard}
                  className="text-sm font-medium text-orange-600 border-orange-400 hover:bg-orange-50 hover:border-orange-500 transition-all hover:scale-105 shrink-0"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Dashboard
                </Button>
              )}

              {/* Logo */}
              <Link href={session ? "/dashboard" : "/auth"} className="flex items-center hover:opacity-80 transition-opacity shrink-0">
                <div className="flex flex-col items-start">
                  <div className="relative h-12 w-48">
                    <Image 
                      src="/stratagem-logo.png" 
                      alt="Strategem Logo" 
                      fill
                      className="object-contain object-left"
                      priority
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1 ml-1">Supply Chain Academy</p>
                </div>
              </Link>

              {/* Welcome Message - Only for Students and Company Admins */}
              {session && (session.user?.role === 'STUDENT' || session.user?.role === 'COMPANY_ADMIN') && session.user?.name && (
                <div className="flex flex-col shrink-0">
                  <h1 className="text-xl font-semibold text-orange-600">Supply Chain Academy</h1>
                  <p className="text-sm text-gray-900">Welcome back, {session.user.name.split(' ')[0]}!</p>
                </div>
              )}

              {/* Flexible spacer */}
              <div className="flex-1"></div>

              {/* Right side: Chat To A Builder + Action buttons */}
              <div className="flex items-center gap-3 shrink-0">
                {status === 'loading' ? (
                  <div className="text-sm text-gray-500">Loading...</div>
                ) : session ? (
                  <>
                    {/* Chat To A Builder Button - visible to all logged-in users */}
                    <Button 
                      variant="outline"
                      onClick={() => setIsChatModalOpen(true)}
                      className="text-sm font-medium text-orange-600 border-orange-400 hover:bg-orange-50 transition-all hover:scale-105 hover:border-orange-500 whitespace-nowrap"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat To A Builder
                    </Button>

                    {/* Super Admin in emulation mode - show buttons */}
                    {session.user?.role === 'SUPER_ADMIN' && isEmulating ? (
                      <>
                        <Button 
                          variant="ghost" 
                          onClick={handleSuperAdminDashboard}
                          className="text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-smooth hover:scale-105"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Super Admin
                        </Button>
                        <Button 
                          variant="ghost" 
                          onClick={handleToggleView}
                          className="text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-smooth hover:scale-105"
                        >
                          {emulationView === 'student' ? (
                            <>
                              <Settings className="h-4 w-4 mr-2" />
                              Admin Panel
                            </>
                          ) : (
                            <>
                              <ArrowLeft className="h-4 w-4 mr-2" />
                              Student View
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="ghost"
                          onClick={handleSignOut}
                          className="text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-smooth hover:scale-105"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                        {/* Get Help Button - Circular, Far Right with white border */}
                        <button
                          onClick={() => setIsHelpModalOpen(true)}
                          className="h-16 w-16 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 flex flex-col items-center justify-center text-xs font-semibold ring-4 ring-white"
                          aria-label="Get Help"
                        >
                          <span className="leading-tight">Get</span>
                          <span className="leading-tight">Help</span>
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Super Admin button - only show when not emulating */}
                        {session.user?.role === 'SUPER_ADMIN' && !isEmulating && (
                          <Button 
                            variant="ghost" 
                            onClick={handleAdminPanel}
                            className="text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-smooth hover:scale-105"
                          >
                            <Shield className="h-4 w-4 mr-2" />
                            Super Admin
                          </Button>
                        )}

                        {/* Company Admin toggle button */}
                        {session.user?.role === 'COMPANY_ADMIN' && (
                          <Button 
                            variant="ghost" 
                            onClick={handleCompanyAdminToggle}
                            className="text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-smooth hover:scale-105"
                          >
                            {isCompanyAdminInStudentView ? (
                              <>
                                <Settings className="h-4 w-4 mr-2" />
                                Admin Panel
                              </>
                            ) : (
                              <>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Student View
                              </>
                            )}
                          </Button>
                        )}

                        {/* Sign Out button */}
                        <Button 
                          variant="ghost"
                          onClick={handleSignOut}
                          className="text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-smooth hover:scale-105"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                        {/* Get Help Button - Circular, Far Right with white border */}
                        <button
                          onClick={() => setIsHelpModalOpen(true)}
                          className="h-16 w-16 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 flex flex-col items-center justify-center text-xs font-semibold ring-4 ring-white"
                          aria-label="Get Help"
                        >
                          <span className="leading-tight">Get</span>
                          <span className="leading-tight">Help</span>
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {/* Show buttons only if not on auth page */}
                    {pathname !== '/auth' && (
                      <>
                        <Link href="/auth">
                          <Button 
                            variant="ghost"
                            className="text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-smooth hover:scale-105"
                          >
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/auth">
                          <Button 
                            className="text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white transition-smooth hover:scale-105 hover:shadow-lg"
                          >
                            Sign Up
                          </Button>
                        </Link>
                      </>
                    )}
                    {/* Get Help Button - Always show for logged out users */}
                    <button
                      onClick={() => setIsHelpModalOpen(true)}
                      className="h-16 w-16 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 flex flex-col items-center justify-center text-xs font-semibold ring-4 ring-white"
                      aria-label="Get Help"
                    >
                      <span className="leading-tight">Get</span>
                      <span className="leading-tight">Help</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
