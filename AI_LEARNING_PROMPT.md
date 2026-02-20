# 🤖 AI Learning Prompt - Complete AI Finance Platform Guide

## Instructions for AI
When a user pastes this prompt, you should act as an expert technical instructor and interview coach. Provide comprehensive explanations about this AI Finance Platform project, covering architecture, code, technologies, and interview preparation. Answer questions in depth with code examples, explain concepts clearly, and help the user understand every aspect of the project.

---

# 📋 PROJECT OVERVIEW

## What is this project?
An AI-powered personal finance management platform built with Next.js 15 that helps users:
- Track income and expenses across multiple accounts
- Automate recurring transactions (rent, subscriptions, bills)
- Scan receipts using AI to extract transaction data
- Set budgets with automated email alerts
- Receive monthly financial reports with AI-generated insights
- Manage multiple accounts (checking, savings, credit cards)

## Live Application URLs
- **Frontend & API**: http://localhost:3000
- **Inngest Dashboard**: http://localhost:8288 (Background jobs)
- **Prisma Studio**: http://localhost:5555 (Database GUI)

---

# 🛠️ COMPLETE TECH STACK

## Frontend Technologies
```
Next.js 15.0.5          - React framework with App Router
React 19 RC             - UI library (release candidate)
Tailwind CSS 3.4.1      - Utility-first CSS framework
Shadcn UI               - Component library (built on Radix UI)
React Hook Form 7.53.2  - Form state management
Zod 3.23.8              - Schema validation
Recharts 2.14.1         - Data visualization charts
Lucide React 0.462.0    - Icon library
date-fns 4.1.0          - Date manipulation
Sonner 1.7.0            - Toast notifications
Vaul 1.1.1              - Drawer component
```

## Backend Technologies
```
Next.js API Routes      - RESTful endpoints
Next.js Server Actions  - Server-side mutations
Prisma ORM 6.0.1        - Database toolkit
SQLite                  - Development database
PostgreSQL (Supabase)   - Production database
Clerk 6.6.0             - Authentication & user management
Inngest 3.27.4          - Background job orchestration
Google Gemini AI 0.21.0 - AI for receipt scanning & insights
Resend 4.0.1            - Transactional email service
ArcJet 1.0.0-alpha.34   - Security, rate limiting, bot detection
```

## Development Tools
```
Turbopack               - Fast bundler (Next.js 15 default)
Prisma Studio           - Visual database editor
ESLint                  - Code linting
PostCSS                 - CSS processing
React Email 3.0.3       - Email template development
```

---

# 🏗️ PROJECT ARCHITECTURE

## Folder Structure
```
ai-finance-platform/
│
├── app/                              # Next.js App Router
│   ├── (auth)/                       # Auth route group
│   │   ├── sign-in/[[...sign-in]]/   # Clerk sign-in
│   │   └── sign-up/[[...sign-up]]/   # Clerk sign-up
│   │
│   ├── (main)/                       # Protected routes
│   │   ├── dashboard/                # Main dashboard
│   │   │   ├── page.jsx              # Dashboard page
│   │   │   ├── layout.js             # Dashboard layout
│   │   │   └── _components/          # Dashboard components
│   │   │       ├── account-card.jsx
│   │   │       ├── budget-progress.jsx
│   │   │       └── transaction-overview.jsx
│   │   │
│   │   ├── account/[id]/             # Dynamic account pages
│   │   │   ├── page.jsx              # Account detail page
│   │   │   └── _components/          # Account components
│   │   │       ├── account-chart.jsx
│   │   │       └── transaction-table.jsx
│   │   │
│   │   ├── transaction/              # Transaction management
│   │   │   ├── create/page.jsx       # Create transaction
│   │   │   └── _components/
│   │   │       ├── transaction-form.jsx
│   │   │       └── receipt-scanner.jsx
│   │   │
│   │   └── layout.js                 # Main layout wrapper
│   │
│   ├── api/                          # API Routes
│   │   ├── inngest/route.js          # Inngest webhook endpoint
│   │   └── seed/route.js             # Database seeding
│   │
│   ├── lib/                          # App-level utilities
│   │   └── schema.js                 # Zod validation schemas
│   │
│   ├── layout.js                     # Root layout
│   ├── page.js                       # Landing page
│   ├── globals.css                   # Global styles
│   └── not-found.jsx                 # 404 page
│
├── actions/                          # Server Actions
│   ├── account.js                    # Account CRUD operations
│   ├── transaction.js                # Transaction operations
│   ├── dashboard.js                  # Dashboard data fetching
│   ├── budget.js                     # Budget management
│   ├── seed.js                       # Database seeding logic
│   └── send-email.js                 # Email sending utility
│
├── components/                       # Reusable components
│   ├── header.jsx                    # App header
│   ├── hero.jsx                      # Landing page hero
│   ├── create-account-drawer.jsx     # Account creation drawer
│   └── ui/                           # Shadcn UI components
│       ├── button.jsx
│       ├── card.jsx
│       ├── input.jsx
│       ├── select.jsx
│       ├── table.jsx
│       └── ... (15+ UI components)
│
├── lib/                              # Core utilities
│   ├── prisma.js                     # Prisma client singleton
│   ├── arcjet.js                     # ArcJet security config
│   ├── checkUser.js                  # User verification utility
│   ├── utils.js                      # Helper functions
│   └── inngest/                      # Background jobs
│       ├── client.js                 # Inngest client config
│       └── function.js               # Job definitions
│
├── prisma/                           # Database
│   ├── schema.prisma                 # Database schema
│   ├── dev.db                        # SQLite database file
│   └── migrations/                   # Migration history
│
├── emails/                           # Email templates
│   └── template.jsx                  # React Email template
│
├── data/                             # Static data
│   ├── categories.js                 # Transaction categories
│   └── landing.js                    # Landing page content
│
├── hooks/                            # Custom React hooks
│   └── use-fetch.js                  # Data fetching hook
│
├── public/                           # Static assets
│   ├── logo.png
│   ├── logo-sm.png
│   └── banner.jpeg
│
├── middleware.js                     # Request middleware
├── .env                              # Environment variables
├── package.json                      # Dependencies
├── tailwind.config.js                # Tailwind configuration
├── next.config.mjs                   # Next.js configuration
└── jsconfig.json                     # JavaScript configuration
```

