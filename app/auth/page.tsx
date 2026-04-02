
'use client';

import { useState, useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Award, Play, CheckCircle, X } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    companyCode: '',
    password: '',
    confirmPassword: ''
  });

  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe main content
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    // Observe feature cards with staggered animation
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.feature-card');
      cards.forEach((card, index) => {
        card.classList.add('opacity-0');
        setTimeout(() => {
          observer.observe(card);
        }, index * 100);
      });
    }

    return () => observer.disconnect();
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (signUpData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: signUpData.fullName,
          email: signUpData.email,
          companyCode: signUpData.companyCode,
          password: signUpData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Account created successfully! Logging you in...');
        
        // Automatically sign in the user
        const result = await signIn('credentials', {
          email: signUpData.email,
          password: signUpData.password,
          redirect: false,
        });

        if (result?.ok) {
          router.push('/dashboard');
        } else {
          toast.error('Account created but login failed. Please try signing in.');
        }
      } else {
        toast.error(data.error || 'Failed to create account');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: signInData.email,
        password: signInData.password,
        redirect: false,
      });

      if (result?.ok) {
        toast.success('Logged in successfully!');
        router.push('/dashboard');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-120px)] gap-12">
          {/* Left side - Marketing content */}
          <div ref={contentRef} className="flex-1 max-w-2xl opacity-0">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                <span className="text-orange-500">Build Faster. Spend Smarter.</span>{' '}
                <span className="text-gray-900">From Day One</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Master construction supply chain management with this intensive 8-module course. Learn unit pricing, vendor management, cost optimization, and logistics from industry experts.
              </p>

              {/* Features */}
              <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="feature-card card-hover bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center space-x-3 mb-3">
                    <BookOpen className="h-6 w-6 text-orange-500 flex-shrink-0" />
                    <h3 className="font-semibold text-gray-900">10 Comprehensive Modules</h3>
                  </div>
                  <p className="text-sm text-gray-600">Expert-designed curriculum covering all aspects of lean construction.</p>
                </div>

                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="rounded-xl p-5 border-2 border-orange-400 shadow-sm text-left cursor-pointer bg-orange-500 hover:bg-orange-600 transition-colors"
                  style={{ animation: 'heartbeat-pulse 1.714s ease-in-out infinite' }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Play className="h-6 w-6 text-white flex-shrink-0" />
                    <h3 className="font-semibold text-white">Click for an Introduction to the course.</h3>
                  </div>
                  <p className="text-sm text-orange-100">Engaging video content for effective knowledge transfer.</p>
                </button>

                <div className="feature-card card-hover bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="h-6 w-6 text-orange-500 flex-shrink-0" />
                    <h3 className="font-semibold text-gray-900">Quiz Assessments</h3>
                  </div>
                  <p className="text-sm text-gray-600">85% pass requirement to unlock next modules.</p>
                </div>

                <div className="feature-card card-hover bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center space-x-3 mb-3">
                    <Award className="h-6 w-6 text-orange-500 flex-shrink-0" />
                    <h3 className="font-semibold text-gray-900">Certificate</h3>
                  </div>
                  <p className="text-sm text-gray-600">Professional certification upon course completion.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Auth form */}
          <div className="flex-1 max-w-lg w-full">
            <Card className="w-full shadow-2xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                <CardDescription>Continue your lean construction journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full">
                  {/* Custom Tab Buttons */}
                  <div className="grid w-full grid-cols-2 mb-6 p-1 bg-muted rounded-lg">
                    <button
                      type="button"
                      onClick={() => setActiveTab('signin')}
                      className={`text-sm font-medium px-3 py-1.5 rounded-md transition-all ${
                        activeTab === 'signin'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('signup')}
                      className={`text-sm font-medium px-3 py-1.5 rounded-md transition-all ${
                        activeTab === 'signup'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Register
                    </button>
                  </div>

                  {/* Sign In Form */}
                  {activeTab === 'signin' && (
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div>
                        <Label htmlFor="signin-email" className="text-sm font-medium text-gray-700">
                          Email
                        </Label>
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signInData.email}
                          onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <Label htmlFor="signin-password" className="text-sm font-medium text-gray-700">
                            Password
                          </Label>
                          <Link href="/auth/forgot-password" className="text-xs text-orange-600 hover:text-orange-700">
                            Forgot Password?
                          </Link>
                        </div>
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="Enter your password"
                          value={signInData.password}
                          onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                          required
                          className="mt-1"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 transition-smooth hover:scale-[1.02] hover:shadow-lg"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                      </Button>
                    </form>
                  )}

                  {/* Sign Up Form */}
                  {activeTab === 'signup' && (
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div>
                        <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={signUpData.fullName}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, fullName: e.target.value }))}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="signup-email" className="text-sm font-medium text-gray-700">
                          Email
                        </Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signUpData.email}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="companyCode" className="text-sm font-medium text-gray-700">
                          Company Code (Optional)
                        </Label>
                        <Input
                          id="companyCode"
                          type="text"
                          placeholder="Enter company code if you have one"
                          value={signUpData.companyCode}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, companyCode: e.target.value }))}
                          className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">Leave blank for public access</p>
                      </div>

                      <div>
                        <Label htmlFor="signup-password" className="text-sm font-medium text-gray-700">
                          Password
                        </Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Create password (min 8 chars)"
                          value={signUpData.password}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                          required
                          className="mt-1"
                          minLength={6}
                        />
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                          Confirm Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={signUpData.confirmPassword}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                          className="mt-1"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 transition-smooth hover:scale-[1.02] hover:shadow-lg"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </form>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => { setVideoModalOpen(false); if (videoRef.current) videoRef.current.pause(); }}>
          <div className="relative w-full max-w-6xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between p-5 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Course Introduction Video</h2>
                <p className="text-sm text-gray-600 mt-1">Watch this 2-minute video to learn how to navigate the platform and get started with your Lean Construction training journey. <span className="text-orange-600 font-medium">Click the play button below to begin.</span></p>
              </div>
              <button
                onClick={() => { setVideoModalOpen(false); if (videoRef.current) videoRef.current.pause(); }}
                className="ml-4 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="bg-black">
              <video
                ref={videoRef}
                src="/HowToBuildAHomeIntro.mp4"
                controls
                className="w-full"
              />
            </div>
            <div className="flex justify-end p-4 border-t border-gray-200">
              <button
                onClick={() => { setVideoModalOpen(false); if (videoRef.current) videoRef.current.pause(); }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
