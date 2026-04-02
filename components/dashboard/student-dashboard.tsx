
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Play,
  Award,
  Lock,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Download,
  FileCheck,
  ClipboardList
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import SurveyModal from '@/components/survey-modal';

interface UserProgress {
  totalModules: number;
  completedModules: number;
  progressPercentage: number;
  averageScore: number;
  nextModule: {
    id: string;
    moduleNumber: number;
    title: string;
    description: string;
  } | null;
  modules: Array<{
    id: string;
    moduleNumber: number;
    title: string;
    description: string;
    progress: {
      videoWatched: boolean;
      quizPassed: boolean;
      quizScore: number | null;
      quizAttempts: number;
      completedAt: string | null;
    } | null;
    isUnlocked: boolean;
  }>;
}

interface StudentDashboardProps {
  session: any;
}

export default function StudentDashboard({ session }: StudentDashboardProps) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [certificateEligible, setCertificateEligible] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [completionDate, setCompletionDate] = useState<string>('');

  useEffect(() => {
    fetchProgress();
    checkCertificateEligibility();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/user/progress');
      if (response.ok) {
        const data = await response.json();
        setProgress(data);
      }
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkCertificateEligibility = async () => {
    try {
      const [eligibilityRes, surveyRes] = await Promise.all([
        fetch('/api/user/certificate/eligibility'),
        fetch('/api/user/survey'),
      ]);

      if (eligibilityRes.ok) {
        const data = await eligibilityRes.json();
        setCertificateEligible(data.eligible);
        if (data.completionDate) {
          const date = new Date(data.completionDate);
          setCompletionDate(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`);
        }
      }

      if (surveyRes.ok) {
        const data = await surveyRes.json();
        setSurveyCompleted(data.surveyCompleted);
      }
    } catch (error) {
      console.error('Failed to check certificate eligibility:', error);
    }
  };

  const handleSurveyComplete = () => {
    setIsSurveyOpen(false);
    setSurveyCompleted(true);
  };

  const handleDownloadCertificate = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('/api/user/certificate/download');
      
      if (response.ok) {
        // Get the PDF blob
        const blob = await response.blob();
        
        // Create a download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'certificate.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        toast.success('Certificate downloaded successfully!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to download certificate');
      }
    } catch (error) {
      console.error('Failed to download certificate:', error);
      toast.error('Failed to download certificate');
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-24">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-24">
      <main className="container mx-auto max-w-6xl px-4 py-8">
        {/* Progress Overview - Compact Horizontal Layout */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Progress Card */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-orange-500" />
                  <CardTitle className="text-sm font-semibold">Progress</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">
                  {progress?.completedModules || 0}/{progress?.totalModules || 12}
                </div>
                <Progress 
                  value={progress?.progressPercentage || 0} 
                  className="h-2 bg-gray-200"
                />
                <p className="text-xs text-gray-600">modules completed</p>
              </CardContent>
            </Card>

            {/* Average Score Card */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-orange-500" />
                  <CardTitle className="text-sm font-semibold">Average Score</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {progress?.averageScore || 0}%
                </div>
                <p className="text-xs text-gray-600">quiz performance</p>
              </CardContent>
            </Card>

            {/* Next Module Card */}
            {progress?.nextModule ? (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-orange-500" />
                    <CardTitle className="text-sm font-semibold">Next Module</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-lg font-bold text-gray-900">
                    Module {progress.nextModule.moduleNumber}
                  </div>
                  <div className="text-xs font-medium text-orange-600 line-clamp-1">
                    {progress.nextModule.title}
                  </div>
                  <Link href={`/module/${progress.nextModule.id}`}>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm h-8">
                      <Play className="mr-1 h-3 w-3" />
                      Continue
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-orange-500" />
                    <CardTitle className="text-sm font-semibold">Next Module</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    All modules completed!
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </motion.section>

        {/* Resume Section */}
        {progress?.nextModule && (
          <motion.section 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="h-5 w-5 text-orange-500 mr-2" />
              Resume Where You Left Off
            </h2>
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Module {progress.nextModule.moduleNumber}: {progress.nextModule.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Continue with your next module to maximum momentum
                    </p>
                  </div>
                  <Link href={`/module/${progress.nextModule.id}`}>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      Start Learning
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        )}

        {/* All Training Modules Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Training Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {progress?.modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className={`transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 border border-gray-200 flex flex-col ${
                  module.progress?.quizPassed 
                    ? 'bg-gradient-to-br from-green-50 to-white' 
                    : module.isUnlocked 
                      ? 'bg-white' 
                      : 'bg-gray-50'
                }`}>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    {/* Top Section: Badge and Title */}
                    <div className="flex items-start space-x-4 mb-4">
                      {/* Status Badge */}
                      <div className={`flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-full ${
                        module.progress?.quizPassed 
                          ? 'bg-green-500 text-white' 
                          : module.isUnlocked 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-gray-400 text-white'
                      }`}>
                        {module.progress?.quizPassed ? (
                          <CheckCircle2 className="h-7 w-7" />
                        ) : module.isUnlocked ? (
                          <span className="text-xl font-bold">{module.moduleNumber}</span>
                        ) : (
                          <Lock className="h-6 w-6" />
                        )}
                      </div>

                      {/* Module Title and Status */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-600">Module {module.moduleNumber}</span>
                          {module.progress?.quizPassed && (
                            <span className="text-xs font-semibold text-green-600">Completed</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Module Title - Fixed Height */}
                    <h3 className="font-bold text-gray-900 text-lg mb-3 leading-tight h-12 overflow-hidden">
                      {module.title}
                    </h3>

                    {/* Description - Fixed Height */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed h-10 overflow-hidden">
                      {module.description}
                    </p>

                    {/* Spacer to push bottom section down */}
                    <div className="flex-grow"></div>

                    {/* Bottom Section: Video+Quiz and Action Button - Always at Bottom */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                      {/* Video + Quiz Indicator */}
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <BookOpen className="h-4 w-4" />
                        <span>Video + Quiz</span>
                      </div>

                      {/* Action Button */}
                      {module.isUnlocked ? (
                        <Link href={`/module/${module.id}`}>
                          <Button 
                            className={`px-6 ${
                              module.progress?.quizPassed
                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                : 'bg-orange-500 hover:bg-orange-600 text-white'
                            }`}
                            size="sm"
                          >
                            {module.progress?.quizPassed ? 'Review' : 'Start'}
                          </Button>
                        </Link>
                      ) : (
                        <Button 
                          disabled
                          className="px-6 bg-gray-300 text-gray-500 cursor-not-allowed"
                          size="sm"
                        >
                          Locked
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Certification Section */}
        {certificateEligible && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 mb-12"
          >
            {!surveyCompleted ? (
              /* ── Survey gate card ── */
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 shadow-xl">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <ClipboardList className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        One Last Step — Complete the Survey
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        You've completed all 8 modules. Complete the short end-of-course survey to unlock your certificate.
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-blue-200">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                          <span className="text-sm">12 short questions — takes about 3 minutes</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                          <span className="text-sm">Your feedback helps improve the course for future students</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                          <span className="text-sm">Certificate unlocks immediately after submission</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-full bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                          <Award className="h-10 w-10 text-orange-400 mx-auto mb-2 opacity-60" />
                          <p className="text-sm text-gray-500">Certificate locked until survey is complete</p>
                        </div>
                        <Button
                          onClick={() => setIsSurveyOpen(true)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 text-base font-semibold"
                        >
                          <ClipboardList className="h-5 w-5 mr-2" />
                          Start Survey
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Achievement Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-blue-200 text-center">
                      <div className="text-3xl font-bold text-orange-600">{progress?.totalModules || 10}</div>
                      <div className="text-sm text-gray-600">Modules Completed</div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-blue-200 text-center">
                      <div className="text-3xl font-bold text-green-600">
                        {progress?.averageScore.toFixed(0) || 0}%
                      </div>
                      <div className="text-sm text-gray-600">Average Score</div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-blue-200 text-center">
                      <div className="text-3xl font-bold text-blue-600">100%</div>
                      <div className="text-sm text-gray-600">Course Completion</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* ── Certificate download card (survey done) ── */
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Award className="h-8 w-8 text-orange-600" />
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-900">
                          🎉 Congratulations!
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          You've completed all 8 modules and earned your certificate
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-orange-200">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Left: Certificate Info */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-gray-900 flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                          Certificate of Completion
                        </h3>
                        <p className="text-gray-700">
                          You have successfully completed the <strong>"Residential Construction Supply Chain Overview"</strong> training program.
                        </p>
                        {completionDate && (
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium">Completion Date:</span>
                            <span className="ml-2">{completionDate}</span>
                          </div>
                        )}
                        <div className="bg-orange-50 p-4 rounded border border-orange-200">
                          <p className="text-sm text-gray-700">
                            <strong>Note:</strong> Your certificate is professionally designed and includes:
                          </p>
                          <ul className="mt-2 text-sm text-gray-600 space-y-1 ml-4 list-disc">
                            <li>Your name and completion date</li>
                            <li>Course title and details</li>
                            <li>Strategem.Pro certification</li>
                          </ul>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-col justify-center space-y-4">
                        <Button
                          onClick={handleDownloadCertificate}
                          disabled={isDownloading}
                          className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg font-semibold"
                        >
                          {isDownloading ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Generating Certificate...
                            </>
                          ) : (
                            <>
                              <Download className="h-5 w-5 mr-2" />
                              Download Certificate
                            </>
                          )}
                        </Button>

                        <div className="bg-blue-50 p-4 rounded border border-blue-200">
                          <p className="text-sm text-blue-700 flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Your certificate is generated fresh each time with the latest branding
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Achievement Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-orange-200 text-center">
                      <div className="text-3xl font-bold text-orange-600">{progress?.totalModules || 10}</div>
                      <div className="text-sm text-gray-600">Modules Completed</div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-orange-200 text-center">
                      <div className="text-3xl font-bold text-green-600">
                        {progress?.averageScore.toFixed(0) || 0}%
                      </div>
                      <div className="text-sm text-gray-600">Average Score</div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-orange-200 text-center">
                      <div className="text-3xl font-bold text-blue-600">100%</div>
                      <div className="text-sm text-gray-600">Course Completion</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.section>
        )}

        {/* Survey Modal */}
        <SurveyModal
          open={isSurveyOpen}
          onSurveyComplete={handleSurveyComplete}
        />
      </main>
    </div>
  );
}