## Request Flow Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                        User Request                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Middleware Layer                         │
│  ┌──────────────────┐         ┌──────────────────────┐     │
│  │  ArcJet Security │  ──────▶│  Clerk Authentication│     │
│  │  - Shield        │         │  - Session Check     │     │
│  │  - Bot Detection │         │  - Route Protection  │     │
│  │  - Rate Limiting │         └──────────────────────┘     │
│  └──────────────────┘                                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js App Router                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Server Components (RSC) - Default rendering         │  │
│  │  Client Components - Interactive UI                  │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Server Actions                           │
│  (actions/*.js - Server-side mutations)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  1. Authenticate user (Clerk)                        │  │
│  │  2. Validate input (Zod)                             │  │
│  │  3. Check rate limits (ArcJet)                       │  │
│  │  4. Execute business logic                           │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      Prisma ORM                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  - Type-safe queries                                 │  │
│  │  - Connection pooling                                │  │
│  │  - Transaction support                               │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                       Database                              │
│  SQLite (Development) / PostgreSQL (Production)             │
└─────────────────────────────────────────────────────────────┘
```

## Background Jobs Flow
```
┌─────────────────────────────────────────────────────────────┐
│                    Inngest Triggers                         │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │  Cron Schedules  │  │  Event-Driven    │               │
│  │  - Daily         │  │  - User Actions  │               │
│  │  - Every 6 hours │  │  - System Events │               │
│  │  - Monthly       │  │                  │               │
│  └────────┬─────────┘  └────────┬─────────┘               │
└───────────┼──────────────────────┼──────────────────────────┘
            │                      │
            ▼                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Inngest Functions                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  1. Process Recurring Transaction                    │  │
│  │  2. Trigger Recurring Transactions                   │  │
│  │  3. Generate Monthly Reports                         │  │
│  │  4. Check Budget Alerts                              │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              External Services                              │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │  Google Gemini   │  │  Resend Email    │               │
│  │  - AI Insights   │  │  - Notifications │               │
│  └──────────────────┘  └──────────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

---

# 🗄️ DATABASE SCHEMA (DEEP DIVE)

## Complete Prisma Schema
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "sqlite"              // Development
  // provider = "postgresql"        // Production
  url       = "file:./dev.db"      // SQLite path
  // url = env("DATABASE_URL")     // PostgreSQL connection
  // directUrl = env("DIRECT_URL") // Direct connection for migrations
}

// User Model - Synced with Clerk authentication
model User {
  id            String          @id @default(uuid())
  clerkUserId   String          @unique    // Foreign key to Clerk
  email         String          @unique
  name          String?
  imageUrl      String?
  transactions  Transaction[]               // One-to-many
  accounts      Account[]                   // One-to-many
  budgets       Budget[]                    // One-to-many
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt

  @@map("users")                           // Table name in database
}

// Account Model - Users can have multiple accounts
model Account {
  id           String        @id @default(uuid())
  name         String                      // e.g., "Chase Checking"
  type         String        @default("CURRENT")  // CURRENT, SAVINGS, CREDIT
  balance      Decimal       @default(0)   // Current balance
  isDefault    Boolean       @default(false) // Default account for user
  userId       String
  user         User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  transactions Transaction[]               // One-to-many
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt

  @@index([userId])                        // Index for faster queries
  @@map("accounts")
}

// Transaction Model - All financial transactions
model Transaction {
  id                String      @id @default(uuid())
  type              String                  // INCOME or EXPENSE
  amount            Decimal                 // Transaction amount
  description       String?                 // Optional description
  date              DateTime                // Transaction date
  category          String                  // Category (food, rent, etc.)
  receiptUrl        String?                 // Optional receipt image URL
  isRecurring       Boolean     @default(false)
  recurringInterval String?                 // DAILY, WEEKLY, MONTHLY, YEARLY
  nextRecurringDate DateTime?               // When to process next
  lastProcessed     DateTime?               // Last processing timestamp
  status            String      @default("COMPLETED")
  userId            String
  user              User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  accountId         String
  account           Account     @relation(fields: [accountId], references: [id], onDelete: Cascade)
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt

  @@index([userId])
  @@index([accountId])
  @@map("transactions")
}

// Budget Model - Monthly budget tracking
model Budget {
  id            String      @id @default(uuid())
  amount        Decimal                     // Monthly budget limit
  lastAlertSent DateTime?                   // Last alert timestamp
  userId        String      @unique         // One budget per user
  user          User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  @@index([userId])
  @@map("budgets")
}
```

## Database Relationships Explained

### User → Accounts (One-to-Many)
```javascript
// One user can have multiple accounts
const user = await db.user.findUnique({
  where: { id: userId },
  include: { accounts: true }  // Returns array of accounts
});

// Result:
{
  id: "user-123",
  email: "user@example.com",
  accounts: [
    { id: "acc-1", name: "Chase Checking", balance: 5000 },
    { id: "acc-2", name: "Savings", balance: 10000 },
    { id: "acc-3", name: "Credit Card", balance: -500 }
  ]
}
```

### Account → Transactions (One-to-Many)
```javascript
// One account can have multiple transactions
const account = await db.account.findUnique({
  where: { id: accountId },
  include: { transactions: true }
});

// Result:
{
  id: "acc-1",
  name: "Chase Checking",
  balance: 5000,
  transactions: [
    { id: "tx-1", type: "EXPENSE", amount: 50, category: "food" },
    { id: "tx-2", type: "INCOME", amount: 3000, category: "salary" }
  ]
}
```

### User → Budget (One-to-One)
```javascript
// One user has one budget
const user = await db.user.findUnique({
  where: { id: userId },
  include: { budgets: true }
});

// Result:
{
  id: "user-123",
  email: "user@example.com",
  budgets: [
    { id: "budget-1", amount: 2000, lastAlertSent: null }
  ]
}
```

## Cascade Delete Behavior
```javascript
// When a user is deleted:
await db.user.delete({ where: { id: userId } });

// Automatically deletes:
// - All user's accounts
// - All user's transactions
// - User's budget
// This is defined by: onDelete: Cascade
```

---

# 🔐 AUTHENTICATION & SECURITY (DEEP DIVE)

## Clerk Authentication Flow

### Sign Up Process
```
1. User visits /sign-up
2. Clerk UI renders (hosted by Clerk)
3. User enters email/password or uses OAuth (Google, GitHub)
4. Clerk creates user in their system
5. Clerk redirects to /dashboard
6. Middleware checks authentication
7. Server action creates User record in our database
```

### Authentication Check in Server Actions
```javascript
// actions/transaction.js
export async function createTransaction(data) {
  // Step 1: Get Clerk userId from session
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  
  // Step 2: Find user in our database using clerkUserId
  const user = await db.user.findUnique({
    where: { clerkUserId: userId }
  });
  
  if (!user) throw new Error("User not found");
  
  // Step 3: Proceed with authenticated user
  // ... rest of logic
}
```

### Middleware Protection
```javascript
// middleware.js
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",      // Dashboard and all sub-routes
  "/account(.*)",        // Account pages
  "/transaction(.*)",    // Transaction pages
]);

const clerk = clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  
  // If user not authenticated and trying to access protected route
  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();  // Redirect to sign-in page
  }
  
  return NextResponse.next();  // Allow request to proceed
});
```

## ArcJet Security Implementation

### Security Configuration
```javascript
// lib/arcjet.js
import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // 1. Shield Protection - Blocks common attacks
    shield({
      mode: "LIVE",  // LIVE blocks, DRY_RUN logs only
    }),
    
    // 2. Bot Detection - Allow good bots, block bad ones
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",  // Google, Bing, etc.
        "GO_HTTP",                 // For Inngest webhooks
      ],
    }),
    
    // 3. Rate Limiting - Token bucket algorithm
    tokenBucket({
      mode: "LIVE",
      refillRate: 10,      // 10 tokens per interval
      interval: "1m",      // 1 minute
      capacity: 20,        // Max 20 tokens in bucket
    }),
  ],
});

export default aj;
```

### Middleware Chain (ArcJet + Clerk)
```javascript
// middleware.js
import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [shield({ mode: "LIVE" }), detectBot({ mode: "LIVE" })],
});

const clerk = clerkMiddleware(async (auth, req) => {
  // ... authentication logic
});

// Chain middlewares - ArcJet runs FIRST, then Clerk
export default createMiddleware(aj, clerk);

// This means:
// 1. Request hits ArcJet (security check)
// 2. If allowed, request hits Clerk (authentication)
// 3. If authenticated, request proceeds to route
```

### Rate Limiting in Server Actions
```javascript
// actions/transaction.js
import aj from "@/lib/arcjet";
import { request } from "@arcjet/next";

export async function createTransaction(data) {
  const { userId } = await auth();
  
  // Get request object for ArcJet
  const req = await request();
  
  // Check rate limit
  const decision = await aj.protect(req, {
    userId,           // Track per user
    requested: 1,     // Consume 1 token
  });
  
  // Handle denial
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      const { remaining, reset } = decision.reason;
      console.error({
        code: "RATE_LIMIT_EXCEEDED",
        details: { remaining, resetInSeconds: reset },
      });
      throw new Error("Too many requests. Please try again later.");
    }
    throw new Error("Request blocked");
  }
  
  // Proceed with transaction creation
  // ...
}
```

### How Rate Limiting Works (Token Bucket Algorithm)
```
Initial State:
Bucket Capacity: 20 tokens
Refill Rate: 10 tokens per minute

User makes request:
- Consumes 1 token
- Bucket: 19 tokens remaining

After 1 minute:
- Bucket refills by 10 tokens
- Bucket: 20 tokens (capped at capacity)

If user makes 20 requests in 10 seconds:
- All tokens consumed
- Next request is DENIED
- Must wait for refill
```

---

# 💾 PRISMA ORM (DEEP DIVE)

## Prisma Client Setup
```javascript
// lib/prisma.js
import { PrismaClient } from "@prisma/client";

// Singleton pattern to prevent multiple instances
const globalForPrisma = global;

export const db = globalForPrisma.prisma || new PrismaClient({
  log: ["query", "error", "warn"],  // Enable logging
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// Usage in server actions:
import { db } from "@/lib/prisma";
const users = await db.user.findMany();
```

## CRUD Operations Examples

### Create
```javascript
// Create a new account
const account = await db.account.create({
  data: {
    name: "Chase Checking",
    type: "CURRENT",
    balance: 1000,
    userId: user.id,
    isDefault: true,
  },
});
```

### Read (Query)
```javascript
// Find unique user
const user = await db.user.findUnique({
  where: { clerkUserId: userId },
});

// Find many with filters
const transactions = await db.transaction.findMany({
  where: {
    userId: user.id,
    type: "EXPENSE",
    date: {
      gte: new Date("2024-01-01"),  // Greater than or equal
      lte: new Date("2024-12-31"),  // Less than or equal
    },
  },
  orderBy: { date: "desc" },
  take: 20,  // Limit to 20 results
  skip: 0,   // Offset for pagination
  include: {
    account: true,  // Include related account data
  },
});

// Aggregate queries
const totalExpenses = await db.transaction.aggregate({
  where: {
    userId: user.id,
    type: "EXPENSE",
  },
  _sum: {
    amount: true,  // Sum of all amounts
  },
  _count: true,    // Count of transactions
});
```

### Update
```javascript
// Update single record
const account = await db.account.update({
  where: { id: accountId },
  data: {
    balance: 5000,
    name: "Updated Name",
  },
});

// Update many records
await db.account.updateMany({
  where: {
    userId: user.id,
    isDefault: true,
  },
  data: {
    isDefault: false,  // Unset all default accounts
  },
});

// Increment/Decrement
await db.account.update({
  where: { id: accountId },
  data: {
    balance: {
      increment: 100,  // Add 100 to current balance
      // decrement: 50  // Subtract 50 from current balance
    },
  },
});
```

### Delete
```javascript
// Delete single record
await db.transaction.delete({
  where: { id: transactionId },
});

// Delete many records
await db.transaction.deleteMany({
  where: {
    id: { in: transactionIds },  // Delete multiple by IDs
    userId: user.id,
  },
});
```

## Database Transactions (ACID Properties)

### Why Use Transactions?
When creating a financial transaction, two things must happen:
1. Create transaction record
2. Update account balance

If either fails, both should rollback to maintain data consistency.

### Transaction Implementation
```javascript
// actions/transaction.js
export async function createTransaction(data) {
  const { userId } = await auth();
  const user = await db.user.findUnique({ where: { clerkUserId: userId } });
  
  // Calculate balance change
  const balanceChange = data.type === "EXPENSE" ? -data.amount : data.amount;
  
  // Wrap in Prisma transaction
  const transaction = await db.$transaction(async (tx) => {
    // Step 1: Create transaction record
    const newTransaction = await tx.transaction.create({
      data: {
        ...data,
        userId: user.id,
        nextRecurringDate: data.isRecurring 
          ? calculateNextRecurringDate(data.date, data.recurringInterval)
          : null,
      },
    });
    
    // Step 2: Update account balance
    await tx.account.update({
      where: { id: data.accountId },
      data: {
        balance: {
          increment: balanceChange,
        },
      },
    });
    
    // If we reach here, both operations succeeded
    return newTransaction;
  });
  
  // Revalidate cache to show updated data
  revalidatePath("/dashboard");
  revalidatePath(`/account/${transaction.accountId}`);
  
  return { success: true, data: serializeAmount(transaction) };
}

// If ANY operation inside $transaction fails:
// - All changes are rolled back
// - Database remains in consistent state
// - Error is thrown to caller
```

### Complex Transaction Example (Bulk Delete)
```javascript
// actions/account.js
export async function bulkDeleteTransactions(transactionIds) {
  const { userId } = await auth();
  const user = await db.user.findUnique({ where: { clerkUserId: userId } });
  
  // Get transactions to calculate balance changes
  const transactions = await db.transaction.findMany({
    where: {
      id: { in: transactionIds },
      userId: user.id,
    },
  });
  
  // Group by account to calculate balance adjustments
  const accountBalanceChanges = transactions.reduce((acc, transaction) => {
    const change = transaction.type === "EXPENSE"
      ? transaction.amount      // Add back expense
      : -transaction.amount;    // Remove income
    acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
    return acc;
  }, {});
  
  // Execute all operations atomically
  await db.$transaction(async (tx) => {
    // Delete all transactions
    await tx.transaction.deleteMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });
    
    // Update all affected account balances
    for (const [accountId, balanceChange] of Object.entries(accountBalanceChanges)) {
      await tx.account.update({
        where: { id: accountId },
        data: {
          balance: {
            increment: balanceChange,
          },
        },
      });
    }
  });
  
  revalidatePath("/dashboard");
  return { success: true };
}
```

---

# ⚙️ BACKGROUND JOBS WITH INNGEST (DEEP DIVE)

## Inngest Client Configuration
```javascript
// lib/inngest/client.js
import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "finance-platform",        // Unique app identifier
  name: "Finance Platform",      // Display name
  retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000,  // Exponential backoff
    maxAttempts: 2,                      // Max retry attempts
  }),
});

// Retry delays:
// Attempt 1: 2^1 * 1000 = 2 seconds
// Attempt 2: 2^2 * 1000 = 4 seconds
```

## Job 1: Process Recurring Transaction

### Purpose
Processes a single recurring transaction when triggered by an event.

### Code
```javascript
// lib/inngest/function.js
export const processRecurringTransaction = inngest.createFunction(
  {
    id: "process-recurring-transaction",
    name: "Process Recurring Transaction",
    throttle: {
      limit: 10,                    // Max 10 executions
      period: "1m",                 // Per minute
      key: "event.data.userId",     // Per user (not global)
    },
  },
  { event: "transaction.recurring.process" },  // Triggered by this event
  async ({ event, step }) => {
    // Validate event data
    if (!event?.data?.transactionId || !event?.data?.userId) {
      console.error("Invalid event data:", event);
      return { error: "Missing required event data" };
    }
    
    await step.run("process-transaction", async () => {
      // Find the recurring transaction
      const transaction = await db.transaction.findUnique({
        where: {
          id: event.data.transactionId,
          userId: event.data.userId,
        },
        include: { account: true },
      });
      
      // Check if transaction is due
      if (!transaction || !isTransactionDue(transaction)) {
        return;
      }
      
      // Execute in database transaction
      await db.$transaction(async (tx) => {
        // 1. Create new transaction
        await tx.transaction.create({
          data: {
            type: transaction.type,
            amount: transaction.amount,
            description: `${transaction.description} (Recurring)`,
            date: new Date(),
            category: transaction.category,
            userId: transaction.userId,
            accountId: transaction.accountId,
            isRecurring: false,  // New transaction is not recurring
          },
        });
        
        // 2. Update account balance
        const balanceChange = transaction.type === "EXPENSE"
          ? -transaction.amount.toNumber()
          : transaction.amount.toNumber();
        
        await tx.account.update({
          where: { id: transaction.accountId },
          data: { balance: { increment: balanceChange } },
        });
        
        // 3. Update original recurring transaction
        await tx.transaction.update({
          where: { id: transaction.id },
          data: {
            lastProcessed: new Date(),
            nextRecurringDate: calculateNextRecurringDate(
              new Date(),
              transaction.recurringInterval
            ),
          },
        });
      });
    });
  }
);

// Helper function
function isTransactionDue(transaction) {
  if (!transaction.lastProcessed) return true;
  const today = new Date();
  const nextDue = new Date(transaction.nextRecurringDate);
  return nextDue <= today;
}

function calculateNextRecurringDate(date, interval) {
  const next = new Date(date);
  switch (interval) {
    case "DAILY":
      next.setDate(next.getDate() + 1);
      break;
    case "WEEKLY":
      next.setDate(next.getDate() + 7);
      break;
    case "MONTHLY":
      next.setMonth(next.getMonth() + 1);
      break;
    case "YEARLY":
      next.setFullYear(next.getFullYear() + 1);
      break;
  }
  return next;
}
```

## Job 2: Trigger Recurring Transactions

### Purpose
Runs daily at midnight to find all due recurring transactions and trigger processing.

### Code
```javascript
export const triggerRecurringTransactions = inngest.createFunction(
  {
    id: "trigger-recurring-transactions",
    name: "Trigger Recurring Transactions",
  },
  { cron: "0 0 * * *" },  // Cron: minute hour day month dayOfWeek
  async ({ step }) => {
    // Fetch all due recurring transactions
    const recurringTransactions = await step.run(
      "fetch-recurring-transactions",
      async () => {
        return await db.transaction.findMany({
          where: {
            isRecurring: true,
            status: "COMPLETED",
            OR: [
              { lastProcessed: null },  // Never processed
              {
                nextRecurringDate: {
                  lte: new Date(),      // Due date is today or earlier
                },
              },
            ],
          },
        });
      }
    );
    
    // Send events for each transaction
    if (recurringTransactions.length > 0) {
      const events = recurringTransactions.map((transaction) => ({
        name: "transaction.recurring.process",
        data: {
          transactionId: transaction.id,
          userId: transaction.userId,
        },
      }));
      
      // Batch send all events
      await inngest.send(events);
    }
    
    return { triggered: recurringTransactions.length };
  }
);

// Cron Schedule Explanation:
// "0 0 * * *"
//  │ │ │ │ │
//  │ │ │ │ └─── Day of week (0-7, 0 and 7 are Sunday)
//  │ │ │ └───── Month (1-12)
//  │ │ └─────── Day of month (1-31)
//  │ └───────── Hour (0-23)
//  └─────────── Minute (0-59)
//
// Examples:
// "0 0 * * *"     - Every day at midnight
// "0 */6 * * *"   - Every 6 hours
// "0 0 1 * *"     - First day of every month at midnight
```

## Job 3: Generate Monthly Reports

### Purpose
Generates AI-powered financial reports on the 1st of each month.

### Code
```javascript
export const generateMonthlyReports = inngest.createFunction(
  {
    id: "generate-monthly-reports",
    name: "Generate Monthly Reports",
  },
  { cron: "0 0 1 * *" },  // First day of month at midnight
  async ({ step }) => {
    // Fetch all users
    const users = await step.run("fetch-users", async () => {
      return await db.user.findMany({
        include: { accounts: true },
      });
    });
    
    // Process each user
    for (const user of users) {
      await step.run(`generate-report-${user.id}`, async () => {
        // Get last month's date
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        
        // Calculate monthly statistics
        const stats = await getMonthlyStats(user.id, lastMonth);
        const monthName = lastMonth.toLocaleString("default", { month: "long" });
        
        // Generate AI insights using Gemini
        const insights = await generateFinancialInsights(stats, monthName);
        
        // Send email with report
        await sendEmail({
          to: user.email,
          subject: `Your Monthly Financial Report - ${monthName}`,
          react: EmailTemplate({
            userName: user.name,
            type: "monthly-report",
            data: {
              stats,
              month: monthName,
              insights,
            },
          }),
        });
      });
    }
    
    return { processed: users.length };
  }
);

// Helper: Calculate monthly statistics
async function getMonthlyStats(userId, month) {
  const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
  const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  
  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
  
  return transactions.reduce(
    (stats, t) => {
      const amount = t.amount.toNumber();
      if (t.type === "EXPENSE") {
        stats.totalExpenses += amount;
        stats.byCategory[t.category] = (stats.byCategory[t.category] || 0) + amount;
      } else {
        stats.totalIncome += amount;
      }
      return stats;
    },
    {
      totalExpenses: 0,
      totalIncome: 0,
      byCategory: {},
      transactionCount: transactions.length,
    }
  );
}

// Helper: Generate AI insights
async function generateFinancialInsights(stats, month) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
    Analyze this financial data and provide 3 concise, actionable insights.
    Focus on spending patterns and practical advice.
    Keep it friendly and conversational.

    Financial Data for ${month}:
    - Total Income: ${stats.totalIncome}
    - Total Expenses: ${stats.totalExpenses}
    - Net Income: ${stats.totalIncome - stats.totalExpenses}
    - Expense Categories: ${Object.entries(stats.byCategory)
      .map(([category, amount]) => `${category}: ${amount}`)
      .join(", ")}

    Format the response as a JSON array of strings, like this:
    ["insight 1", "insight 2", "insight 3"]
  `;
  
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error generating insights:", error);
    return [
      "Your highest expense category this month might need attention.",
      "Consider setting up a budget for better financial management.",
      "Track your recurring expenses to identify potential savings.",
    ];
  }
}
```

## Job 4: Check Budget Alerts

### Purpose
Checks every 6 hours if users have exceeded 80% of their budget and sends email alerts.

### Code
```javascript
export const checkBudgetAlerts = inngest.createFunction(
  { name: "Check Budget Alerts" },
  { cron: "0 */6 * * *" },  // Every 6 hours
  async ({ step }) => {
    // Fetch all budgets with user and account data
    const budgets = await step.run("fetch-budgets", async () => {
      return await db.budget.findMany({
        include: {
          user: {
            include: {
              accounts: {
                where: { isDefault: true },  // Only default account
              },
            },
          },
        },
      });
    });
    
    // Check each budget
    for (const budget of budgets) {
      const defaultAccount = budget.user.accounts[0];
      if (!defaultAccount) continue;
      
      await step.run(`check-budget-${budget.id}`, async () => {
        // Get start of current month
        const startDate = new Date();
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);
        
        // Calculate total expenses for default account
        const expenses = await db.transaction.aggregate({
          where: {
            userId: budget.userId,
            accountId: defaultAccount.id,
            type: "EXPENSE",
            date: { gte: startDate },
          },
          _sum: { amount: true },
        });
        
        const totalExpenses = expenses._sum.amount?.toNumber() || 0;
        const budgetAmount = budget.amount.toNumber();
        const percentageUsed = (totalExpenses / budgetAmount) * 100;
        
        // Send alert if 80%+ used and not already alerted this month
        if (
          percentageUsed >= 80 &&
          (!budget.lastAlertSent || isNewMonth(budget.lastAlertSent, new Date()))
        ) {
          await sendEmail({
            to: budget.user.email,
            subject: `Budget Alert for ${defaultAccount.name}`,
            react: EmailTemplate({
              userName: budget.user.name,
              type: "budget-alert",
              data: {
                percentageUsed: percentageUsed.toFixed(1),
                budgetAmount: budgetAmount.toFixed(2),
                totalExpenses: totalExpenses.toFixed(2),
                accountName: defaultAccount.name,
              },
            }),
          });
          
          // Update last alert timestamp
          await db.budget.update({
            where: { id: budget.id },
            data: { lastAlertSent: new Date() },
          });
        }
      });
    }
  }
);

function isNewMonth(lastAlertDate, currentDate) {
  return (
    lastAlertDate.getMonth() !== currentDate.getMonth() ||
    lastAlertDate.getFullYear() !== currentDate.getFullYear()
  );
}
```

## Inngest API Route
```javascript
// app/api/inngest/route.js
import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import {
  checkBudgetAlerts,
  generateMonthlyReports,
  processRecurringTransaction,
  triggerRecurringTransactions,
} from "@/lib/inngest/function";

// Export HTTP methods for Next.js
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    processRecurringTransaction,
    triggerRecurringTransactions,
    generateMonthlyReports,
    checkBudgetAlerts,
  ],
});

// This endpoint:
// - GET: Returns function metadata (for Inngest dashboard)
// - POST: Receives events from Inngest
// - PUT: Updates function configuration
```

---

# 🤖 AI INTEGRATION (DEEP DIVE)

## Google Gemini Setup
```javascript
// actions/transaction.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
```

## Feature 1: Receipt Scanning

### Purpose
Extract transaction data from receipt images using AI.

### Complete Implementation
```javascript
export async function scanReceipt(file) {
  try {
    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Convert ArrayBuffer to Base64
    const base64String = Buffer.from(arrayBuffer).toString("base64");
    
    // Structured prompt for consistent output
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

      If it's not a receipt, return an empty object {}
    `;
    
    // Send to Gemini
    const result = await model.generateContent([
      {
        inlineData: {
          data: base64String,
          mimeType: file.type,  // image/jpeg, image/png, etc.
        },
      },
      prompt,
    ]);
    
    // Parse response
    const response = await result.response;
    const text = response.text();
    
    // Clean markdown code blocks if present
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    
    // Parse JSON
    try {
      const data = JSON.parse(cleanedText);
      return {
        amount: parseFloat(data.amount),
        date: new Date(data.date),
        description: data.description,
        category: data.category,
        merchantName: data.merchantName,
      };
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      throw new Error("Invalid response format from Gemini");
    }
  } catch (error) {
    console.error("Error scanning receipt:", error);
    throw new Error("Failed to scan receipt");
  }
}

