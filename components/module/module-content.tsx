
'use client';

import { useState, useEffect, useRef, memo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import QuizPanel from './quiz-panel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Play, CheckCircle2, Clock, RotateCcw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import ModuleMap from './module-map';
import type { TocEntry } from '@/lib/content-enhancement/types';

interface ModuleContentProps {
  module: {
    id: string;
    moduleNumber: number;
    title: string;
    description: string;
    content: string;
    youtubeUrl: string | null;
    progress?: Array<{
      videoWatched: boolean;
      quizPassed: boolean;
      quizScore: number | null;
      quizAttempts: number;
      lastAttemptDate?: Date | string | null;
      completedAt?: Date | null;
      timeSpent: number;
    }>;
    quizzes: Array<{
      id: string;
      questionText: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD: string;
      correctAnswer: string;
    }>;
  };
  toc?: TocEntry[];
  isEnhanced?: boolean;
  session: any;
}

/**
 * Memoized module content renderer. Prevents the dangerouslySetInnerHTML DOM
 * from being reset during parent re-renders (e.g. the 1-second countdown timer),
 * which would wipe native <details> open state and knowledge-check interactivity.
 */
const ModuleHtmlContent = memo(function ModuleHtmlContent({
  html,
  contentRef,
}: {
  html: string;
  contentRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      ref={contentRef}
      className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-h2:text-lg prose-h3:text-base prose-h4:text-sm prose-p:text-gray-700 prose-ul:text-gray-700 prose-li:text-gray-700 prose-table:text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});

export default function ModuleContent({ module, toc, isEnhanced, session }: ModuleContentProps) {
  const router = useRouter();
  const [videoWatched, setVideoWatched] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isMarkingAsWatched, setIsMarkingAsWatched] = useState(false);
  const videoWatchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [takeaways, setTakeaways] = useState('');
  const [takeawaysSaved, setTakeawaysSaved] = useState(false);
  const [isSavingTakeaways, setIsSavingTakeaways] = useState(false);

  // Time tracking state
  const startTimeRef = useRef<number | null>(null);
  const accumulatedTimeRef = useRef<number>(0);
  const isTrackingRef = useRef<boolean>(false);
  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const sessionElapsedRef = useRef<number>(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const progress = module.progress?.[0];
  const maxTakeawaysLength = 2000;
  const isModuleCompleted = progress?.completedAt !== null && progress?.completedAt !== undefined;
  const isStudent = session?.user?.role === 'STUDENT';
  const isAdmin = session?.user?.role === 'COMPANY_ADMIN' || session?.user?.role === 'SUPER_ADMIN';

  // Quiz unlock: requires video watched + 15 minutes cumulative time (admins bypass)
  const MINIMUM_TIME_SECONDS = 900; // 15 minutes
  const [timeRequirementMet, setTimeRequirementMet] = useState(
    () => (progress?.timeSpent ?? 0) >= MINIMUM_TIME_SECONDS
  );
  const timeRequirementMetRef = useRef(timeRequirementMet);
  const quizUnlocked = isAdmin || isModuleCompleted || (videoWatched && timeRequirementMet);

  const [remainingSeconds, setRemainingSeconds] = useState(() => {
    const spent = progress?.timeSpent ?? 0;
    return Math.max(0, MINIMUM_TIME_SECONDS - spent);
  });

  useEffect(() => {
    if (timeRequirementMet || isAdmin || isModuleCompleted) return;
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeRequirementMet(true);
          timeRequirementMetRef.current = true;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeRequirementMet, isAdmin, isModuleCompleted]);

  useEffect(() => {
    setVideoWatched(progress?.videoWatched || false);
  }, [progress]);

  // Fetch existing takeaways on load
  useEffect(() => {
    const fetchTakeaways = async () => {
      try {
        const response = await fetch(`/api/module/takeaways?moduleId=${module.id}`);
        if (response.ok) {
          const data = await response.json();
          setTakeaways(data.takeaways || '');
          setTakeawaysSaved(!!(data.takeaways && data.takeaways.trim()));
        }
      } catch (error) {
        console.error('Error fetching takeaways:', error);
      }
    };

    fetchTakeaways();
  }, [module.id]);

  // Knowledge Check interactivity: require answer selection before reveal
  // Uses event delegation on the container for robustness with SSR/hydration
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check if an option was clicked (or a child of an option)
      const option = target.closest<HTMLElement>('.knowledge-check__option');
      if (option) {
        const check = option.closest<HTMLElement>('.knowledge-check');
        if (!check || check.getAttribute('data-revealed') === 'true') return;

        // Clear previous selection within this check
        check.querySelectorAll('.knowledge-check__option').forEach((o) =>
          o.classList.remove('knowledge-check__option--selected')
        );
        // Highlight selected option
        option.classList.add('knowledge-check__option--selected');
        check.setAttribute('data-selected', option.getAttribute('data-option') || '');

        // Unlock reveal button
        const btn = check.querySelector<HTMLButtonElement>('.knowledge-check__reveal-btn');
        if (btn) {
          btn.classList.remove('knowledge-check__reveal-btn--locked');
          btn.disabled = false;
          btn.textContent = 'Reveal Answer';
        }
        return;
      }

      // Check if the reveal button was clicked
      const revealBtn = target.closest<HTMLElement>('.knowledge-check__reveal-btn');
      if (revealBtn) {
        const check = revealBtn.closest<HTMLElement>('.knowledge-check');
        if (!check) return;
        const selected = check.getAttribute('data-selected');
        const correctLabel = check.getAttribute('data-correct');
        if (!selected || !correctLabel || check.getAttribute('data-revealed') === 'true') return;

        check.setAttribute('data-revealed', 'true');

        // Show correct/incorrect feedback
        check.querySelectorAll<HTMLElement>('.knowledge-check__option').forEach((o) => {
          const label = o.getAttribute('data-option');
          o.classList.add('knowledge-check__option--revealed');
          if (label === correctLabel) {
            o.classList.add('knowledge-check__option--correct');
          } else if (label === selected) {
            o.classList.add('knowledge-check__option--incorrect');
          }
        });

        // Show answer, hide button
        const answerDiv = check.querySelector<HTMLElement>('.knowledge-check__answer');
        if (answerDiv) answerDiv.classList.remove('knowledge-check__answer--hidden');
        (revealBtn as HTMLElement).style.display = 'none';
      }
    };

    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, [module.content]);

  // Time tracking functions
  const startTimeTracking = () => {
    if (!isStudent || isModuleCompleted || isTrackingRef.current) return;
    
    startTimeRef.current = Date.now();
    isTrackingRef.current = true;
  };

  const stopTimeTracking = () => {
    if (!isTrackingRef.current || startTimeRef.current === null) return;
    
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    accumulatedTimeRef.current += elapsed;
    
    startTimeRef.current = null;
    isTrackingRef.current = false;
  };

  const saveTimeToBackend = async () => {
    if (!isStudent || accumulatedTimeRef.current === 0) return;

    try {
      await fetch('/api/module/time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          moduleId: module.id,
          timeSpent: accumulatedTimeRef.current,
        }),
      });
      
      // Reset accumulated time after successful save
      accumulatedTimeRef.current = 0;
    } catch (error) {
      console.error('Error saving time:', error);
    }
  };

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimeTracking();
        saveTimeToBackend();
      } else {
        startTimeTracking();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isStudent, isModuleCompleted]);

  // Start time tracking when component mounts and set up periodic saves
  useEffect(() => {
    // Only track time for students on non-completed modules
    if (!isStudent || isModuleCompleted) return;

    // Start tracking
    startTimeTracking();

    // Set up periodic save every 30 seconds
    saveIntervalRef.current = setInterval(() => {
      if (isTrackingRef.current && startTimeRef.current !== null) {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        accumulatedTimeRef.current += elapsed;
        sessionElapsedRef.current += elapsed;
        startTimeRef.current = Date.now();
        saveTimeToBackend();

        // Silently check if 15-minute threshold has been met
        if (!timeRequirementMetRef.current) {
          const totalTime = (progress?.timeSpent ?? 0) + sessionElapsedRef.current;
          if (totalTime >= MINIMUM_TIME_SECONDS) {
            setTimeRequirementMet(true);
            timeRequirementMetRef.current = true;
          }
        }
      }
    }, 30000); // 30 seconds

    // Cleanup on unmount
    return () => {
      stopTimeTracking();
      saveTimeToBackend();

      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
      }
      if (videoWatchTimerRef.current) {
        clearTimeout(videoWatchTimerRef.current);
      }
    };
  }, [module.id, isStudent, isModuleCompleted]);

  const markVideoAsWatched = async () => {
    if (videoWatched) return;

    setIsMarkingAsWatched(true);
    try {
      const response = await fetch('/api/module/watch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          moduleId: module.id,
        }),
      });

      if (response.ok) {
        setVideoWatched(true);
        toast.success('Video marked as watched!');
      } else {
        toast.error('Failed to mark video as watched');
      }
    } catch (error) {
      console.error('Error marking video as watched:', error);
      toast.error('An error occurred');
    } finally {
      setIsMarkingAsWatched(false);
    }
  };

  const handleQuizStart = () => {
    setShowQuiz(true);
  };

  const handleQuizComplete = () => {
    setShowQuiz(false);
    // Refresh the page to update progress
    router.refresh();
  };

  const handleSaveTakeaways = async () => {
    if (!takeaways.trim()) {
      toast.error('Please enter your key takeaways');
      return;
    }

    setIsSavingTakeaways(true);
    try {
      const response = await fetch('/api/module/takeaways', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          moduleId: module.id,
          takeaways: takeaways,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setTakeawaysSaved(true);
        toast.success('Key Takeaways have been saved');
        // If saving takeaways completed the module, refresh to update progress
        if (data.moduleCompleted) {
          router.refresh();
        }
      } else {
        toast.error('Failed to save takeaways');
      }
    } catch (error) {
      console.error('Error saving takeaways:', error);
      toast.error('An error occurred while saving');
    } finally {
      setIsSavingTakeaways(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-24">
      <main className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Module {module.moduleNumber}: {module.title}
            </h1>
            <p className="text-gray-600">Lean Construction Training</p>
          </div>
        </motion.div>

        {/* Video and Quiz Panel Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Video Section */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  {/* Video Section */}
                  <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                    {module.youtubeUrl ? (
                      <>
                        <iframe
                          src={module.youtubeUrl}
                          className="w-full h-full"
                          frameBorder="0"
                          allowFullScreen
                          title={`${module.title} Video`}
                        />
                        {!videoStarted && !videoWatched && (
                          <div
                            className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 cursor-pointer"
                            onClick={() => {
                              setVideoStarted(true);
                              // Delay marking video as watched by 2 minutes to ensure student actually watches
                              videoWatchTimerRef.current = setTimeout(() => {
                                markVideoAsWatched();
                              }, 120000); // 2 minutes
                            }}
                          >
                            <div className="flex flex-col items-center text-white">
                              <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center mb-4 hover:bg-orange-600 transition-colors">
                                <Play className="h-10 w-10 ml-1" />
                              </div>
                              <p className="text-lg font-semibold">Click to Start Module Video</p>
                              <p className="text-sm text-gray-300 mt-1">A 15-minute review period will begin</p>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-white">
                        <Play className="h-16 w-16 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                          Module {module.moduleNumber}: Lean Construction
                        </h3>
                        <p className="text-gray-300 mb-4">Video content will be added soon</p>
                        {!videoWatched && (
                          <Button
                            onClick={markVideoAsWatched}
                            disabled={isMarkingAsWatched}
                            className="bg-orange-500 hover:bg-orange-600"
                          >
                            {isMarkingAsWatched ? 'Marking...' : 'Mark as Watched'}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quiz Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <QuizPanel
                module={module}
                progress={progress}
                videoWatched={videoWatched}
                videoStarted={videoStarted}
                quizUnlocked={quizUnlocked}
                timeRequirementMet={timeRequirementMet}
                takeawaysSaved={takeawaysSaved}
                remainingSeconds={remainingSeconds}
                onQuizStart={handleQuizStart}
                onQuizComplete={handleQuizComplete}
                showQuiz={showQuiz}
              />
            </motion.div>
          </div>
        </div>

        {/* Full Width Content Sections */}
        <div className="space-y-6">
          {/* Module Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  📚 Module Content
                </h2>
                {isEnhanced && toc && toc.length > 0 && (
                  <ModuleMap entries={toc} />
                )}
                <ModuleHtmlContent html={module.content} contentRef={contentRef} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Takeaways Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-rose-50 border-rose-200 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  ✍️ Your Key Takeaways - <span className="text-orange-600">This Section Will Be Reviewed</span>
                </h2>
                <p className="text-sm text-gray-700 mb-6">
                  Reflect on what you've learned in this module. Write down <strong>three key insights or actions</strong> you will take away from this lesson.
                  This will help reinforce your learning and will be reviewed by your instructor.
                </p>
                <Textarea
                  value={takeaways}
                  onChange={(e) => {
                    if (e.target.value.length <= maxTakeawaysLength) {
                      setTakeaways(e.target.value);
                    }
                  }}
                  placeholder="Example: 1. I learned that eliminating waiting time can significantly improve project flow... 2. I will implement daily huddles to reduce communication waste... 3. Respecting people means empowering them to solve problems..."
                  className="min-h-[250px] bg-white border-rose-200 focus:border-rose-400 focus:ring-rose-400 resize-none"
                />
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-600">
                    {maxTakeawaysLength - takeaways.length} characters remaining
                  </span>
                  <Button
                    onClick={handleSaveTakeaways}
                    disabled={isSavingTakeaways || !takeaways.trim()}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isSavingTakeaways ? 'Saving...' : 'Save Takeaways'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bottom Quiz Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Ready to Test Your Knowledge?
                    </h3>
                    {!quizUnlocked && (
                      <div className="text-sm text-amber-600 mt-1">
                        {!(videoStarted || videoWatched) ? (
                          <p>Watch the video to continue</p>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              <span className="font-mono text-base font-bold tabular-nums">
                                {Math.floor(remainingSeconds / 60).toString().padStart(2, '0')}:{(remainingSeconds % 60).toString().padStart(2, '0')}
                              </span>
                            </div>
                            <p className="leading-snug">
                              The quiz will open when this countdown reaches zero. In the meantime, please review the content in this module.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    {quizUnlocked && !progress?.quizPassed && (
                      <p className="text-sm text-gray-500 mt-1">
                        You need 70% to pass. Good luck!
                      </p>
                    )}
                    {progress?.quizPassed && (
                      <p className="text-sm text-green-600 mt-1">
                        Passed with {Math.round(progress.quizScore || 0)}%
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={handleQuizStart}
                    disabled={!quizUnlocked}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                  >
                    {progress?.quizPassed ? (
                      <>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Retake Quiz
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Quiz
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
