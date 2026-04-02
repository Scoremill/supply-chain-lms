
import nodemailer from 'nodemailer';

function createTransporter() {
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;

  console.log('[Email] Creating transporter with:', {
    host,
    port,
    user,
    passLength: pass ? pass.length : 0,
    from: process.env.EMAIL_FROM,
  });

  if (!host || !user || !pass) {
    console.error('[Email] Missing SMTP config - EMAIL_HOST:', !!host, 'EMAIL_USER:', !!user, 'EMAIL_PASSWORD:', !!pass);
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass },
  });
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  const transporter = createTransporter();

  if (!transporter) {
    console.error('[Email] Cannot send email - transporter not configured');
    return { success: false, error: 'Email not configured' };
  }

  try {
    console.log('[Email] Sending email to:', to, 'subject:', subject);
    const info = await transporter.sendMail({
      from: `"Strategem" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    });

    console.log('[Email] Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('[Email] Failed to send email:', error?.message || error);
    console.error('[Email] Error code:', error?.code);
    console.error('[Email] Full error:', JSON.stringify(error, null, 2));
    return { success: false, error };
  }
}

export function getWelcomeEmailHtml(firstName: string, appUrl: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Strategem</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #f97316;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: #f9fafb;
          padding: 30px;
          border-radius: 0 0 8px 8px;
        }
        .greeting {
          font-size: 18px;
          margin-bottom: 15px;
        }
        .section {
          margin-bottom: 20px;
        }
        .section-title {
          font-weight: bold;
          color: #f97316;
          margin-bottom: 10px;
        }
        ul {
          list-style-type: none;
          padding-left: 0;
        }
        ul li {
          padding: 5px 0;
          padding-left: 20px;
          position: relative;
        }
        ul li:before {
          content: "•";
          color: #f97316;
          font-weight: bold;
          position: absolute;
          left: 0;
        }
        .cta-button {
          display: inline-block;
          background-color: #f97316;
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
          font-weight: bold;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin: 0;">Strategem</h1>
      </div>
      <div class="content">
        <div class="greeting">
          <strong>Hello ${firstName},</strong>
        </div>

        <p>
          Welcome to the Strategem training program! We're excited to have you join our
          comprehensive 8-module course on Residential Construction Supply Chain Management.
        </p>
        
        <div class="section">
          <div class="section-title">What to expect:</div>
          <ul>
            <li>8 comprehensive modules covering construction supply chain management</li>
            <li>Interactive quizzes to test your knowledge</li>
            <li>Real-world applications and case studies</li>
            <li>Certificate of completion upon finishing all modules</li>
          </ul>
        </div>
        
        <div class="section">
          <div class="section-title">Getting started:</div>
          <ul>
            <li>Log in to your account at <a href="${appUrl}">${appUrl}</a></li>
            <li>Begin with Module 1: Current State, and How We Got Here</li>
            <li>Progress through each module at your own pace</li>
          </ul>
        </div>
        
        <div style="text-align: center;">
          <a href="${appUrl}" class="cta-button">Get Started Now</a>
        </div>
        
        <div class="footer">
          <p>
            If you have any questions or need support, please don't hesitate to reach out to us at 
            <a href="mailto:strategempro@gmail.com">strategempro@gmail.com</a>
          </p>
          <p style="margin-top: 15px;">
            <strong>Best regards,</strong><br>
            Strategem Team
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function getPasswordResetEmailHtml(resetUrl: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #f97316;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: #f9fafb;
          padding: 30px;
          border-radius: 0 0 8px 8px;
        }
        .cta-button {
          display: inline-block;
          background-color: #f97316;
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
          font-weight: bold;
        }
        .warning {
          background-color: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 12px;
          margin: 20px 0;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin: 0;">Reset Your Password</h1>
      </div>
      <div class="content">
        <p>
          We received a request to reset your password for your Strategem account.
        </p>
        
        <p>
          Click the button below to reset your password:
        </p>
        
        <div style="text-align: center;">
          <a href="${resetUrl}" class="cta-button">Reset Password</a>
        </div>
        
        <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
          Or copy and paste this link into your browser:<br>
          <a href="${resetUrl}">${resetUrl}</a>
        </p>
        
        <div class="warning">
          <strong>⏰ Important:</strong> This password reset link will expire in 24 hours for security reasons.
        </div>
        
        <p style="margin-top: 20px;">
          If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.
        </p>
        
        <div class="footer">
          <p>
            If you're having trouble with the button above, or have any questions, please contact us at 
            <a href="mailto:strategempro@gmail.com">strategempro@gmail.com</a>
          </p>
          <p style="margin-top: 15px;">
            <strong>Best regards,</strong><br>
            Strategem Team
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}