// Usage in component:
const handleReceiptUpload = async (file) => {
  try {
    const data = await scanReceipt(file);
    // Auto-fill form with extracted data
    form.setValue("amount", data.amount);
    form.setValue("date", data.date);
    form.setValue("description", data.description);
    form.setValue("category", data.category);
  } catch (error) {
    toast.error("Failed to scan receipt");
  }
};
```

### Why Gemini 1.5 Flash?
- **Multimodal**: Handles both images and text
- **Fast**: Low latency for real-time scanning
- **Cost-effective**: Cheaper than GPT-4 Vision
- **Good accuracy**: Reliable for structured data extraction
- **Easy integration**: Simple API

### Prompt Engineering Best Practices
1. **Be specific**: Exact JSON format required
2. **Provide examples**: Show expected output structure
3. **List constraints**: Allowed categories, data types
4. **Handle errors**: What to return if not a receipt
5. **Keep it simple**: Don't ask for too much at once

## Feature 2: Financial Insights Generation

### Purpose
Generate personalized financial advice based on spending patterns.

### Implementation
```javascript
async function generateFinancialInsights(stats, month) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
    Analyze this financial data and provide 3 concise, actionable insights.
    Focus on spending patterns and practical advice.
    Keep it friendly and conversational.

    Financial Data for ${month}:
    - Total Income: $${stats.totalIncome}
    - Total Expenses: $${stats.totalExpenses}
    - Net Income: $${stats.totalIncome - stats.totalExpenses}
    - Expense Categories: ${Object.entries(stats.byCategory)
      .map(([category, amount]) => `${category}: $${amount}`)
      .join(", ")}

    Format the response as a JSON array of strings, like this:
    ["insight 1", "insight 2", "insight 3"]
  `;
  
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error generating insights:", error);
    // Fallback insights if AI fails
    return [
      "Your highest expense category this month might need attention.",
      "Consider setting up a budget for better financial management.",
      "Track your recurring expenses to identify potential savings.",
    ];
  }
}

// Example output:
[
  "Your food expenses increased by 25% compared to last month. Consider meal planning to reduce costs.",
  "Great job! You saved $500 this month. Consider investing it in a high-yield savings account.",
  "Your housing costs are 40% of your income, which is within the recommended 30-35% range."
]
```

