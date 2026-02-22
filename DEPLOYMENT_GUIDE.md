# 🚀 Deployment Guide - AI Finance Platform

## ✅ Code is Ready!
Your code is now pushed to: **https://github.com/jk7145/Ai-Finance-Platform**

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure you have:
- ✅ GitHub repository (Done!)
- ✅ Clerk account and API keys
- ✅ Google Gemini API key
- ✅ Resend API key
- ✅ ArcJet API key
- ✅ Inngest account and signing key
- ⚠️ PostgreSQL database (Supabase recommended)

---

## 🌐 Deploy to Vercel (Recommended)

### Step 1: Sign Up for Vercel
1. Go to https://vercel.com
2. Sign up with your GitHub account
3. Authorize Vercel to access your repositories

### Step 2: Import Your Project
1. Click "Add New Project"
2. Select "Import Git Repository"
3. Choose: `jk7145/Ai-Finance-Platform`
4. Click "Import"

### Step 3: Configure Environment Variables

In the Vercel dashboard, add these environment variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database (Use Supabase PostgreSQL for production)
DATABASE_URL=
DIRECT_URL=

# AI
GEMINI_API_KEY=

# Email
RESEND_API_KEY=

# Security
ARCJET_KEY=

# Inngest
INNGEST_SIGNING_KEY=
INNGEST_EVENT_KEY=(get from Inngest dashboard)
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Your app will be live at: `https://your-app-name.vercel.app`

---

## 🗄️ Database Setup (Supabase)

### Option 1: Use Existing Supabase Database
Your current DATABASE_URL is already configured for Supabase. Just make sure:
1. The database is accessible
2. Run migrations after deployment

### Option 2: Create New Supabase Database
1. Go to https://supabase.com
2. Create a new project
3. Go to Settings → Database
4. Copy the connection strings:
   - **Connection Pooling** → Use for DATABASE_URL
   - **Direct Connection** → Use for DIRECT_URL
5. Update environment variables in Vercel

### Run Database Migrations
After deployment, run migrations:
```bash
# In Vercel dashboard, go to Settings → Functions
# Or run locally and push schema:
npx prisma db push
```

---

## 🔧 Post-Deployment Configuration

### 1. Configure Inngest
1. Go to https://app.inngest.com
2. Navigate to your app
3. Click "Apps" → "Sync"
4. Enter your deployed URL: `https://your-app-name.vercel.app/api/inngest`
5. Click "Sync App"
6. Verify all 4 functions are registered:
   - Process Recurring Transaction
   - Trigger Recurring Transactions
   - Generate Monthly Reports
   - Check Budget Alerts

### 2. Update Clerk URLs
1. Go to https://dashboard.clerk.com
2. Navigate to your application
3. Go to "Paths"
4. Update URLs:
   - Home URL: `https://your-app-name.vercel.app`
   - Sign-in URL: `https://your-app-name.vercel.app/sign-in`
   - Sign-up URL: `https://your-app-name.vercel.app/sign-up`
   - After sign-in: `https://your-app-name.vercel.app/dashboard`
   - After sign-up: `https://your-app-name.vercel.app/dashboard`

### 3. Configure Resend Domain (Optional)
1. Go to https://resend.com/domains
2. Add your custom domain
3. Update DNS records
4. Verify domain

### 4. Test Your Deployment
- ✅ Visit your deployed URL
- ✅ Test sign-up/sign-in
- ✅ Create an account
- ✅ Add a transaction
- ✅ Test receipt scanning
- ✅ Check Inngest dashboard for background jobs

---

## 🔍 Troubleshooting

### Build Fails
**Error:** "Module not found"
**Solution:** Run `npm install --legacy-peer-deps` locally and commit package-lock.json

**Error:** "Prisma Client not generated"
**Solution:** Ensure `postinstall` script is in package.json:
```json
"postinstall": "prisma generate"
```

### Database Connection Issues
**Error:** "Can't reach database server"
**Solution:** 
1. Check DATABASE_URL is correct
2. Ensure Supabase project is running
3. Verify IP allowlist in Supabase (allow all: 0.0.0.0/0)

### Inngest Sync Fails
**Error:** "Signature verification failed"
**Solution:**
1. Verify INNGEST_SIGNING_KEY is set in Vercel
2. Redeploy after adding the key
3. Wait 1-2 minutes and try sync again

### Clerk Authentication Issues
**Error:** "Redirect loop"
**Solution:**
1. Update Clerk dashboard URLs to match your deployed domain
2. Clear browser cache
3. Try incognito mode

---

## 📊 Monitoring

### Vercel Analytics
- Go to your project → Analytics
- Monitor page views, performance, errors

### Inngest Dashboard
- https://app.inngest.com
- Monitor background job executions
- View logs and errors

### Prisma Studio (Production)
```bash
# Connect to production database
DATABASE_URL="your-production-url" npx prisma studio
```

---

## 🔄 Continuous Deployment

Every time you push to GitHub:
1. Vercel automatically detects changes
2. Builds and deploys new version
3. Zero downtime deployment

To deploy:
```bash
git add .
git commit -m "Your commit message"
git push origin master
```

---

## 🎉 Your App is Live!

Once deployed, share your app:
- **Live URL:** `https://your-app-name.vercel.app`
- **GitHub:** https://github.com/jk7145/Ai-Finance-Platform
- **Inngest Dashboard:** https://app.inngest.com

---

## 📝 Next Steps

1. ✅ Deploy to Vercel
2. ✅ Configure Inngest
3. ✅ Update Clerk URLs
4. ✅ Test all features
5. 🎯 Add custom domain (optional)
6. 🎯 Set up monitoring alerts
7. 🎯 Add more features!

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Inngest Docs: https://www.inngest.com/docs
- Clerk Docs: https://clerk.com/docs
- Prisma Docs: https://www.prisma.io/docs

---

Made with 💗 by Jay Kumar
