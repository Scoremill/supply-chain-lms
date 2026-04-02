
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Award,
  Play,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface QuizPanelProps {
  module: {
    id: string;
    moduleNumber: number;
    title: string;
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
  progress?: {
    videoWatched: boolean;
    quizPassed: boolean;
    quizScore: number | null;
    quizAttempts: number;
    lastAttemptDate?: Date | string | null;
  };
  videoWatched: boolean;
  videoStarted: boolean;
  quizUnlocked: boolean;
  timeRequirementMet: boolean;
  takeawaysSaved: boolean;
  remainingSeconds: number;
  onQuizStart: () => void;
  onQuizComplete: () => void;
  showQuiz: boolean;
}

export default function QuizPanel({
  module,
  progress,
  videoWatched,
  videoStarted,
  quizUnlocked,
  timeRequirementMet,
  takeawaysSaved,
  remainingSeconds,
  onQuizStart,
  onQuizComplete,
  showQuiz
}: QuizPanelProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState<{
    score: number;
    passed: boolean;
    correctAnswers: { [key: string]: string };
  } | null>(null);

  const questions = module.quizzes || [];
  const currentQuestion = questions[currentQuestionIndex];

  // Lockout computation — only applies when quiz has NOT been passed yet
  const MAX_ATTEMPTS_BEFORE_LOCKOUT = 3;
  const LOCKOUT_MS = 24 * 60 * 60 * 1000;

  const isLockedOut = (() => {
    if (progress?.quizPassed) return false; // unlimited retakes once passed
    const attempts = progress?.quizAttempts ?? 0;
    if (attempts > 0 && attempts % MAX_ATTEMPTS_BEFORE_LOCKOUT === 0 && progress?.lastAttemptDate) {
      const elapsed = Date.now() - new Date(progress.lastAttemptDate).getTime();
      return elapsed < LOCKOUT_MS;
    }
    return false;
  })();

  const lockoutEndsAt = (() => {
    if (!isLockedOut || !progress?.lastAttemptDate) return null;
    return new Date(new Date(progress.lastAttemptDate).getTime() + LOCKOUT_MS);
  })();

  const lockoutHoursRemaining = lockoutEndsAt
    ? Math.ceil((lockoutEndsAt.getTime() - Date.now()) / (60 * 60 * 1000))
    : 0;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion?.id || '']: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/module/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          moduleId: module.id,
          answers: answers,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setQuizResults(result);
        setShowResults(true);

        if (result.passed) {
          toast.success(`Congratulations! You passed with ${result.score}%`);
        } else {
          toast.error(`Quiz failed. You scored ${result.score}%. You need 85% to pass.`);
        }
      } else if (response.status === 429) {
        const result = await response.json();
        toast.error(result.message || 'Too many attempts. Please wait 24 hours before retrying.');
      } else {
        toast.error('Failed to submit quiz');
      }
    } catch (error) {
      console.error('Quiz submission error:', error);
      toast.error('An error occurred while submitting the quiz');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetakeQuiz = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setQuizResults(null);
    onQuizStart();
  };

  const handleBackToModule = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setQuizResults(null);
    onQuizComplete();
  };

  const handleCloseModal = () => {
    if (!showResults) {
      // If quiz is in progress, ask for confirmation
      if (Object.keys(answers).length > 0) {
        const confirmed = window.confirm('Are you sure you want to close? Your progress will be lost.');
        if (!confirmed) return;
      }
    }
    handleBackToModule();
  };

  return (
    <>
      {/* Quiz Card - Shows when quiz is not active */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
            🧠 Knowledge Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Questions:</span>
              <span className="font-semibold">{questions.length}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Pass Score:</span>
              <span className="font-semibold text-orange-600">85%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Time Limit:</span>
              <span className="font-semibold">No limit</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
              📊 Progress Status
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  {videoWatched ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-gray-300 mr-2" />
                  )}
                  <span>Video Watched</span>
                </div>
                {videoWatched && <Badge variant="secondary" className="text-xs">✓</Badge>}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  {(timeRequirementMet || progress?.quizPassed) ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-gray-300 mr-2" />
                  )}
                  <span>Module Reviewed</span>
                </div>
                {(timeRequirementMet || progress?.quizPassed) && <Badge variant="secondary" className="text-xs">✓</Badge>}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  {progress?.quizPassed ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-gray-300 mr-2" />
                  )}
                  <span>Quiz Passed</span>
                </div>
                {progress?.quizPassed && (
                  <Badge variant="secondary" className="text-xs">
                    {Math.round(progress.quizScore || 0)}%
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  {takeawaysSaved ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-gray-300 mr-2" />
                  )}
                  <span>Takeaways Submitted</span>
                </div>
                {takeawaysSaved && <Badge variant="secondary" className="text-xs">✓</Badge>}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Attempts:</span>
            <span>{progress?.quizAttempts ?? 0}</span>
          </div>

          <Button
            onClick={onQuizStart}
            disabled={!quizUnlocked || isLockedOut}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
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

          {isLockedOut && (
            <div className="text-xs text-red-600 space-y-1">
              <p className="flex items-center font-semibold">
                <AlertCircle className="h-3 w-3 mr-1 flex-shrink-0" />
                Quiz locked for 24 hours after 3 failed attempts.
              </p>
              <p className="text-center">
                Try again in {lockoutHoursRemaining} hour{lockoutHoursRemaining !== 1 ? 's' : ''}.
              </p>
            </div>
          )}

          {!quizUnlocked && (
            <div className="text-xs text-amber-600">
              {!(videoStarted || videoWatched) ? (
                <p className="flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Watch the video to continue
                </p>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="font-mono text-lg font-bold tabular-nums">
                      {Math.floor(remainingSeconds / 60).toString().padStart(2, '0')}:{(remainingSeconds % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-center leading-snug">
                    The quiz will open when this countdown reaches zero. In the meantime, please review the content in this module.
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quiz Modal - Shows when quiz is active */}
      <Dialog open={showQuiz || showResults} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
          {/* Results View */}
          {showResults && quizResults ? (
            <div className="p-6">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  Quiz Results
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="mb-4">
                    {quizResults.passed ? (
                      <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                    ) : (
                      <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
                    )}
                  </div>
                  
                  <div className="text-4xl font-bold mb-3">
                    {quizResults.score}%
                  </div>
                  
                  <Badge 
                    variant={quizResults.passed ? "default" : "destructive"}
                    className={`text-base px-4 py-1 ${quizResults.passed ? 'bg-green-500' : 'bg-red-500'}`}
                  >
                    {quizResults.passed ? 'PASSED' : 'FAILED'}
                  </Badge>

                  <p className="text-base text-gray-600 mt-4">
                    {quizResults.passed 
                      ? 'Congratulations! You can now proceed to the next module.'
                      : 'You need 85% to pass. Review the material and try again.'
                    }
                  </p>
                </div>

                <div className="space-y-2">
                  {questions.map((question, index) => {
                    const userAnswer = answers[question.id];
                    const correctAnswer = quizResults.correctAnswers[question.id];
                    const isCorrect = userAnswer === correctAnswer;

                    return (
                      <div 
                        key={question.id} 
                        className={`text-sm p-3 rounded ${
                          isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>Question {index + 1}</span>
                          {isCorrect ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        {!isCorrect && (
                          <div className="mt-1 text-sm">
                            Correct: {correctAnswer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={handleRetakeQuiz}
                    variant="outline"
                    className="flex-1"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Retake Quiz
                  </Button>
                  <Button
                    onClick={handleBackToModule}
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* Quiz Question View */
            <div className="p-6">
              <DialogHeader className="mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-500 text-xl">🧠</span>
                    <DialogTitle className="text-xl font-bold text-gray-900">
                      {module.title} Quiz
                    </DialogTitle>
                  </div>
                  <span className="text-sm text-gray-500">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Answer all questions to complete the assessment. You need 85% to pass.
                </p>
              </DialogHeader>

              <Progress 
                value={((currentQuestionIndex + 1) / questions.length) * 100} 
                className="h-2 mb-6"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  {currentQuestion && (
                    <div className="space-y-6">
                      <h3 className="text-base font-medium text-gray-900 leading-relaxed">
                        {currentQuestion.questionText}
                      </h3>

                      <RadioGroup
                        value={answers[currentQuestion.id] || ''}
                        onValueChange={handleAnswerChange}
                        className="space-y-3"
                      >
                        {['A', 'B', 'C', 'D'].map((option) => (
                          <div 
                            key={option} 
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <RadioGroupItem
                              value={option}
                              id={`${currentQuestion.id}-${option}`}
                              className="mt-0.5"
                            />
                            <Label
                              htmlFor={`${currentQuestion.id}-${option}`}
                              className="text-sm text-gray-700 leading-relaxed cursor-pointer flex-1"
                            >
                              {currentQuestion[`option${option}` as keyof typeof currentQuestion] as string}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between items-center pt-4 border-t">
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="text-gray-600"
                >
                  Previous
                </Button>

                {currentQuestionIndex === questions.length - 1 ? (
                  <Button
                    onClick={handleSubmitQuiz}
                    disabled={isSubmitting || Object.keys(answers).length !== questions.length}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={currentQuestionIndex >= questions.length - 1}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
