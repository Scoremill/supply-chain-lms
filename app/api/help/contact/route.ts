
import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limiting store
// Map structure: IP -> { count: number, resetTime: number }
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limit: 3 requests per hour
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function getRateLimitKey(ip: string): string {
  return `help_contact_${ip}`;
}

function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const key = getRateLimitKey(ip);
  const now = Date.now();
  const record = rateLimitStore.get(key);

  // If no record exists, allow and create new record
  if (!record) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  // If reset time has passed, reset the counter
  if (now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  // If under the limit, increment and allow
  if (record.count < RATE_LIMIT_MAX) {
    record.count += 1;
    rateLimitStore.set(key, record);
    return { allowed: true };
  }

  // Rate limit exceeded
  return { allowed: false, resetTime: record.resetTime };
}

async function verifyHCaptcha(token: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.HCAPTCHA_SECRET_KEY) {
      console.error('HCAPTCHA_SECRET_KEY is not configured');
      return { success: false, error: 'hCaptcha configuration error' };
    }

    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `response=${token}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
    });

    const data = await response.json();
    
    if (!data.success) {
      console.error('hCaptcha verification failed:', data);
      return { success: false, error: data['error-codes']?.join(', ') || 'Verification failed' };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error verifying hCaptcha:', error);
    return { success: false, error: 'Network error during verification' };
  }
}

async function sendToWebhook(
  fullName: string,
  email: string,
  subject: string,
  reason: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const webhookUrl = process.env.WEBHOOK_URL;
    const authHeaderName = process.env.WEBHOOK_AUTH_HEADER_NAME;
    const authHeaderValue = process.env.WEBHOOK_AUTH_HEADER_VALUE;

    if (!webhookUrl || !authHeaderName || !authHeaderValue) {
      console.error('Webhook configuration is missing');
      return { success: false, error: 'Webhook configuration error' };
    }

    const payload = {
      fullName,
      email,
      subject,
      reason,
      submittedAt: new Date().toISOString(),
      source: 'Supply Chain Academy LMS',
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [authHeaderName]: authHeaderValue,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Webhook request failed:', response.status, response.statusText);
      return { success: false, error: 'Webhook request failed' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending to webhook:', error);
    return { success: false, error: 'Failed to send webhook request' };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get IP address from request
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Check rate limit
    const rateLimitCheck = checkRateLimit(ip);
    if (!rateLimitCheck.allowed) {
      const resetDate = rateLimitCheck.resetTime ? new Date(rateLimitCheck.resetTime) : null;
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          resetTime: resetDate?.toISOString(),
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { fullName, email, subject, reason, captchaToken } = body;

    // Validate required fields
    if (!fullName || !email || !subject || !reason || !captchaToken) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Verify hCaptcha
    const captchaResult = await verifyHCaptcha(captchaToken);
    if (!captchaResult.success) {
      return NextResponse.json(
        { error: `Captcha verification failed: ${captchaResult.error || 'Unknown error'}` },
        { status: 400 }
      );
    }

    // Send to webhook
    const webhookResult = await sendToWebhook(fullName, email, subject, reason);

    if (!webhookResult.success) {
      return NextResponse.json(
        { error: 'Failed to send help request' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error handling help request:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
