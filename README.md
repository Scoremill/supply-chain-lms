# Construction LMS - Build A Home Course Platform

A Learning Management System for construction industry training, built with Next.js 14, Prisma, and PostgreSQL.

## Features

- 📚 10-module construction curriculum with video content
- 📝 Knowledge assessments with 85% passing threshold
- 🎓 Automatic certificate generation upon completion
- 👥 Multi-role system (Super Admin, Company Admin, Student)
- 🏢 Company-based student management
- 📊 Progress tracking and analytics

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (Neon-compatible)
- **ORM**: Prisma
- **Auth**: NextAuth.js
- **Styling**: Tailwind CSS
- **Captcha**: hCaptcha

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon recommended)
- AWS S3 bucket (for file uploads)
- hCaptcha account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/construction-lms.git
cd construction-lms
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Generate Prisma client and push schema:
```bash
yarn prisma generate
yarn prisma db push
```

5. Seed the database (optional):
```bash
yarn prisma db seed
```

6. Run development server:
```bash
yarn dev
```

## Deployment on Vercel

### Build Command
```bash
prisma generate && next build
```

### Environment Variables
See `.env.example` for required variables.

### Puppeteer Configuration
For PDF generation on Vercel, you may need:
- `@sparticuz/chromium` package for serverless Chromium
- Or switch to a PDF service like DocRaptor

## Database Migration

To migrate from another PostgreSQL host:
```bash
# Export from source
pg_dump $SOURCE_DATABASE_URL --no-owner --no-acl > backup.sql

# Import to Neon
psql $NEON_DATABASE_URL < backup.sql
```

## License

Proprietary - Strategem LLC

## Support

For technical support, use the in-app help form or contact your administrator.