---

# 📧 EMAIL SYSTEM (DEEP DIVE)

## Resend Configuration
```javascript
// actions/send-email.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, react }) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Finance Platform <noreply@yourapp.com>",
      to,
      subject,
      react,  // React Email component
    });
    
    if (error) {
      console.error("Email error:", error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error: error.message };
  }
}
```

## React Email Template
```jsx
// emails/template.jsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function EmailTemplate({ userName, type, data }) {
  // Budget Alert Email
  if (type === "budget-alert") {
    return (
      <Html>
        <Head />
        <Preview>Budget Alert - You've used {data.percentageUsed}% of your budget</Preview>
        <Body style={main}>
          <Container style={container}>
            <Heading style={h1}>Budget Alert</Heading>
            <Text style={text}>Hi {userName},</Text>
            <Text style={text}>
              You've used <strong>{data.percentageUsed}%</strong> of your monthly budget 
              for {data.accountName}.
            </Text>
            <Section style={statsSection}>
              <Text style={statText}>
                Budget: ${data.budgetAmount}
              </Text>
              <Text style={statText}>
                Spent: ${data.totalExpenses}
              </Text>
              <Text style={statText}>
                Remaining: ${(data.budgetAmount - data.totalExpenses).toFixed(2)}
              </Text>
            </Section>
            <Text style={text}>
              Consider reviewing your expenses to stay within budget.
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }
  
  // Monthly Report Email
  if (type === "monthly-report") {
    return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report - {data.month}</Preview>
        <Body style={main}>
          <Container style={container}>
            <Heading style={h1}>Monthly Financial Report</Heading>
            <Text style={text}>Hi {userName},</Text>
            <Text style={text}>
              Here's your financial summary for {data.month}:
            </Text>
            
            <Section style={statsSection}>
              <Text style={statText}>
                Total Income: ${data.stats.totalIncome.toFixed(2)}
              </Text>
              <Text style={statText}>
                Total Expenses: ${data.stats.totalExpenses.toFixed(2)}
              </Text>
              <Text style={statText}>
                Net Income: ${(data.stats.totalIncome - data.stats.totalExpenses).toFixed(2)}
              </Text>
            </Section>
            
            <Heading style={h2}>AI-Generated Insights</Heading>
            {data.insights.map((insight, index) => (
              <Text key={index} style={insightText}>
                {index + 1}. {insight}
              </Text>
            ))}
            
            <Text style={text}>
              Keep up the great work managing your finances!
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
};

const statsSection = {
  backgroundColor: "#f4f4f4",
  borderRadius: "4px",
  padding: "20px",
  margin: "20px 0",
};

const statText = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "10px 0",
};
```

