# Supply Chain LMS — Project Plan

## Overview

Clone of HowToBuildAHome (Scoremill/construction-lms) repurposed as a Supply Chain course platform. Same LMS engine, new curriculum content.

## Source Project

- **Repo:** Scoremill/construction-lms
- **Local:** /Users/as/Desktop/Claude/HowToBuildAHome
- **Stack:** Next.js 14, Prisma + Postgres, NextAuth v4, Tailwind CSS
- **Key features carried over:** Sequential module unlocking, quiz engine (85% pass, 3 attempts, 24-hour lockout), time-on-task tracking (15 min minimum), student takeaways, PDF certificates, company enrollment codes, multi-role dashboards (Student / Company Admin / Super Admin), post-course survey, CSV exports

## Decisions Needed Before Starting

1. **Project/repo name** — e.g., "supply-chain-academy", "supply-chain-lms"
2. **Course title** — what students see (e.g., "Supply Chain Fundamentals for Construction")
3. **Module outline** — 10 modules with titles, descriptions, and content (see MODULES-TEMPLATE.md)
4. **Quiz questions** — 1 per module, multiple choice (A/B/C/D), see MODULES-TEMPLATE.md
5. **YouTube videos** — does Ken have videos, or will modules be text-only initially?
6. **Branding** — same Strategem orange, or different color scheme?
7. **Certificate text** — what should the completion certificate say?
8. **Survey questions** — keep the same 12 questions, or customize for supply chain audience?
9. **Default admin email** — astevens@strategem.pro, or a different account?
10. **Domain** — custom domain, or fine with *.vercel.app for now?

## Infrastructure Setup (When Ready)

- [ ] Create GitHub repo under Scoremill org
- [ ] Clone HowToBuildAHome codebase into new repo
- [ ] Create new Neon database (free tier)
- [ ] Create new Vercel project linked to repo
- [ ] Set environment variables (DATABASE_URL, NEXTAUTH_SECRET, EMAIL_*, etc.)
- [ ] Update branding (titles, meta, logos, certificate template)
- [ ] Replace module content + quiz questions in seed file
- [ ] Run Prisma migrations + seed
- [ ] Verify end-to-end: signup → module progression → quiz → certificate
- [ ] Push and deploy

## Files in This Folder

| File | Purpose |
|------|---------|
| PROJECT-PLAN.md | This file — overall plan and decisions tracker |
| MODULES-TEMPLATE.md | Template for 10 module outlines + quiz questions (to be filled in by Drew/Ken) |
