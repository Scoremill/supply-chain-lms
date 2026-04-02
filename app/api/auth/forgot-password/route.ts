
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendEmail, getPasswordResetEmailHtml } from '@/lib/email';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Always return success message for security (don't reveal if email exists)
    if (!user) {
      return NextResponse.json({
        message: 'If an account with that email exists, we have sent a password reset link.',
      });
    }

    // Generate secure random token
    const token = crypto.randomBytes(32).toString('hex');
    
    // Set expiration to 24 hours from now
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Delete any existing reset tokens for this user
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    // Create new reset token
    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    // Send reset email
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const resetUrl = `${appUrl}/auth/reset-password?token=${token}`;
    
    const emailHtml = getPasswordResetEmailHtml(resetUrl);
    
    await sendEmail({
      to: user.email,
      subject: 'Reset Your Password - Lean Homebuilding Advisors',
      html: emailHtml,
    });

    return NextResponse.json({
      message: 'If an account with that email exists, we have sent a password reset link.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