---

# 🎨 FRONTEND IMPLEMENTATION (DEEP DIVE)

## Form Handling with React Hook Form + Zod

### Schema Definition
```javascript
// app/lib/schema.js
import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"], {
    required_error: "Transaction type is required",
  }),
  amount: z.number().positive("Amount must be positive"),
  description: z.string().optional(),
  date: z.date({
    required_error: "Date is required",
  }),
  category: z.string().min(1, "Category is required"),
  accountId: z.string().min(1, "Account is required"),
  isRecurring: z.boolean().default(false),
  recurringInterval: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]).optional(),
});

export const accountSchema = z.object({
  name: z.string().min(1, "Account name is required"),
  type: z.enum(["CURRENT", "SAVINGS", "CREDIT"]),
  balance: z.number().min(0, "Balance cannot be negative"),
  isDefault: z.boolean().default(false),
});

export const budgetSchema = z.object({
  amount: z.number().positive("Budget amount must be positive"),
});
```

### Form Component Example
```jsx
// app/(main)/transaction/_components/transaction-form.jsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/app/lib/schema";
import { createTransaction } from "@/actions/transaction";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function TransactionForm({ accounts }) {
  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "EXPENSE",
      amount: 0,
      description: "",
      date: new Date(),
      category: "",
      accountId: "",
      isRecurring: false,
    },
  });
  
  const onSubmit = async (data) => {
    try {
      const result = await createTransaction(data);
      if (result.success) {
        toast.success("Transaction created successfully");
        form.reset();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Type Selection */}
      <Select
        {...form.register("type")}
        error={form.formState.errors.type?.message}
      >
        <option value="INCOME">Income</option>
        <option value="EXPENSE">Expense</option>
      </Select>
      
      {/* Amount Input */}
      <Input
        type="number"
        step="0.01"
        placeholder="Amount"
        {...form.register("amount", { valueAsNumber: true })}
        error={form.formState.errors.amount?.message}
      />
      
      {/* Category Selection */}
      <Select
        {...form.register("category")}
        error={form.formState.errors.category?.message}
      >
        <option value="">Select category</option>
        <option value="food">Food</option>
        <option value="housing">Housing</option>
        <option value="transportation">Transportation</option>
        {/* ... more categories */}
      </Select>
      
      {/* Account Selection */}
      <Select
        {...form.register("accountId")}
        error={form.formState.errors.accountId?.message}
      >
        <option value="">Select account</option>
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.name} (${account.balance})
          </option>
        ))}
      </Select>
      
      {/* Recurring Checkbox */}
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...form.register("isRecurring")}
        />
        <span>Recurring transaction</span>
      </label>
      
      {/* Recurring Interval (conditional) */}
      {form.watch("isRecurring") && (
        <Select {...form.register("recurringInterval")}>
          <option value="DAILY">Daily</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
          <option value="YEARLY">Yearly</option>
        </Select>
      )}
      
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Creating..." : "Create Transaction"}
      </Button>
    </form>
  );
}
```

