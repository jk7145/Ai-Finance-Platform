# AI Finance Platform

A full-stack AI-powered personal finance management application built with Next.js 15, React 19, and modern web technologies.

## 🚀 Features

- **Multi-Account Management** - Track multiple bank accounts, credit cards, and savings
- **AI Receipt Scanning** - Upload receipts and extract transaction data automatically using Google Gemini
- **Recurring Transactions** - Automate recurring bills, subscriptions, and income
- **Budget Tracking** - Set monthly budgets with automated email alerts
- **AI Financial Insights** - Get personalized financial advice powered by AI
- **Email Notifications** - Receive budget alerts and monthly reports
- **Real-time Dashboard** - Visualize your financial data with interactive charts

## 🛠️ Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19 RC
- Tailwind CSS
- Shadcn UI
- React Hook Form + Zod

### Backend
- Next.js API Routes & Server Actions
- Prisma ORM
- SQLite (Dev) / PostgreSQL (Production)
- Clerk Authentication
- Inngest (Background Jobs)

### AI & Services
- Google Gemini AI
- Resend (Email)
- ArcJet (Security)

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-finance-platform

# Install dependencies
npm install --legacy-peer-deps

# Set up environment variables
cp .env.example .env
# Add your API keys to .env

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Run development server
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database
DATABASE_URL="file:./dev.db"

# AI
GEMINI_API_KEY=

# Email
RESEND_API_KEY=

# Security
ARCJET_KEY=
```

## 🚀 Running the Application

### Start the development server
```bash
npm run dev
```
Open http://localhost:3000

### Start Inngest dev server (background jobs)
```bash
npx inngest-cli dev
```
Open http://localhost:8288

### Open Prisma Studio (database GUI)
```bash
npx prisma studio
```
Open http://localhost:5555

## 📱 Features in Detail

### AI Receipt Scanning
Upload receipt images and the AI automatically extracts:
- Transaction amount
- Date
- Merchant name
- Category
- Description

### Recurring Transactions
Set up automatic processing for:
- Monthly rent/mortgage
- Subscriptions (Netflix, Spotify, etc.)
- Utility bills
- Regular income

### Budget Alerts
- Set monthly spending limits
- Receive email alerts at 80% threshold
- Track spending by category

### Monthly Reports
- AI-generated financial insights
- Spending analysis by category
- Personalized recommendations
- Delivered via email

## 🏗️ Project Structure

```
ai-finance-platform/
├── app/                    # Next.js App Router
├── actions/                # Server Actions
├── components/             # React Components
├── lib/                    # Utilities
├── prisma/                 # Database Schema
├── emails/                 # Email Templates
└── public/                 # Static Assets
```

## 🔒 Security

- ArcJet middleware for security, rate limiting, and bot detection
- Clerk for authentication and session management
- Server-side validation with Zod
- Database transactions for data consistency
- Environment variable protection

## 📊 Database Schema

- **User** - User accounts synced with Clerk
- **Account** - Financial accounts (checking, savings, credit)
- **Transaction** - All financial transactions
- **Budget** - Monthly budget tracking

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database
- Development: SQLite
- Production: PostgreSQL (Supabase recommended)

## 📝 License

MIT

## 👨‍💻 Author

**Jay Kumar**

---

Made with 💗 using Next.js, React, and AI
