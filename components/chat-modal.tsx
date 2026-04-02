
'use client';

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Generate a unique ID with timestamp and random string
const generateId = (prefix: string) => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 11);
  return `${prefix}_${timestamp}_${randomStr}`;
};

export default function ChatModal({ open, onOpenChange }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const webhookUrl = 'https://scoremill.app.n8n.cloud/webhook/bbab3936-5461-461a-b46d-5c87500107f7/chat';

  // Initialize session and messages when modal opens
  useEffect(() => {
    if (!open) {
      // Reset on close
      setMessages([]);
      setInputMessage('');
    } else {
      // Generate new session ID when modal opens
      setSessionId(generateId('session'));
      
      // Add welcome message when modal opens
      setMessages([
        {
          id: '1',
          text: "Hello! I'm here to help you with your supply chain questions. How can I assist you today?",
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, [open]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !sessionId) return;

    const messageText = inputMessage.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Generate unique chatId for this message
      const chatId = generateId('chat');
      const timestamp = new Date().toISOString();

      // Send message to webhook with the required format
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId,
          message: messageText,
          sessionId,
          timestamp,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.output || data.message || "I received your message!",
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[80vw] h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b border-gray-200">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Chat To A Builder
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-1">
            Ask questions about supply chain management and get expert guidance
          </p>
        </DialogHeader>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages Area */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 px-6 py-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-gray-200 px-6 py-4 bg-white">
            <div className="flex items-end space-x-3">
              <Textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
                className="flex-1 min-h-[60px] max-h-[120px] resize-none rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 h-[60px] rounded-xl transition-all hover:scale-105"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