---

# 🎯 INTERVIEW PREPARATION

## 30-Second Elevator Pitch
"I built a full-stack AI-powered personal finance platform using Next.js 15 and React 19. Users can track expenses across multiple accounts, automate recurring transactions, and get AI-generated financial insights. I integrated Google Gemini for receipt scanning, Inngest for background jobs, Clerk for authentication, and implemented security with ArcJet rate limiting. The app uses Prisma ORM with PostgreSQL and sends email notifications via Resend."

## Common Interview Questions with Detailed Answers

### Q1: Walk me through your project architecture.

**Answer:**
"The application is built with Next.js 15 using the App Router. The architecture follows a clear separation of concerns:

**Frontend Layer:**
- React 19 server and client components
- Tailwind CSS with Shadcn UI for styling
- React Hook Form with Zod for type-safe form validation

**Middleware Layer:**
- ArcJet for security (shield protection, bot detection, rate limiting)
- Clerk for authentication and route protection

**Backend Layer:**
- Next.js Server Actions for data mutations
- API routes for webhooks (Inngest)
- Prisma ORM for database operations

**Data Layer:**
- SQLite for development, PostgreSQL for production
- Four main models: User, Account, Transaction, Budget

**Background Jobs:**
- Inngest for recurring transactions, monthly reports, and budget alerts
- Cron-based scheduling and event-driven processing

**External Services:**
- Google Gemini AI for receipt scanning and financial insights
- Resend for transactional emails
- Clerk for user management

The request flow goes: User → Middleware (Security + Auth) → App Router → Server Actions → Prisma → Database."

---

### Q2: How do you ensure data consistency in financial transactions?

**Answer:**
"Data consistency is critical in a finance app. I use Prisma's transaction API to ensure ACID properties. When creating a transaction, two operations must happen atomically:

1. Create the transaction record
2. Update the account balance

I wrap both operations in a database transaction using `db.$transaction()`. If either operation fails, both are rolled back, ensuring the database remains in a consistent state.

For example, when creating a transaction:
```javascript
const transaction = await db.$transaction(async (tx) => {
  const newTransaction = await tx.transaction.create({ data });
  await tx.account.update({
    where: { id: accountId },
    data: { balance: { increment: balanceChange } }
  });
  return newTransaction;
});
```

This prevents scenarios like:
- Transaction created but balance not updated
- Balance updated but transaction not created
- Race conditions with concurrent operations

I also use Inngest's throttling feature to limit concurrent processing of recurring transactions to 10 per minute per user, preventing race conditions in background jobs."

---

### Q3: Explain how recurring transactions work.

**Answer:**
"Recurring transactions are handled through an event-driven architecture with Inngest:

**Setup Phase:**
When a user creates a recurring transaction, I store:
- `isRecurring: true`
- `recurringInterval`: DAILY, WEEKLY, MONTHLY, or YEARLY
- `nextRecurringDate`: Calculated based on interval
- `lastProcessed`: Initially null

**Scheduling Phase:**
An Inngest cron job runs daily at midnight (`0 0 * * *`). It queries for transactions where:
- `isRecurring` is true
- `nextRecurringDate` is today or earlier
- OR `lastProcessed` is null (never processed)

**Processing Phase:**
For each due transaction, the cron job sends an event to Inngest. A separate function processes each event with throttling (10 per minute per user) to prevent overload.

The processing function:
1. Verifies the transaction is still due
2. Creates a new transaction with the same details
3. Updates the account balance
4. Updates `lastProcessed` to now
5. Calculates and sets the next `nextRecurringDate`

**Reliability:**
Inngest provides automatic retries with exponential backoff, execution history, and a visual dashboard for monitoring. This ensures rent, subscriptions, and bills are processed reliably without user intervention."

---

### Q4: How does AI receipt scanning work?

**Answer:**
"Receipt scanning uses Google Gemini 1.5 Flash, a multimodal AI model:

**Process:**
1. User uploads a receipt image (JPEG/PNG)
2. I convert the file to an ArrayBuffer, then to base64 encoding
3. Send the base64 image to Gemini with a structured prompt
4. The prompt asks for specific fields in JSON format: amount, date, merchant, category, description
5. Gemini analyzes the image and returns structured JSON
6. I parse the JSON and auto-fill the transaction form

**Why Gemini 1.5 Flash?**
- Multimodal: Handles both images and text
- Fast: Low latency for real-time scanning
- Cost-effective: Cheaper than GPT-4 Vision
- Good accuracy: Reliable for structured data extraction

