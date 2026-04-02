'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { ClipboardList, CheckCircle2 } from 'lucide-react';

const MODULE_TITLES = [
  'Module 1 – Current State, and How We Got Here',
  'Module 2 – Unit Pricing for Materials and Labor is the Key',
  'Module 3 – How Supply Chain Management is Typically Done',
  'Module 4 – The Way Turn-key Subcontractors Manage Materials and Labor',
  'Module 5 – Whole Supply Chain Communications',
  'Module 6 – When the Supply Chain Breaks – 1.2 million',
  'Module 7 – Continual Improvement and AI in Supply Chain Management',
  'Module 8 – What Japanese Homebuilders Do Differently',
];

const LIKERT_5_OPTIONS = [
  { value: 1, label: '1 – Not at all' },
  { value: 2, label: '2 – Slightly' },
  { value: 3, label: '3 – Moderately' },
  { value: 4, label: '4 – Very' },
  { value: 5, label: '5 – Extremely' },
];

interface SurveyModalProps {
  open: boolean;
  onSurveyComplete: () => void;
}

interface FormState {
  q1OverallExperience: number | null;
  q2ContentMeaningful: number | null;
  q3ModuleCohesion: number | null;
  q4LayoutRating: number | null;
  q5TechIssues: boolean | null;
  q5TechDetails: string;
  q6VideoEffectiveness: number | null;
  q7MostUsefulModule: string;
  q8OverProcessedModule: string;
  q9Confidence: number | null;
  q10Relevancy: number | null;
  q11Nps: number | null;
  q12Improvement: string;
}

const INITIAL_FORM: FormState = {
  q1OverallExperience: null,
  q2ContentMeaningful: null,
  q3ModuleCohesion: null,
  q4LayoutRating: null,
  q5TechIssues: null,
  q5TechDetails: '',
  q6VideoEffectiveness: null,
  q7MostUsefulModule: '',
  q8OverProcessedModule: '',
  q9Confidence: null,
  q10Relevancy: null,
  q11Nps: null,
  q12Improvement: '',
};

// --- Reusable sub-components ---

function ScaleSelector({
  value,
  min,
  max,
  onChange,
}: {
  value: number | null;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const values = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`w-10 h-10 rounded-full border-2 text-sm font-semibold transition-colors
            ${value === v
              ? 'bg-orange-500 border-orange-500 text-white'
              : 'border-gray-300 text-gray-700 hover:border-orange-400 hover:text-orange-600'
            }`}
        >
          {v}
        </button>
      ))}
    </div>
  );
}

