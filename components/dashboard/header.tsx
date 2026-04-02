
'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Building2, User, Settings, LogOut, Shield } from 'lucide-react';

interface HeaderProps {
  session: any;
}

export default function Header({ session }: HeaderProps) {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-orange-500" />
              <div>
                <h1 className="text-lg font-bold text-gray-900">Supply Chain Academy</h1>
                <p className="text-xs text-gray-500">Construction Supply Chain Training</p>
              </div>
            </Link>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              {/* Chat About Lean - could be future feature */}
              <Button variant="ghost" className="text-sm text-gray-600 hover:text-orange-600">
                💬 Chat About Lean
              </Button>

              {/* Admin Panel Link */}
              {(session?.user?.role === 'COMPANY_ADMIN' || session?.user?.role === 'SUPER_ADMIN') && (
                <Button variant="ghost" className="text-sm text-gray-600 hover:text-orange-600">
                  <Shield className="h-4 w-4 mr-1" />
                  Admin Panel
                </Button>
              )}

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 text-sm">
                    <User className="h-4 w-4" />
                    <span>{session?.user?.name || 'User'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white/90 backdrop-blur-md border-white/20">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{session?.user?.name}</p>
                    <p className="text-xs text-gray-500">{session?.user?.email}</p>
                    <p className="text-xs text-gray-400">{session?.user?.companyName}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