**Prompt Engineering:**
I use a detailed prompt that specifies:
- Exact JSON format required
- Allowed categories (predefined list)
- Data types for each field
- Fallback behavior if not a receipt

**Error Handling:**
If AI fails or returns invalid JSON, I catch the error and allow manual entry. I also clean the response to remove markdown code blocks that Gemini sometimes includes."

---

### Q5: What security measures did you implement?

**Answer:**
"Security is implemented at multiple layers:

**1. ArcJet Middleware (Global Protection):**
- Shield Protection: Blocks SQL injection, XSS, and common attacks
- Bot Detection: Allows search engines but blocks malicious bots
- Rate Limiting: Token bucket algorithm (10 requests per minute per user)

**2. Clerk Authentication:**
- Secure session management with JWT tokens
- OAuth support (Google, GitHub)
- Route protection via middleware
- Automatic session refresh

**3. Input Validation:**
- Zod schemas validate all user input
- Type-safe validation on both client and server
- Prevents invalid data from reaching the database

**4. Server-Side Authorization:**
- Every server action checks authentication
- Users can only access their own data
- Database queries filtered by userId

**5. Database Security:**
- Prisma prevents SQL injection
- Connection pooling for performance
- Cascade deletes for data integrity

**6. Rate Limiting in Actions:**
I implement additional rate limiting in critical actions like transaction creation:
```javascript
const decision = await aj.protect(req, { userId, requested: 1 });
if (decision.isDenied()) {
  throw new Error('Too many requests');
}
```

This multi-layered approach ensures the application is secure against common attacks while maintaining good user experience."

---

### Q6: How would you scale this application?

**Answer:**
"I'd scale the application in several ways:

**Database Scaling:**
1. Switch to PostgreSQL with read replicas for queries
2. Implement database sharding by userId for horizontal scaling
3. Add Redis for caching frequent queries (user data, account balances)
4. Use connection pooling (already implemented with Prisma)

**API Scaling:**
1. Deploy on Vercel Edge Functions for global distribution
2. Implement API response caching with Redis
3. Use GraphQL for efficient data fetching (reduce over-fetching)
4. Add CDN for static assets

**Background Jobs:**
1. Inngest already scales automatically
2. Add more workers for parallel processing
3. Implement job prioritization (critical jobs first)
4. Use batching for bulk operations

**Frontend Optimization:**
1. Implement virtual scrolling for large transaction lists
2. Add service workers for offline support
3. Lazy load routes and components
4. Optimize images with WebP format and next/image

**Monitoring & Observability:**
1. Add APM (Application Performance Monitoring) with Datadog or New Relic
2. Set up alerts for slow queries and high error rates
3. Monitor Inngest job execution times
4. Track user metrics and conversion funnels

**Cost Optimization:**
1. Implement query result caching
2. Use database indexes strategically
3. Optimize AI API calls (batch processing, caching)
4. Monitor and optimize Vercel function execution time

The architecture is already designed for scalability with serverless functions, managed services, and stateless design."

### Q7: What was the biggest challenge and how did you solve it?

**Answer:**
"The biggest challenge was ensuring data consistency with concurrent recurring transaction processing.

**The Problem:**
- Multiple recurring transactions could process simultaneously
- Race conditions when updating account balances
- Risk of duplicate transaction creation
- Potential for inconsistent balance calculations

**The Solution:**
I implemented a multi-layered approach:

1. **Database Transactions:** Used Prisma's `$transaction` API to ensure atomic operations. Creating a transaction and updating the balance happen together or not at all.

2. **Inngest Throttling:** Limited processing to 10 transactions per minute per user. This prevents overwhelming the system and reduces race conditions.

3. **Idempotency Checks:** Before processing, I check the `lastProcessed` timestamp to ensure a transaction hasn't already been processed.

4. **Event-Driven Architecture:** Instead of processing directly in the cron job, I send events to Inngest. This provides:
   - Automatic retries with exponential backoff
   - Execution history for debugging
   - Better error handling

5. **Optimistic Locking:** I query for transactions where `lastProcessed` is null or `nextRecurringDate` is due, preventing duplicate processing.

**Code Example:**
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

This solution ensures reliable, consistent processing even under high load."

---

### Q8: Why did you choose Next.js over other frameworks?

**Answer:**
"I chose Next.js 15 for several compelling reasons:

**1. Full-Stack Capabilities:**
- Server Components reduce client-side JavaScript
- Server Actions provide type-safe API calls without separate endpoints
- API routes for webhooks and external integrations
- All in one codebase, simplifying development

**2. Performance:**
- Turbopack for faster development builds
- Automatic code splitting
- Image optimization with next/image
- Font optimization
- Built-in caching strategies

**3. Developer Experience:**
- App Router with nested layouts
- File-based routing
- TypeScript support out of the box
- Hot module replacement
- Great documentation

**4. Production-Ready:**
- Vercel deployment is seamless
- Edge functions for global distribution
- Automatic HTTPS
- Built-in analytics

**5. Modern React Features:**
- Server Components (RSC)
- Streaming and Suspense
- React 19 support

**For a Finance App Specifically:**
- Server-side rendering improves SEO for landing pages
- Server Actions keep sensitive logic on the server
- Built-in security features
- Excellent performance for data-heavy dashboards

**Alternatives Considered:**
- **Remix:** Great, but smaller ecosystem
- **SvelteKit:** Faster, but less mature
- **Create React App:** Client-only, would need separate backend
- **Vite + React:** More setup required, no built-in backend

Next.js provided the best balance of features, performance, and developer experience for this project."

---

### Q9: How do you handle errors and edge cases?

**Answer:**
"I implement comprehensive error handling at multiple levels:

**1. Try-Catch Blocks in Server Actions:**
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
- Validate all input before processing
- Return user-friendly error messages
- Prevent invalid data from reaching the database

**3. Database Constraints:**
- Unique constraints on email, clerkUserId
- Foreign key constraints ensure referential integrity
- Not null constraints on required fields
- Check constraints for business rules

**4. Inngest Retries:**
- Automatic retries with exponential backoff
- Max 2 attempts to prevent infinite loops
- Execution history for debugging failures

**5. User Feedback:**
- Toast notifications for success/error states
- Form validation errors displayed inline
- Loading states during async operations
- Clear error messages (not technical jargon)

**Edge Cases Handled:**

**Negative Balances:**
- Allowed for credit card accounts
- Validation prevents negative balances for savings accounts

**Deleted Accounts:**
- Cascade delete removes all related transactions
- Prevents orphaned data

**Invalid Dates:**
- Zod validates date format
- Prevents future dates for past transactions

**Missing AI API Keys:**
- Graceful fallback to manual entry
- Clear error message to user

**Rate Limit Exceeded:**
- Clear message: "Too many requests. Please try again later."
- Shows remaining time until reset

**Concurrent Updates:**
- Database transactions prevent race conditions
- Optimistic locking for recurring transactions

**Failed Email Delivery:**
- Log error but don't fail the operation
- Retry mechanism in Resend

**Example Error Handling:**
```javascript
try {
  const result = await scanReceipt(file);
  form.setValue("amount", result.amount);
} catch (error) {
  toast.error("Failed to scan receipt. Please enter manually.");
  // User can still proceed with manual entry
}
```

This approach ensures the app is resilient and provides a good user experience even when things go wrong."

---

### Q10: Explain your database schema and relationships.

**Answer:**
"The database has four main models with clear relationships:

**1. User Model:**
- Stores user information synced with Clerk
- `clerkUserId` is the foreign key to Clerk's system
- Has one-to-many relationships with Accounts, Transactions, and Budgets

