
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { sendEmail, getWelcomeEmailHtml } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, companyCode, password } = body;

    // Validate required fields
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Find or default to Public company (lookup via CompanyCode table)
    let company;
    let resolvedSignupCode: string;
    if (companyCode && companyCode.trim() !== '') {
      resolvedSignupCode = companyCode.trim().toUpperCase();
      const codeEntry = await (prisma as any).companyCode.findUnique({
        where: { code: resolvedSignupCode },
        include: { company: true }
      });

      if (!codeEntry) {
        return NextResponse.json(
          { error: 'Invalid company code' },
          { status: 400 }
        );
      }
      company = codeEntry.company;
    } else {
      // Default to Public company
      resolvedSignupCode = 'PUBLIC';
      const publicEntry = await (prisma as any).companyCode.findUnique({
        where: { code: 'PUBLIC' },
        include: { company: true }
      });
      company = publicEntry?.company ?? null;
    }

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 500 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await (prisma as any).user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
        role: 'STUDENT',
        companyId: company.id,
        signupCode: resolvedSignupCode,
      },
      include: {
        company: true
      }
    });

    // Create initial progress for Module 1 (unlock first module)
    const firstModule = await prisma.module.findFirst({
      where: { moduleNumber: 1 }
    });

    if (firstModule) {
      await prisma.userProgress.create({
        data: {
          userId: user.id,
          moduleId: firstModule.id,
          videoWatched: false,
          quizPassed: false,
          quizAttempts: 0,
        }
      });
    }

    // Send welcome email
    try {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const firstName = fullName.split(' ')[0]; // Extract first name
      const welcomeEmailHtml = getWelcomeEmailHtml(firstName, appUrl);
      
      await sendEmail({
        to: email,
        subject: 'Welcome to Strategem Training Program',
        html: welcomeEmailHtml,
      });
      
      console.log(`Welcome email sent to ${email}`);
    } catch (emailError) {
      // Log error but don't fail the signup
      console.error('Failed to send welcome email:', emailError);
    }

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.company?.companyName
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
