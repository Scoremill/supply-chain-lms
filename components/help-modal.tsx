
'use client';

import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [reason, setReason] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const captchaRef = useRef<HCaptcha>(null);

  const maxReasonLength = 500;

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    console.log('hCaptcha verified successfully');
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null);
    console.log('hCaptcha expired');
  };

  const handleCaptchaError = (error: string) => {
    console.error('hCaptcha error:', error);
    setCaptchaToken(null);
    toast.error('Captcha error. Please try again.');
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setSubject('');
    setReason('');
    setCaptchaToken(null);
    captchaRef.current?.resetCaptcha();
  };

  const handleSubmit = async () => {
    // Validation
    if (!fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!subject.trim()) {
      toast.error('Please enter a subject');
      return;
    }

    if (!reason.trim()) {
      toast.error('Please describe your reason for contact');
      return;
    }

    if (!captchaToken) {
      toast.error('Please complete the captcha verification');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/help/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          subject,
          reason,
          captchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          toast.error('Rate limit exceeded. Please try again later.');
        } else {
          const errorMessage = data.error || 'Failed to send message';
          console.error('API Error:', errorMessage);
          toast.error(errorMessage);
        }
        // Reset captcha on error
        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);
        return;
      }

      // Show success message
      setShowSuccess(true);
      resetForm();

      // Close modal after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);

    } catch (error) {
      console.error('Error submitting help request:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    setShowSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6">
              {/* Success Message */}
              {showSuccess ? (
                <div className="text-center py-8">
                  <div className="mb-4 text-green-500">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">
                    Your message has been sent. We will respond to your request in 48-72 hours.
                  </p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Help</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Fill out the form below and we'll get back to you within 48-72 hours.
                  </p>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <Label htmlFor="fullName">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <Label htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <Label htmlFor="subject">
                        Subject <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="Brief description of your issue"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    {/* Reason For Contact */}
                    <div>
                      <Label htmlFor="reason">
                        Reason For Contact <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="reason"
                        placeholder="Describe your issue or question in detail (max 500 characters)"
                        value={reason}
                        onChange={(e) => {
                          if (e.target.value.length <= maxReasonLength) {
                            setReason(e.target.value);
                          }
                        }}
                        className="mt-1 min-h-[120px] resize-none"
                      />
                      <div className="text-xs text-gray-500 mt-1 text-right">
                        {reason.length}/{maxReasonLength} characters
                      </div>
                    </div>

                    {/* hCaptcha */}
                    <div className="flex justify-center">
                      <HCaptcha
                        ref={captchaRef}
                        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || '9cbe7bac-2232-48ca-9e8a-4caefaba7f54'}
                        onVerify={handleCaptchaVerify}
                        onExpire={handleCaptchaExpire}
                        onError={handleCaptchaError}
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                        className="flex-1"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !captchaToken}
                        className="flex-1 bg-orange-500 hover:bg-orange-600"
                      >
                        <svg
                          className="h-4 w-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                        {isSubmitting ? 'Sending...' : 'Send'}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