**2. Account Model:**
- Represents financial accounts (checking, savings, credit cards)
- One-to-many relationship with User (user can have multiple accounts)
- One-to-many relationship with Transactions
- `isDefault` flag indicates the primary account
- `balance` field tracks current balance

**3. Transaction Model:**
- Records all financial activities
- Many-to-one with User (user has many transactions)
- Many-to-one with Account (account has many transactions)
- Supports recurring transactions with:
  - `isRecurring` boolean
  - `recurringInterval` (DAILY, WEEKLY, MONTHLY, YEARLY)
  - `nextRecurringDate` for scheduling
  - `lastProcessed` for idempotency

**4. Budget Model:**
- One-to-one with User (each user has one budget)
- Tracks monthly spending limit
- `lastAlertSent` prevents duplicate alerts

**Relationships:**
```
User (1) ──→ (N) Account
  │              │
  │              │
  ↓              ↓
  (N) Transaction (N)
  │
  ↓
  (1) Budget
```

**Cascade Delete:**
All relationships use `onDelete: Cascade`, so when a user is deleted, all their accounts, transactions, and budgets are automatically removed.

**Indexes:**
I added indexes on `userId` and `accountId` in the Transaction model for faster queries, since these are frequently used in WHERE clauses.

**Why This Design:**
- Normalized to avoid data duplication
- Flexible (users can have multiple accounts)
- Supports complex queries (transactions by account, by user, by date range)
- Maintains referential integrity
- Scales well with proper indexing"

---

## Key Technical Concepts to Master

### 1. Server Components vs Client Components
```javascript
// Server Component (default in Next.js 15)
// - Runs on server
// - Can access database directly
// - No JavaScript sent to client
// - Cannot use hooks or event handlers
export default async function DashboardPage() {
  const accounts = await getUserAccounts(); // Direct DB access
  return <div>{accounts.map(...)}</div>;
}

// Client Component
// - Runs in browser
// - Can use hooks and event handlers
// - Requires "use client" directive
"use client";
export default function TransactionForm() {
  const [amount, setAmount] = useState(0);
  return <input onChange={(e) => setAmount(e.target.value)} />;
}
```

### 2. Server Actions
```javascript
// Server-side function that can be called from client
"use server";
export async function createTransaction(data) {
  // Runs on server, has access to database
  const result = await db.transaction.create({ data });
  revalidatePath("/dashboard"); // Refresh cached data
  return result;
}

// Called from client component
const handleSubmit = async (data) => {
  const result = await createTransaction(data);
};
```

### 3. Revalidation
```javascript
// Tell Next.js to refresh cached data
revalidatePath("/dashboard");        // Refresh specific path
revalidatePath("/account/[id]");     // Refresh dynamic route
revalidateTag("transactions");       // Refresh by tag
```

### 4. Prisma Relationships
```javascript
// Include related data
const user = await db.user.findUnique({
  where: { id },
  include: {
    accounts: true,              // Include all accounts
    transactions: {              // Include transactions with filters
      where: { type: "EXPENSE" },
      orderBy: { date: "desc" },
      take: 10,
    },
  },
});

// Select specific fields
const user = await db.user.findUnique({
  where: { id },
  select: {
    id: true,
    email: true,
    accounts: {
      select: { name: true, balance: true },
    },
  },
});
```

---

## Environment Variables Explained

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...  # Public key (client-side)
CLERK_SECRET_KEY=sk_test_...                   # Secret key (server-side)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in         # Sign-in page URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up         # Sign-up page URL

# Database
DATABASE_URL="file:./dev.db"                   # SQLite (development)
# DATABASE_URL="postgresql://..."              # PostgreSQL (production)
# DIRECT_URL="postgresql://..."                # Direct connection for migrations

# AI
GEMINI_API_KEY=AIzaSy...                       # Google Gemini API key

# Email
RESEND_API_KEY=re_...                          # Resend API key

# Security
ARCJET_KEY=ajkey_...                           # ArcJet API key
```

**Note:** Variables starting with `NEXT_PUBLIC_` are exposed to the browser. Keep secrets without this prefix.

---

## Deployment Checklist

### Pre-Deployment
- [ ] Set up PostgreSQL database (Supabase)
- [ ] Update Prisma schema to use PostgreSQL
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Set all environment variables in Vercel
- [ ] Test production build locally: `npm run build && npm start`

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Set build command: `npm run build`
4. Set output directory: `.next`
5. Deploy

### Post-Deployment
- [ ] Test authentication flow
- [ ] Verify database connections
- [ ] Test Inngest webhooks
- [ ] Verify email sending
- [ ] Test AI features
- [ ] Monitor error logs

---

## Common Debugging Tips

### Database Issues
```bash
# Reset database
npx prisma migrate reset

# View database in GUI
npx prisma studio

# Generate Prisma client
npx prisma generate

# Check database connection
npx prisma db pull
```

### Inngest Issues
```bash
# Start Inngest dev server
inngest-cli dev

# View dashboard
# http://localhost:8288

# Check function registration
# GET http://localhost:3000/api/inngest
```

### Next.js Issues
```bash
# Clear cache
rm -rf .next

# Check build errors
npm run build

# View production mode locally
npm run build && npm start
```

---

## Project Statistics

- **Total Files:** 100+
- **Lines of Code:** ~3,000+
- **Database Models:** 4
- **API Routes:** 2
- **Server Actions:** 15+
- **Background Jobs:** 4
- **UI Components:** 20+
- **Dependencies:** 30+

---

## Learning Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Inngest Docs](https://www.inngest.com/docs)
- [Google Gemini API](https://ai.google.dev/docs)
- [ArcJet Docs](https://docs.arcjet.com)
- [Shadcn UI](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)

### Video Tutorials
- Next.js 15 App Router Tutorial
- Prisma ORM Complete Guide
- Clerk Authentication Setup
- Inngest Background Jobs

---

## Final Tips for Interviews

### Do's:
✅ Explain your architectural decisions
✅ Discuss trade-offs you considered
✅ Mention challenges and how you solved them
✅ Show enthusiasm for the technologies
✅ Be ready to draw diagrams
✅ Prepare code examples
✅ Know your database schema by heart
✅ Understand the data flow

### Don'ts:
❌ Memorize code without understanding
❌ Claim you know everything
❌ Ignore security considerations
❌ Forget to mention testing (even if not implemented)
❌ Overlook error handling
❌ Dismiss scalability concerns

### Practice Questions:
1. Draw the database schema
2. Explain the authentication flow
3. Walk through creating a transaction
4. Describe how recurring transactions work
5. Explain the AI receipt scanning process
6. Discuss security measures
7. How would you add a new feature?
8. How would you debug a production issue?

---

## Conclusion

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

**You're now ready to discuss this project confidently in any interview or technical discussion!**

---

**Created by:** Jay Kumar
**Last Updated:** [Current Date]
**Version:** 1.0

---

# 🤖 HOW TO USE THIS PROMPT

## For AI Assistants:
When a user pastes this prompt, provide:
1. Detailed explanations of any concept they ask about
2. Code examples with comments
3. Comparisons with alternative approaches
4. Real-world scenarios and use cases
5. Interview-style answers
6. Debugging help
7. Architecture diagrams (in text format)
8. Best practices and recommendations

## For Users:
You can ask questions like:
- "Explain how recurring transactions work"
- "Show me the database schema"
- "How does authentication work?"
- "What security measures are implemented?"
- "How would you scale this application?"
- "Explain the AI receipt scanning code"
- "What are Server Actions in Next.js?"
- "How do you handle errors?"
- "Walk me through the project architecture"
- "Help me prepare for an interview about this project"

The AI will provide comprehensive, detailed answers based on this documentation.
