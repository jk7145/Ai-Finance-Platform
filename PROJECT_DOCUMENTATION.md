# 🚀 AI Finance Platform - Complete Technical Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Database Schema](#database-schema)
5. [Key Features](#key-features)
6. [Authentication Flow](#authentication-flow)
7. [API Routes](#api-routes)
8. [Background Jobs](#background-jobs)
9. [Security Implementation](#security-implementation)
10. [AI Integration](#ai-integration)
11. [Interview Questions & Answers](#interview-questions)

---

## 🎯 Project Overview

**AI Finance Platform** is a full-stack personal finance management application that helps users:
- Track income and expenses across multiple accounts
- Set and monitor budgets with AI-powered insights
- Automate recurring transactions
- Scan receipts using AI (Google Gemini)
- Receive email notifications for budget alerts
- Generate monthly financial reports with AI analysis

**Live URLs:**
- Frontend: http://localhost:3000
- Inngest Dashboard: http://localhost:8288
- Prisma Studio: http://localhost:5555

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19 RC** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Component library (Radix UI primitives)
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Recharts** - Data visualization
- **Lucide React** - Icons

### Backend
- **Next.js API Routes** - RESTful endpoints
- **Prisma ORM** - Database toolkit
- **SQLite** (Dev) / **PostgreSQL** (Production via Supabase)
- **Clerk** - Authentication & user management
- **Inngest** - Background job orchestration
- **Google Gemini AI** - Receipt scanning & financial insights
- **Resend** - Transactional emails
- **ArcJet** - Security, rate limiting, bot detection

### DevOps & Tools
- **Turbopack** - Fast bundler (Next.js 15)
- **Prisma Studio** - Database GUI
- **React Email** - Email templates

---

## 🏗️ Architecture

### Application Structure
```
ai-finance-platform/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (main)/                   # Protected routes
│   │   ├── dashboard/            # Main dashboard
│   │   ├── account/[id]/         # Account details
│   │   └── transaction/          # Transaction management
│   ├── api/                      # API routes
│   │   ├── inngest/              # Background jobs endpoint
│   │   └── seed/                 # Database seeding
│   └── lib/                      # Validation schemas
├── actions/                      # Server Actions
│   ├── account.js
│   ├── transaction.js
│   ├── dashboard.js
│   ├── budget.js
│   └── send-email.js
├── components/                   # React components
│   └── ui/                       # Shadcn UI components
├── lib/                          # Utilities
│   ├── prisma.js                 # Database client
│   ├── arcjet.js                 # Security config
│   └── inngest/                  # Background jobs
├── prisma/                       # Database
│   ├── schema.prisma             # Database schema
│   └── dev.db                    # SQLite database
└── middleware.js                 # Request middleware
```

### Request Flow
```
User Request
    ↓
Middleware (ArcJet Security + Clerk Auth)
    ↓
Next.js App Router
    ↓
Server Actions (actions/*.js)
    ↓
Prisma ORM
    ↓
Database (SQLite/PostgreSQL)
```

---

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id            String          @id @default(uuid())
  clerkUserId   String          @unique
  email         String          @unique
  name          String?
  imageUrl      String?
  transactions  Transaction[]
  accounts      Account[]
  budgets       Budget[]
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
}
```

**Purpose:** Stores user information synced with Clerk authentication

### Account Model
```prisma
model Account {
  id           String        @id @default(uuid())
  name         String
  type         String        @default("CURRENT")
  balance      Decimal       @default(0)
  isDefault    Boolean       @default(false)
  userId       String
  user         User          @relation(fields: [userId], references: [id])
  transactions Transaction[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}
```

**Purpose:** Users can have multiple accounts (Checking, Savings, Credit Card, etc.)

### Transaction Model
```prisma
model Transaction {
  id                String    @id @default(uuid())
  type              String    // INCOME or EXPENSE
  amount            Decimal
  description       String?
  date              DateTime
  category          String
  receiptUrl        String?
  isRecurring       Boolean   @default(false)
  recurringInterval String?   // DAILY, WEEKLY, MONTHLY, YEARLY
  nextRecurringDate DateTime?
  lastProcessed     DateTime?
  status            String    @default("COMPLETED")
  userId            String
  accountId         String
  user              User      @relation(fields: [userId], references: [id])
  account           Account   @relation(fields: [accountId], references: [id])
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}
```

**Purpose:** Tracks all financial transactions with recurring support

### Budget Model
```prisma
model Budget {
  id            String    @id @default(uuid())
  amount        Decimal
  lastAlertSent DateTime?
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id])
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

**Purpose:** Monthly budget tracking with alert system

---

## ✨ Key Features

### 1. Multi-Account Management
- Create unlimited accounts (Checking, Savings, Credit Card)
- Set one account as default
- Real-time balance updates
- Account-specific transaction history

### 2. Transaction Management
**Features:**
- Add income/expense transactions
- Categorize transactions (housing, food, entertainment, etc.)
- Upload receipt images
- AI-powered receipt scanning (extracts amount, date, merchant, category)
- Recurring transactions (daily, weekly, monthly, yearly)
- Bulk delete transactions
- Transaction filtering and search

**Code Example - Create Transaction:**
```javascript
// actions/transaction.js
export async function createTransaction(data) {
  const { userId } = await auth();
  const user = await db.user.findUnique({ where: { clerkUserId: userId } });
  
  // Calculate balance change
  const balanceChange = data.type === "EXPENSE" ? -data.amount : data.amount;
  
  // Atomic transaction
  const transaction = await db.$transaction(async (tx) => {
    const newTransaction = await tx.transaction.create({ data });
    await tx.account.update({
      where: { id: data.accountId },
      data: { balance: { increment: balanceChange } }
    });
    return newTransaction;
  });
  
  revalidatePath("/dashboard");
  return { success: true, data: transaction };
}
```

### 3. AI Receipt Scanning
**Technology:** Google Gemini 1.5 Flash

**Process:**
1. User uploads receipt image
2. Image converted to base64
3. Sent to Gemini with structured prompt
4. AI extracts: amount, date, merchant, category, description
5. Auto-fills transaction form

**Code Example:**
```javascript
export async function scanReceipt(file) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const arrayBuffer = await file.arrayBuffer();
  const base64String = Buffer.from(arrayBuffer).toString("base64");
  
  const prompt = `Extract: amount, date, description, merchant, category`;
  const result = await model.generateContent([
    { inlineData: { data: base64String, mimeType: file.type } },
    prompt
  ]);
  
  return JSON.parse(result.response.text());
}
```

### 4. Budget Management
**Features:**
- Set monthly budget limit
- Real-time spending tracking
- 80% threshold alerts via email
- Visual progress indicators
- Category-wise expense breakdown

### 5. Recurring Transactions
**How it works:**
1. User marks transaction as recurring (daily/weekly/monthly/yearly)
2. System calculates `nextRecurringDate`
3. Inngest cron job runs daily at midnight
4. Finds due recurring transactions
5. Creates new transactions automatically
6. Updates account balances
7. Calculates next occurrence date

**Code Flow:**
```javascript
// Cron job (runs daily)
triggerRecurringTransactions → 
  Find due transactions → 
    Send events to Inngest → 
      processRecurringTransaction → 
        Create new transaction + Update balance
```

### 6. Email Notifications
**Powered by:** Resend API + React Email

**Types:**
1. **Budget Alerts** - When spending exceeds 80%
2. **Monthly Reports** - AI-generated financial insights

**Email Template Example:**
```jsx
// emails/template.jsx
export default function EmailTemplate({ userName, type, data }) {
  if (type === "budget-alert") {
    return (
      <Html>
        <Text>Hi {userName}, you've used {data.percentageUsed}% of your budget!</Text>
      </Html>
    );
  }
}
```

---

## 🔐 Authentication Flow

### Technology: Clerk

**Sign Up Process:**
1. User visits `/sign-up`
2. Clerk handles registration (email/password, OAuth)
3. Clerk creates user in their system
4. Webhook/middleware creates User in our database
5. User redirected to `/dashboard`

**Middleware Protection:**
```javascript
// middleware.js
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

const clerk = clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }
  return NextResponse.next();
});
```

**User Sync:**
```javascript
// In server actions
const { userId } = await auth(); // Clerk userId
const user = await db.user.findUnique({
  where: { clerkUserId: userId }
});
```

---

## 🛣️ API Routes

### 1. `/api/inngest` (GET, POST, PUT)
**Purpose:** Inngest webhook endpoint for background jobs

**Functions Registered:**
- `processRecurringTransaction`
- `triggerRecurringTransactions`
- `generateMonthlyReports`
- `checkBudgetAlerts`

**Code:**
```javascript
import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [/* 4 functions */]
});
```

### 2. `/api/seed` (GET)
**Purpose:** Populate database with test data

**Usage:**
```bash
curl http://localhost:3000/api/seed
```

---

## ⚙️ Background Jobs (Inngest)

### Why Inngest?
- Reliable job execution
- Built-in retries with exponential backoff
- Cron scheduling
- Event-driven architecture
- Throttling and rate limiting
- Visual debugging dashboard

### Job 1: Process Recurring Transaction
**Trigger:** Event `transaction.recurring.process`
**Throttle:** 10 requests per minute per user

```javascript
export const processRecurringTransaction = inngest.createFunction(
  {
    id: "process-recurring-transaction",
    throttle: { limit: 10, period: "1m", key: "event.data.userId" }
  },
  { event: "transaction.recurring.process" },
  async ({ event, step }) => {
    await step.run("process-transaction", async () => {
      // 1. Find transaction
      // 2. Check if due
      // 3. Create new transaction
      // 4. Update account balance
      // 5. Calculate next recurring date
    });
  }
);
```

### Job 2: Trigger Recurring Transactions
**Trigger:** Cron `0 0 * * *` (Daily at midnight)

```javascript
export const triggerRecurringTransactions = inngest.createFunction(
  { id: "trigger-recurring-transactions" },
  { cron: "0 0 * * *" },
  async ({ step }) => {
    const recurringTransactions = await step.run("fetch", async () => {
      return await db.transaction.findMany({
        where: {
          isRecurring: true,
          nextRecurringDate: { lte: new Date() }
        }
      });
    });
    
    // Send events for each transaction
    const events = recurringTransactions.map(t => ({
      name: "transaction.recurring.process",
      data: { transactionId: t.id, userId: t.userId }
    }));
    
    await inngest.send(events);
  }
);
```

### Job 3: Generate Monthly Reports
**Trigger:** Cron `0 0 1 * *` (1st of each month)
**AI:** Google Gemini for insights

```javascript
export const generateMonthlyReports = inngest.createFunction(
  { id: "generate-monthly-reports" },
  { cron: "0 0 1 * *" },
  async ({ step }) => {
    const users = await step.run("fetch-users", async () => {
      return await db.user.findMany({ include: { accounts: true } });
    });
    
    for (const user of users) {
      await step.run(`generate-report-${user.id}`, async () => {
        const stats = await getMonthlyStats(user.id);
        const insights = await generateFinancialInsights(stats); // Gemini AI
        
        await sendEmail({
          to: user.email,
          subject: "Monthly Financial Report",
          react: EmailTemplate({ userName: user.name, type: "monthly-report", data: { stats, insights } })
        });
      });
    }
  }
);
```

### Job 4: Check Budget Alerts
**Trigger:** Cron `0 */6 * * *` (Every 6 hours)

```javascript
export const checkBudgetAlerts = inngest.createFunction(
  { name: "Check Budget Alerts" },
  { cron: "0 */6 * * *" },
  async ({ step }) => {
    const budgets = await step.run("fetch-budgets", async () => {
      return await db.budget.findMany({
        include: { user: { include: { accounts: true } } }
      });
    });
    
    for (const budget of budgets) {
      await step.run(`check-budget-${budget.id}`, async () => {
        const expenses = await db.transaction.aggregate({
          where: { userId: budget.userId, type: "EXPENSE" },
          _sum: { amount: true }
        });
        
        const percentageUsed = (expenses._sum.amount / budget.amount) * 100;
        
        if (percentageUsed >= 80) {
          await sendEmail({
            to: budget.user.email,
            subject: "Budget Alert",
            react: EmailTemplate({ type: "budget-alert", data: { percentageUsed } })
          });
          
          await db.budget.update({
            where: { id: budget.id },
            data: { lastAlertSent: new Date() }
          });
        }
      });
    }
  }
);
```

---

## 🔒 Security Implementation

### ArcJet Security Layer

**Features:**
1. **Shield Protection** - Blocks malicious requests
2. **Bot Detection** - Allows search engines, blocks bad bots
3. **Rate Limiting** - Prevents abuse

**Configuration:**
```javascript
// lib/arcjet.js
import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "GO_HTTP"]
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 10,
      interval: "1m",
      capacity: 20
    })
  ]
});

export default aj;
```

**Middleware Chain:**
```javascript
// middleware.js
export default createMiddleware(aj, clerk);
// ArcJet runs first (security), then Clerk (auth)
```

**Rate Limiting in Actions:**
```javascript
export async function createTransaction(data) {
  const { userId } = await auth();
  const req = await request();
  
  const decision = await aj.protect(req, { userId, requested: 1 });
  
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      throw new Error("Too many requests. Please try again later.");
    }
    throw new Error("Request blocked");
  }
  
  // Continue with transaction creation
}
```

---

## 🤖 AI Integration

### 1. Receipt Scanning (Google Gemini)
**Model:** gemini-1.5-flash
**Input:** Receipt image (JPEG, PNG)
**Output:** Structured JSON

**Prompt Engineering:**
```javascript
const prompt = `
  Analyze this receipt image and extract the following information in JSON format:
  - Total amount (just the number)
  - Date (in ISO format)
  - Description or items purchased (brief summary)
  - Merchant/store name
  - Suggested category (one of: housing, transportation, groceries, utilities, 
    entertainment, food, shopping, healthcare, education, personal, travel, 
    insurance, gifts, bills, other-expense)
  
  Only respond with valid JSON in this exact format:
  {
    "amount": number,
    "date": "ISO date string",
    "description": "string",
    "merchantName": "string",
    "category": "string"
  }
`;
```

**Why Gemini 1.5 Flash?**
- Fast response time
- Multimodal (text + images)
- Cost-effective
- Good accuracy for structured data extraction

### 2. Financial Insights (Google Gemini)
**Model:** gemini-1.5-flash
**Input:** Monthly spending statistics
**Output:** 3 actionable insights

**Example:**
```javascript
async function generateFinancialInsights(stats, month) {
  const prompt = `
    Analyze this financial data and provide 3 concise, actionable insights.
    Focus on spending patterns and practical advice.
    
    Financial Data for ${month}:
    - Total Income: ${stats.totalIncome}
    - Total Expenses: ${stats.totalExpenses}
    - Net Income: ${stats.totalIncome - stats.totalExpenses}
    - Expense Categories: ${Object.entries(stats.byCategory)
        .map(([category, amount]) => `${category}: ${amount}`)
        .join(", ")}
    
    Format the response as a JSON array of strings.
  `;
  
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}
```

**Sample Output:**
```json
[
  "Your food expenses increased by 25% this month. Consider meal planning to reduce costs.",
  "You're spending 40% of income on housing. This is within the recommended 30-35% range.",
  "Great job! You saved $500 this month. Consider investing in a high-yield savings account."
]
```

---

## 📊 Data Flow Examples

### Creating a Transaction
```
1. User fills form → /transaction/create
2. Form validation (Zod schema)
3. Submit → createTransaction() server action
4. ArcJet rate limit check
5. Clerk authentication check
6. Find user in database
7. Prisma transaction:
   a. Create transaction record
   b. Update account balance (atomic)
8. Revalidate cache
9. Redirect to dashboard
10. UI updates automatically
```

### Recurring Transaction Flow
```
Day 1: User creates recurring transaction (monthly rent)
  → nextRecurringDate = 30 days from now
  
Day 30: Inngest cron job runs at midnight
  → Finds transaction where nextRecurringDate <= today
  → Sends event to processRecurringTransaction
  → Creates new transaction
  → Updates account balance
  → Sets nextRecurringDate = 60 days from Day 1
  
Day 60: Process repeats automatically
```

---

## 🎤 Interview Questions & Answers

### General Architecture

**Q1: Explain the overall architecture of your finance platform.**

**A:** "It's a full-stack Next.js 15 application using the App Router. The frontend is built with React 19 and Tailwind CSS. For the backend, I use Next.js API routes and Server Actions for data mutations. The database is managed with Prisma ORM, using SQLite for development and PostgreSQL (Supabase) for production.

Authentication is handled by Clerk, which provides secure user management. For security, I implemented ArcJet middleware that includes shield protection, bot detection, and rate limiting.

The unique aspect is the background job system using Inngest, which handles recurring transactions, monthly reports, and budget alerts. I also integrated Google Gemini AI for receipt scanning and financial insights."

---

**Q2: Why did you choose Next.js over other frameworks?**

**A:** "Next.js 15 offers several advantages:
1. **Server Components** - Reduce client-side JavaScript, improve performance
2. **Server Actions** - Type-safe API calls without separate endpoints
3. **App Router** - Better routing with layouts and nested routes
4. **Turbopack** - Faster development builds
5. **Built-in optimizations** - Image optimization, font optimization, automatic code splitting
6. **Full-stack** - Frontend and backend in one codebase
7. **Vercel deployment** - Seamless production deployment

For a finance app, performance and security are critical, and Next.js provides both out of the box."

---

### Database & ORM

**Q3: Explain your database schema and relationships.**

**A:** "I have 4 main models:

1. **User** - Stores user info synced with Clerk (clerkUserId as foreign key)
2. **Account** - One-to-many with User. Users can have multiple accounts (checking, savings, credit cards)
3. **Transaction** - Many-to-one with both User and Account. Tracks all financial activities
4. **Budget** - One-to-one with User. Each user has one monthly budget

Key relationships:
- User → Accounts (1:N)
- User → Transactions (1:N)
- Account → Transactions (1:N)
- User → Budget (1:1)

I use Prisma's cascade delete, so when a user is deleted, all their accounts, transactions, and budgets are automatically removed."

**Q4: How do you ensure data consistency when creating transactions?**

**A:** "I use Prisma's transaction API to ensure atomicity. When creating a transaction, two things must happen:
1. Create the transaction record
2. Update the account balance

If either fails, both should rollback. Here's how:

```javascript
const transaction = await db.$transaction(async (tx) => {
  const newTransaction = await tx.transaction.create({ data });
  await tx.account.update({
    where: { id: data.accountId },
    data: { balance: { increment: balanceChange } }
  });
  return newTransaction;
});
```

This ensures ACID properties - either both operations succeed or both fail."

---

**Q5: Why Prisma over raw SQL or other ORMs?**

**A:** "Prisma offers several benefits:
1. **Type Safety** - Auto-generated TypeScript types from schema
2. **Migrations** - Version-controlled database changes
3. **Prisma Studio** - Built-in database GUI
4. **Query Builder** - Intuitive API, less prone to SQL injection
5. **Relations** - Easy to work with foreign keys and joins
6. **Multi-database** - Same code works with SQLite, PostgreSQL, MySQL
7. **Performance** - Optimized queries, connection pooling

For example, instead of writing raw SQL joins, I can do:
```javascript
const account = await db.account.findUnique({
  where: { id },
  include: { transactions: true, user: true }
});
```

This is type-safe and automatically generates optimized SQL."

---

### Authentication & Security

**Q6: How does authentication work in your app?**

**A:** "I use Clerk for authentication, which provides:
1. **Multiple auth methods** - Email/password, OAuth (Google, GitHub)
2. **Session management** - Secure JWT tokens
3. **User management** - Built-in user dashboard
4. **Webhooks** - Sync user data to our database

The flow:
1. User signs up via Clerk UI
2. Clerk creates user in their system
3. Middleware checks authentication on protected routes
4. Server actions use `await auth()` to get userId
5. We query our database using clerkUserId

```javascript
const { userId } = await auth(); // Clerk userId
const user = await db.user.findUnique({
  where: { clerkUserId: userId }
});
```

This separates authentication (Clerk) from authorization (our database)."

**Q7: Explain your security implementation with ArcJet.**

**A:** "ArcJet provides multiple security layers:

1. **Shield Protection** - Blocks common attacks (SQL injection, XSS, etc.)
2. **Bot Detection** - Allows legitimate bots (Google, Bing) but blocks malicious ones
3. **Rate Limiting** - Token bucket algorithm (10 requests per minute per user)

I implement it in two places:

**Middleware** (global protection):
```javascript
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [shield({ mode: "LIVE" }), detectBot({ mode: "LIVE" })]
});

export default createMiddleware(aj, clerk);
```

**Server Actions** (endpoint-specific rate limiting):
```javascript
const decision = await aj.protect(req, { userId, requested: 1 });
if (decision.isDenied()) {
  throw new Error("Too many requests");
}
```

This prevents abuse while allowing legitimate traffic."

---

### Background Jobs

**Q8: How do recurring transactions work?**

**A:** "Recurring transactions use Inngest for reliable execution:

1. **Creation**: User marks transaction as recurring (e.g., monthly rent)
   - `isRecurring = true`
   - `recurringInterval = "MONTHLY"`
   - `nextRecurringDate = 30 days from now`

2. **Scheduling**: Inngest cron job runs daily at midnight
   ```javascript
   { cron: "0 0 * * *" }
   ```

3. **Detection**: Finds transactions where `nextRecurringDate <= today`

4. **Processing**: For each transaction:
   - Create new transaction with same details
   - Update account balance
   - Calculate next occurrence date
   - Update `lastProcessed` timestamp

5. **Reliability**: Inngest provides:
   - Automatic retries (exponential backoff)
   - Throttling (10 per minute per user)
   - Execution history and logs
   - Visual debugging dashboard

This ensures rent, subscriptions, and bills are automatically processed without user intervention."

**Q9: Why Inngest over other job queues (Bull, BullMQ, etc.)?**

**A:** "Inngest offers several advantages:

1. **Serverless-first** - Works with Vercel, no Redis required
2. **Event-driven** - Trigger jobs via events, not just cron
3. **Built-in retries** - Exponential backoff out of the box
4. **Throttling** - Rate limiting per user/key
5. **Visual dashboard** - See all jobs, executions, logs
6. **Type-safe** - TypeScript support
7. **Step functions** - Break jobs into resumable steps
8. **No infrastructure** - No need to manage Redis or workers

For a finance app deployed on Vercel, Inngest is perfect because it's serverless and requires no additional infrastructure."

---

### AI Integration

**Q10: How does receipt scanning work?**

**A:** "I use Google Gemini 1.5 Flash for receipt scanning:

**Process:**
1. User uploads receipt image (JPEG/PNG)
2. Convert to base64 encoding
3. Send to Gemini with structured prompt
4. AI extracts: amount, date, merchant, category, description
5. Return JSON to auto-fill transaction form

**Why Gemini?**
- Multimodal (handles images + text)
- Fast response time (Flash model)
- Cost-effective
- Good accuracy for structured data
- Easy API integration

**Prompt Engineering:**
I use a structured prompt that specifies exact JSON format and allowed categories. This ensures consistent, parseable responses.

**Error Handling:**
If AI fails or returns invalid JSON, I provide fallback default values so the user can still manually enter data."

---

**Q11: Explain the monthly report generation with AI.**

**A:** "Monthly reports are generated on the 1st of each month via Inngest cron job:

**Process:**
1. Cron triggers at midnight on 1st
2. Fetch all users with accounts
3. For each user:
   - Calculate monthly stats (income, expenses, categories)
   - Send stats to Gemini AI
   - AI generates 3 actionable insights
   - Send email with stats + insights via Resend

**AI Insights Example:**
- 'Your food expenses increased 25%. Consider meal planning.'
- 'You saved $500 this month. Great job!'
- 'Housing is 40% of income, within recommended range.'

**Why AI insights?**
- Personalized advice based on actual spending
- Identifies trends users might miss
- Actionable recommendations
- Increases user engagement"

---

### Performance & Optimization

**Q12: How do you optimize performance?**

**A:** "Several optimization strategies:

1. **Server Components** - Most components are server-rendered, reducing client JS
2. **Turbopack** - Faster builds than Webpack
3. **Database Indexing** - Indexes on userId, accountId for fast queries
4. **Prisma Connection Pooling** - Reuse database connections
5. **Next.js Caching** - Automatic caching of server components
6. **revalidatePath()** - Invalidate cache only when data changes
7. **Lazy Loading** - Components load on demand
8. **Image Optimization** - Next.js Image component
9. **Code Splitting** - Automatic route-based splitting

**Example - Revalidation:**
```javascript
export async function createTransaction(data) {
  // ... create transaction
  revalidatePath("/dashboard"); // Only invalidate dashboard
  revalidatePath(`/account/${accountId}`); // Only invalidate this account
}
```

This ensures users see fresh data without full page reloads."

---

**Q13: How do you handle large transaction lists?**

**A:** "I implement pagination and filtering:

1. **Pagination** - Fetch 20 transactions at a time
2. **Filtering** - By date range, category, type (income/expense)
3. **Sorting** - Default: newest first
4. **Search** - By description or merchant
5. **Lazy Loading** - Load more on scroll

**Prisma Query:**
```javascript
const transactions = await db.transaction.findMany({
  where: { userId, date: { gte: startDate, lte: endDate } },
  orderBy: { date: "desc" },
  take: 20,
  skip: page * 20
});
```

For account pages, I show all transactions since users typically have fewer per account."

---

### Email System

**Q14: How does the email system work?**

**A:** "I use Resend for transactional emails with React Email for templates:

**Setup:**
1. **Resend** - Email delivery service (better than SendGrid for developers)
2. **React Email** - Write email templates in React JSX
3. **Templates** - Reusable components for different email types

**Code:**
```javascript
import { Resend } from 'resend';
import EmailTemplate from '@/emails/template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, react }) {
  await resend.emails.send({
    from: 'Finance App <noreply@yourapp.com>',
    to,
    subject,
    react
  });
}
```

**Email Types:**
1. Budget alerts (80% threshold)
2. Monthly reports with AI insights

**Why Resend?**
- Developer-friendly API
- React Email integration
- Good deliverability
- Affordable pricing
- Easy testing in development"

---

### State Management & Forms

**Q15: How do you handle form state and validation?**

**A:** "I use React Hook Form with Zod for type-safe validation:

**Setup:**
```javascript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const transactionSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().min(1),
  date: z.date(),
  description: z.string().optional()
});

const form = useForm({
  resolver: zodResolver(transactionSchema),
  defaultValues: { type: "EXPENSE" }
});
```

**Benefits:**
1. **Type Safety** - Zod schema generates TypeScript types
2. **Validation** - Client-side validation before submission
3. **Error Handling** - Automatic error messages
4. **Performance** - Only re-renders changed fields
5. **DX** - Clean API, easy to use

**Why not useState?**
- React Hook Form handles complex forms better
- Built-in validation
- Better performance (fewer re-renders)
- Less boilerplate code"

---

### Deployment & DevOps

**Q16: How would you deploy this application?**

**A:** "Deployment strategy:

**Frontend & API:**
- **Vercel** - Optimal for Next.js (same company)
- Automatic deployments from Git
- Edge functions for API routes
- Global CDN for static assets

**Database:**
- **Supabase** - Managed PostgreSQL
- Connection pooling via Prisma
- Automatic backups
- Real-time capabilities (future feature)

**Background Jobs:**
- **Inngest Cloud** - Managed job execution
- No infrastructure to manage
- Automatic scaling

**Environment Variables:**
- Stored in Vercel dashboard
- Separate for preview/production
- Encrypted at rest

**CI/CD Pipeline:**
```
Git Push → Vercel Build → Run Tests → Deploy → Prisma Migrate
```

**Monitoring:**
- Vercel Analytics for performance
- Sentry for error tracking
- Inngest dashboard for job monitoring"

---

### Testing & Quality

**Q17: How would you test this application?**

**A:** "Testing strategy:

**Unit Tests:**
- Test utility functions (date calculations, formatters)
- Test Zod schemas
- Test helper functions

**Integration Tests:**
- Test server actions with mock database
- Test API routes
- Test Inngest functions

**E2E Tests:**
- Test user flows (sign up, create transaction, view dashboard)
- Use Playwright or Cypress

**Example Test:**
```javascript
describe('createTransaction', () => {
  it('should create transaction and update balance', async () => {
    const result = await createTransaction({
      type: 'EXPENSE',
      amount: 100,
      accountId: 'test-account'
    });
    
    expect(result.success).toBe(true);
    expect(account.balance).toBe(900); // Was 1000
  });
});
```

**Why I haven't implemented tests yet:**
- MVP phase, focusing on features
- Would add Jest + React Testing Library
- Would mock Prisma with jest-mock-extended
- Would test critical paths first (transactions, balance updates)"

---

### Scalability

**Q18: How would you scale this application?**

**A:** "Scaling strategies:

**Database:**
1. Switch to PostgreSQL (already configured)
2. Add read replicas for queries
3. Implement database sharding by userId
4. Add Redis for caching frequent queries

**API:**
1. Implement API caching with Redis
2. Use Vercel Edge Functions for global distribution
3. Add CDN for static assets
4. Implement GraphQL for efficient data fetching

**Background Jobs:**
1. Inngest automatically scales
2. Add more workers for parallel processing
3. Implement job prioritization

**Frontend:**
1. Implement virtual scrolling for large lists
2. Add service workers for offline support
3. Lazy load routes and components
4. Optimize images with WebP format

**Monitoring:**
1. Add APM (Application Performance Monitoring)
2. Set up alerts for slow queries
3. Monitor job execution times
4. Track user metrics"

---

### Challenges & Solutions

**Q19: What was the biggest challenge in building this?**

**A:** "The biggest challenge was ensuring data consistency with concurrent operations:

**Problem:**
- Multiple recurring transactions processing simultaneously
- Race conditions when updating account balances
- Duplicate transaction creation

**Solution:**
1. **Database Transactions** - Use Prisma's `$transaction` for atomicity
2. **Inngest Throttling** - Limit 10 transactions per minute per user
3. **Idempotency Keys** - Prevent duplicate processing
4. **Optimistic Locking** - Check `lastProcessed` timestamp

**Code:**
```javascript
await db.$transaction(async (tx) => {
  // Check if already processed
  const transaction = await tx.transaction.findUnique({
    where: { id, lastProcessed: null }
  });
  
  if (!transaction) return; // Already processed
  
  // Create new transaction
  await tx.transaction.create({ data });
  
  // Update balance
  await tx.account.update({
    where: { id: accountId },
    data: { balance: { increment: amount } }
  });
  
  // Mark as processed
  await tx.transaction.update({
    where: { id },
    data: { lastProcessed: new Date() }
  });
});
```

This ensures no duplicate transactions and consistent balances."

---

**Q20: How do you handle errors and edge cases?**

**A:** "Error handling strategy:

**1. Try-Catch Blocks:**
```javascript
export async function createTransaction(data) {
  try {
    // ... logic
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
}
```

**2. Zod Validation:**
- Validate input before processing
- Return user-friendly error messages

**3. Database Constraints:**
- Unique constraints on email, clerkUserId
- Foreign key constraints
- Not null constraints

**4. Inngest Retries:**
- Automatic retries with exponential backoff
- Max 2 attempts to prevent infinite loops

**5. User Feedback:**
- Toast notifications for success/error
- Form validation errors
- Loading states

**Edge Cases:**
- Negative balances (allow for credit cards)
- Deleted accounts (cascade delete transactions)
- Invalid dates (Zod validation)
- Missing AI API keys (fallback to manual entry)
- Rate limit exceeded (clear error message)"

---

### Future Improvements

**Q21: What features would you add next?**

**A:** "Planned features:

**1. Data Visualization:**
- Interactive charts (spending trends, category breakdown)
- Year-over-year comparisons
- Budget vs actual spending graphs

**2. Multi-Currency Support:**
- Support multiple currencies
- Automatic exchange rate conversion
- Currency-specific formatting

**3. Shared Accounts:**
- Family/household accounts
- Permission management
- Split transactions

**4. Investment Tracking:**
- Stock portfolio integration
- Crypto wallet tracking
- Net worth calculation

**5. Bill Reminders:**
- Upcoming bill notifications
- Payment history
- Auto-pay integration

**6. Export/Import:**
- CSV export for tax purposes
- Import from bank statements
- PDF report generation

**7. Mobile App:**
- React Native app
- Push notifications
- Offline support

**8. Advanced AI:**
- Spending predictions
- Anomaly detection (unusual transactions)
- Personalized savings goals"

---

## 🔧 Development Setup

### Prerequisites
```bash
Node.js 18+
npm or yarn
Git
```

### Installation
```bash
# Clone repository
git clone <repo-url>
cd ai-finance-platform

# Install dependencies
npm install --legacy-peer-deps

# Setup environment variables
cp .env.example .env
# Add your API keys

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Run development server
npm run dev

# Run Inngest dev server (separate terminal)
inngest-cli dev

# Open Prisma Studio (separate terminal)
npx prisma studio
```

### Environment Variables
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database
DATABASE_URL="file:./dev.db"  # SQLite for dev
# DATABASE_URL=""  # PostgreSQL for production
# DIRECT_URL=""

# AI
GEMINI_API_KEY=

# Email
RESEND_API_KEY=

# Security
ARCJET_KEY=
```

---

## 📚 Key Learnings

### Technical Skills Gained
1. **Next.js 15 App Router** - Server components, server actions, streaming
2. **Prisma ORM** - Schema design, migrations, transactions
3. **Clerk Authentication** - OAuth, session management, webhooks
4. **Inngest** - Background jobs, cron scheduling, event-driven architecture
5. **Google Gemini AI** - Multimodal AI, prompt engineering, structured outputs
6. **ArcJet Security** - Rate limiting, bot detection, shield protection
7. **React Hook Form + Zod** - Type-safe form validation
8. **Tailwind CSS** - Utility-first styling, responsive design
9. **TypeScript** - Type safety, better DX

### Best Practices Implemented
1. **Atomic Transactions** - Ensure data consistency
2. **Server-Side Validation** - Never trust client input
3. **Rate Limiting** - Prevent abuse
4. **Error Handling** - Graceful failures with user feedback
5. **Code Organization** - Separation of concerns (actions, components, lib)
6. **Type Safety** - TypeScript + Zod + Prisma
7. **Caching Strategy** - Revalidate only when needed
8. **Security First** - Authentication, authorization, input validation

---

## 🎓 Study Guide

### For Interviews - What to Emphasize

**1. Full-Stack Capabilities:**
- "I built a complete full-stack application from scratch"
- "Handled both frontend (React) and backend (API routes, database)"

**2. Modern Tech Stack:**
- "Used cutting-edge technologies: Next.js 15, React 19, Prisma"
- "Implemented AI features with Google Gemini"

**3. Real-World Features:**
- "Automated recurring transactions with background jobs"
- "Implemented rate limiting and security best practices"
- "AI-powered receipt scanning and financial insights"

**4. Problem-Solving:**
- "Solved data consistency issues with database transactions"
- "Implemented reliable job execution with retry logic"
- "Handled edge cases and error scenarios"

**5. Scalability Awareness:**
- "Designed with scalability in mind (database indexing, caching)"
- "Used serverless architecture for easy scaling"

### Quick Facts to Remember
- **Tech Stack:** Next.js 15, React 19, Prisma, Clerk, Inngest, Gemini AI
- **Database:** 4 models (User, Account, Transaction, Budget)
- **Background Jobs:** 4 Inngest functions (recurring, reports, alerts)
- **Security:** ArcJet (shield, bot detection, rate limiting)
- **AI Features:** Receipt scanning, financial insights
- **Lines of Code:** ~3000+ lines
- **Development Time:** [Your timeline]

---

## 📖 Additional Resources

### Documentation Links
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Inngest Docs](https://www.inngest.com/docs)
- [Google Gemini API](https://ai.google.dev/docs)
- [ArcJet Docs](https://docs.arcjet.com)
- [Shadcn UI](https://ui.shadcn.com)

### Useful Commands
```bash
# Development
npm run dev                    # Start dev server
inngest-cli dev               # Start Inngest dev server
npx prisma studio             # Open database GUI

# Database
npx prisma generate           # Generate Prisma client
npx prisma db push            # Push schema changes
npx prisma migrate dev        # Create migration

# Production
npm run build                 # Build for production
npm start                     # Start production server

# Debugging
npm run lint                  # Run ESLint
```

---

## 🎯 Summary

This AI Finance Platform demonstrates:
- ✅ Full-stack development with modern technologies
- ✅ Database design and ORM usage
- ✅ Authentication and security implementation
- ✅ Background job orchestration
- ✅ AI integration for practical use cases
- ✅ Email notifications and user engagement
- ✅ Error handling and data consistency
- ✅ Performance optimization
- ✅ Clean code architecture

**Perfect for showcasing in interviews as it covers:**
- Frontend (React, Tailwind, Forms)
- Backend (API routes, Server Actions)
- Database (Prisma, SQL, Transactions)
- DevOps (Deployment, Background Jobs)
- AI/ML (Gemini integration)
- Security (Authentication, Rate Limiting)

---

**Made with 💗 by Jay Kumar**

*Last Updated: [Current Date]*