function LikertSelector({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      {LIKERT_5_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 px-3 py-2 rounded-lg border-2 text-sm font-medium text-center transition-colors
            ${value === opt.value
              ? 'bg-orange-500 border-orange-500 text-white'
              : 'border-gray-300 text-gray-700 hover:border-orange-400 hover:text-orange-600'
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function QuestionBlock({ number, text, children }: { number: number; text: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold text-gray-800 leading-snug">
        <span className="text-orange-500 font-bold mr-1">{number}.</span> {text}
        <span className="text-red-500 ml-1">*</span>
      </Label>
      {children}
    </div>
  );
}

export default function SurveyModal({ open, onSurveyComplete }: SurveyModalProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): string | null => {
    if (form.q1OverallExperience === null) return 'Please answer Question 1.';
    if (form.q2ContentMeaningful === null) return 'Please answer Question 2.';
    if (form.q3ModuleCohesion === null) return 'Please answer Question 3.';
    if (form.q4LayoutRating === null) return 'Please answer Question 4.';
    if (form.q5TechIssues === null) return 'Please answer Question 5.';
    if (form.q5TechIssues && !form.q5TechDetails.trim()) return 'Please describe the technical issue in Question 5.';
    if (form.q6VideoEffectiveness === null) return 'Please answer Question 6.';
    if (!form.q7MostUsefulModule) return 'Please select a module for Question 7.';
    if (!form.q8OverProcessedModule) return 'Please select an answer for Question 8.';
    if (form.q9Confidence === null) return 'Please answer Question 9.';
    if (form.q10Relevancy === null) return 'Please answer Question 10.';
    if (form.q11Nps === null) return 'Please answer Question 11.';
    if (!form.q12Improvement.trim()) return 'Please answer Question 12.';
    return null;
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) {
      toast({ title: 'Incomplete Survey', description: error, variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/user/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        toast({ title: 'Error', description: data.error || 'Failed to submit survey.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to submit survey.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessContinue = () => {
    onSurveyComplete();
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="max-w-2xl w-full max-h-[90vh] flex flex-col p-0 gap-0"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* Fixed header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b shrink-0">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ClipboardList className="h-5 w-5 text-orange-500" />
            End of Course Survey
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-1">
            Please complete this short survey to unlock your certificate. All questions are required.
          </p>
        </DialogHeader>

        {submitted ? (
          /* Success state */
          <div className="flex flex-col items-center justify-center flex-1 px-6 py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Thank you for your feedback!</h3>
            <p className="text-gray-600 max-w-sm">
              Your survey has been submitted. Your certificate is now ready to download.
            </p>
            <Button
              onClick={handleSuccessContinue}
              className="mt-2 bg-green-500 hover:bg-green-600 text-white px-8"
            >
              View My Certificate
            </Button>
          </div>
        ) : (
          <>
            {/* Scrollable form body */}
            <div className="overflow-y-auto flex-1 px-6 py-6 space-y-8">

              {/* Q1 */}
              <QuestionBlock number={1} text="On a scale of 1–10, how would you rate your overall experience navigating the end-to-end process of building a home through this course?">
                <ScaleSelector value={form.q1OverallExperience} min={1} max={10} onChange={(v) => set('q1OverallExperience', v)} />
                <div className="flex justify-between text-xs text-gray-400 px-1 mt-1">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </QuestionBlock>

              {/* Q2 */}
              <QuestionBlock number={2} text="How meaningful did you find the content across all 8 modules in terms of providing a realistic understanding of construction supply chain management?">
                <LikertSelector value={form.q2ContentMeaningful} onChange={(v) => set('q2ContentMeaningful', v)} />
              </QuestionBlock>

              {/* Q3 */}
              <QuestionBlock number={3} text="How well did the course connect the modules into a cohesive flow? Did the phases of the build feel connected or siloed?">
                <LikertSelector value={form.q3ModuleCohesion} onChange={(v) => set('q3ModuleCohesion', v)} />
                <div className="flex justify-between text-xs text-gray-400 px-1 mt-1">
                  <span>Very disconnected / siloed</span>
                  <span>Extremely cohesive</span>
                </div>
              </QuestionBlock>

              {/* Q4 */}
              <QuestionBlock number={4} text="How would you rate the layout and ease of use of the online platform? Were you able to find documents or templates without wasteful searching?">
                <div className="flex gap-3 flex-wrap">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => set('q4LayoutRating', v)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors
                        ${form.q4LayoutRating === v
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'border-gray-300 text-gray-700 hover:border-orange-400 hover:text-orange-600'
                        }`}
                    >
                      {'★'.repeat(v)}{'☆'.repeat(5 - v)}
                    </button>
                  ))}
                </div>
              </QuestionBlock>

              {/* Q5 */}
              <QuestionBlock number={5} text="Did you encounter any technical performance issues (e.g., video buffering, broken links, or login errors) that disrupted your learning flow?">
                <div className="flex gap-3">
                  {[
                    { label: 'No', value: false },
                    { label: 'Yes', value: true },
                  ].map((opt) => (
                    <button
                      key={String(opt.value)}
                      type="button"
                      onClick={() => {
                        set('q5TechIssues', opt.value);
                        if (!opt.value) set('q5TechDetails', '');
                      }}
                      className={`px-6 py-2 rounded-lg border-2 text-sm font-medium transition-colors
                        ${form.q5TechIssues === opt.value
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'border-gray-300 text-gray-700 hover:border-orange-400 hover:text-orange-600'
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {form.q5TechIssues === true && (
                  <div className="mt-3 space-y-1">
                    <Label className="text-xs text-gray-600">Please describe the issue(s): <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={form.q5TechDetails}
                      onChange={(e) => set('q5TechDetails', e.target.value)}
                      placeholder="Describe the technical issue(s) you encountered..."
                      rows={3}
                      className="text-sm"
                    />
                  </div>
                )}
              </QuestionBlock>

              {/* Q6 */}
              <QuestionBlock number={6} text="How effective was the video content in demonstrating on-site construction techniques that are difficult to explain through text alone?">
                <LikertSelector value={form.q6VideoEffectiveness} onChange={(v) => set('q6VideoEffectiveness', v)} />
                <div className="flex justify-between text-xs text-gray-400 px-1 mt-1">
                  <span>Not effective</span>
                  <span>Extremely effective</span>
                </div>
              </QuestionBlock>

              {/* Q7 */}
              <QuestionBlock number={7} text="Which module provided the most useful takeaways or practical tools (checklists, budget sheets, etc.) that you plan to use on your own project?">
                <div className="grid grid-cols-1 gap-2">
                  {MODULE_TITLES.map((title) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() => set('q7MostUsefulModule', title)}
                      className={`text-left px-4 py-2 rounded-lg border-2 text-sm transition-colors
                        ${form.q7MostUsefulModule === title
                          ? 'bg-orange-50 border-orange-500 text-orange-800 font-medium'
                          : 'border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50/50'
                        }`}
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </QuestionBlock>

              {/* Q8 */}
              <QuestionBlock number={8} text="Was there any module that felt like 'over-processing' — containing information that wasn't necessary for your understanding of the home-building process?">
                <div className="grid grid-cols-1 gap-2">
                  {['None', ...MODULE_TITLES].map((title) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() => set('q8OverProcessedModule', title)}
                      className={`text-left px-4 py-2 rounded-lg border-2 text-sm transition-colors
                        ${form.q8OverProcessedModule === title
                          ? 'bg-orange-50 border-orange-500 text-orange-800 font-medium'
                          : 'border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50/50'
                        }`}
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </QuestionBlock>

              {/* Q9 */}
              <QuestionBlock number={9} text="After completing these 8 modules, how confident do you feel in your ability to manage or improve supply chain operations in residential construction?">
                <ScaleSelector value={form.q9Confidence} min={1} max={10} onChange={(v) => set('q9Confidence', v)} />
                <div className="flex justify-between text-xs text-gray-400 px-1 mt-1">
                  <span>Not confident</span>
                  <span>Very confident</span>
                </div>
              </QuestionBlock>

              {/* Q10 */}
              <QuestionBlock number={10} text="How relevant is the knowledge gained in this course to your immediate future plans for home ownership or construction management?">
                <LikertSelector value={form.q10Relevancy} onChange={(v) => set('q10Relevancy', v)} />
                <div className="flex justify-between text-xs text-gray-400 px-1 mt-1">
                  <span>Not relevant</span>
                  <span>Extremely relevant</span>
                </div>
              </QuestionBlock>

              {/* Q11 */}
              <QuestionBlock number={11} text="How likely are you to recommend this course to a colleague or someone planning to build a home? (0 = Not at all likely, 10 = Extremely likely)">
                <ScaleSelector value={form.q11Nps} min={0} max={10} onChange={(v) => set('q11Nps', v)} />
                <div className="flex justify-between text-xs text-gray-400 px-1 mt-1">
                  <span>Not at all likely</span>
                  <span>Extremely likely</span>
                </div>
              </QuestionBlock>

              {/* Q12 */}
              <QuestionBlock number={12} text="If you were the 'Project Manager' for this course, what is one specific improvement you would make to the curriculum to add more value for the next group of students?">
                <Textarea
                  value={form.q12Improvement}
                  onChange={(e) => set('q12Improvement', e.target.value)}
                  placeholder="Share your improvement idea..."
                  rows={4}
                  className="text-sm"
                />
              </QuestionBlock>

            </div>

            {/* Fixed footer */}
            <div className="px-6 py-4 border-t bg-gray-50/80 shrink-0">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  <span className="text-red-500">*</span> All questions are required
                </p>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Survey'
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
