# 🎤 Interview Cheat Sheet - AI Finance Platform

## 30-Second Elevator Pitch
"I built a full-stack AI-powered finance platform using Next.js 15 and React 19. It helps users track expenses across multiple accounts, automate recurring transactions, and get AI-generated financial insights. I integrated Google Gemini for receipt scanning, Inngest for background jobs, and implemented security with ArcJet rate limiting. The app uses Prisma ORM with PostgreSQL, Clerk for authentication, and sends email notifications via Resend."

---

## Tech Stack (Memorize This)

### Frontend
- Next.js 15 (App Router, Server Components)
- React 19 RC
- Tailwind CSS + Shadcn UI
- React Hook Form + Zod validation
- Recharts for data visualization

### Backend
- Next.js API Routes + Server Actions
- Prisma ORM
- SQLite (dev) / PostgreSQL (prod)
- Clerk Authentication
- Inngest (background jobs)

### AI & Services
- Google Gemini AI (receipt scanning, insights)
- Resend (email notifications)
- ArcJet (security, rate limiting)

---

## Database Schema (4 Models)

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

**Key Fields:**
- User: clerkUserId, email, name
- Account: name, type, balance, isDefault
- Transaction: type, amount, category, isRecurring, nextRecurringDate
- Budget: amount, lastAlertSent

---

## Key Features (What Makes It Special)

1. **AI Receipt Scanning** - Upload receipt → Gemini extracts data → Auto-fills form
2. **Recurring Transactions** - Rent, subscriptions auto-process daily
3. **Budget Alerts** - Email when 80% spent
4. **Monthly Reports** - AI-generated insights via email
5. **Multi-Account** - Checking, savings, credit cards
6. **Security** - Rate limiting, bot detection, shield protection

---

## Background Jobs (4 Inngest Functions)

| Function | Trigger | Purpose |
|----------|---------|---------|
| Process Recurring Transaction | Event | Creates new transaction, updates balance |
| Trigger Recurring Transactions | Daily (midnight) | Finds due transactions, sends events |
| Generate Monthly Reports | 1st of month | AI insights + email |
| Check Budget Alerts | Every 6 hours | Sends email if 80%+ spent |

---

## Common Interview Questions - Quick Answers

### "Walk me through your project"
"It's a personal finance app where users can track income/expenses across multiple accounts. The unique features are AI receipt scanning using Google Gemini, automated recurring transactions with Inngest, and monthly AI-generated financial reports. I used Next.js 15 for the full-stack, Prisma for the database, and Clerk for authentication."

### "How do you ensure data consistency?"
"I use Prisma's transaction API to ensure atomicity. When creating a transaction, I wrap both the transaction creation and balance update in a database transaction, so either both succeed or both fail."

### "How does authentication work?"
"I use Clerk for authentication. It handles sign-up, login, and session management. In my middleware, I check if routes are protected and redirect to sign-in if needed. In server actions, I use `await auth()` to get the Clerk userId, then query my database using clerkUserId as a foreign key."

### "Explain recurring transactions"
"Users mark transactions as recurring (daily/weekly/monthly/yearly). An Inngest cron job runs daily at midnight, finds transactions where nextRecurringDate is today or earlier, creates new transactions, updates balances, and calculates the next occurrence date. Inngest provides reliability with automatic retries and throttling."

### "How does AI receipt scanning work?"
"Users upload a receipt image. I convert it to base64, send it to Google Gemini 1.5 Flash with a structured prompt asking for amount, date, merchant, category, and description in JSON format. The AI extracts this data, and I parse the JSON to auto-fill the transaction form."

### "What security measures did you implement?"
"I use ArcJet middleware for three layers: Shield protection against common attacks, bot detection to block malicious bots, and rate limiting with a token bucket algorithm (10 requests per minute per user). I also validate all inputs with Zod schemas and use Clerk for secure authentication."

### "How would you scale this?"
"Switch to PostgreSQL with read replicas, add Redis for caching, implement database sharding by userId, use Vercel Edge Functions for global distribution, add virtual scrolling for large lists, and implement GraphQL for efficient data fetching. Inngest already scales automatically."

### "What was the biggest challenge?"
"Ensuring data consistency with concurrent recurring transactions. I solved it using Prisma transactions for atomicity, Inngest throttling to limit concurrent processing, and checking lastProcessed timestamps to prevent duplicates."

---

## Code Snippets to Remember

### Server Action Pattern
```javascript
export async function createTransaction(data) {
  const { userId } = await auth();
  const user = await db.user.findUnique({ where: { clerkUserId: userId } });
  
  const transaction = await db.$transaction(async (tx) => {
    const newTx = await tx.transaction.create({ data });
    await tx.account.update({
      where: { id: data.accountId },
      data: { balance: { increment: balanceChange } }
    });
    return newTx;
  });
  
  revalidatePath("/dashboard");
  return { success: true, data: transaction };
}
```

### Inngest Function Pattern
```javascript
export const processRecurringTransaction = inngest.createFunction(
  { id: "process-recurring-transaction", throttle: { limit: 10, period: "1m" } },
  { event: "transaction.recurring.process" },
  async ({ event, step }) => {
    await step.run("process", async () => {
      // Create transaction + update balance
    });
  }
);
```

### Middleware Pattern
```javascript
const aj = arcjet({ key: process.env.ARCJET_KEY, rules: [shield(), detectBot()] });
const clerk = clerkMiddleware(async (auth, req) => {
  if (!userId && isProtectedRoute(req)) return redirectToSignIn();
});
export default createMiddleware(aj, clerk);
```

---

## Numbers to Know

- **4 Database Models** (User, Account, Transaction, Budget)
- **4 Background Jobs** (Inngest functions)
- **3 Security Layers** (Shield, Bot Detection, Rate Limiting)
- **2 AI Features** (Receipt scanning, Financial insights)
- **10 Requests/min** (Rate limit per user)
- **80% Threshold** (Budget alert trigger)
- **3000+ Lines of Code**

---

## What Makes This Project Stand Out

✅ **Modern Stack** - Next.js 15, React 19, latest technologies
✅ **AI Integration** - Practical use of Gemini AI
✅ **Background Jobs** - Automated recurring transactions
✅ **Security** - Rate limiting, bot detection, authentication
✅ **Data Consistency** - Database transactions, atomic operations
✅ **Email Notifications** - User engagement
✅ **Full-Stack** - Frontend + Backend + Database + DevOps

---

## If Asked About Weaknesses/Improvements

"Currently, it's a single-currency app. I'd add multi-currency support with exchange rates. I'd also implement comprehensive testing with Jest and Playwright, add data visualization with interactive charts, and build a React Native mobile app. For production, I'd add monitoring with Sentry and implement caching with Redis."

---

## Closing Statement

"This project taught me full-stack development with modern technologies, how to integrate AI for practical features, implement reliable background jobs, and ensure data consistency in concurrent operations. I'm proud of the AI receipt scanning feature and the automated recurring transaction system. It's production-ready and demonstrates my ability to build complete, scalable applications."

---

**Remember:** Be confident, explain your decisions, and show enthusiasm for the technologies you used!
