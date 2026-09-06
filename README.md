# SDE-2 Job Digest

Daily GitHub Actions email digest for Abhishek's target roles.

## Flow

ChatGPT/job search -> `data/jobs.json` -> GitHub Actions -> rank/filter -> Resend -> Gmail

Target: SDE-2/SDE II, Senior/Frontend Engineer, React Native, React, TypeScript, JavaScript, Next.js. Prioritize Bengaluru/India/remote India. Exclude QA/SDET, backend-only, native Android/iOS-only and Staff/Principal/Lead roles.

## Setup

1. Create a Resend account and verify the sender domain/address.
2. Add repository secret `RESEND_API_KEY`.
3. Add repository variables:
   - `EMAIL_FROM` = e.g. `Jobs <jobs@yourdomain.com>`
   - `EMAIL_TO` = `abhishek.jaiswal.dev.1999@gmail.com`
4. Push this repository to GitHub.
5. Run **Actions -> Daily SDE-2 Job Digest -> Run workflow** to test.
6. It is scheduled for 9:00 AM Asia/Kolkata daily.

`data/jobs.json` is the input that ChatGPT will update with fresh jobs.

`data/sent_jobs.json` prevents the same application URL being emailed repeatedly.

## Local

```bash
npm install
RESEND_API_KEY=... EMAIL_FROM="Jobs <jobs@yourdomain.com>" EMAIL_TO="abhishek.jaiswal.dev.1999@gmail.com" npm run send-digest
```

Dry run:

```bash
npm run preview
```
