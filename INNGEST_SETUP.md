# 🔧 Inngest Setup - Step by Step

## ⚠️ Error: "We could not reach your URL"

This means Inngest cannot connect to your deployed app. Follow these steps IN ORDER:

---

## ✅ Step-by-Step Fix

### Step 1: Verify Your App is Deployed
1. Go to https://vercel.com/dashboard
2. Check if your project is deployed
3. Copy your deployment URL (e.g., `https://ai-finance-platform-xxx.vercel.app`)
4. Visit the URL in your browser - it should load your app

**If NOT deployed yet:**
- Go to https://vercel.com
- Click "Add New Project"
- Import: `jk7145/Ai-Finance-Platform`
- Add environment variables (see below)
- Click "Deploy"
- Wait for deployment to complete

---

### Step 2: Add Environment Variables in Vercel

**CRITICAL:** You MUST add the signing key BEFORE syncing with Inngest!

1. Go to your project in Vercel
2. Click "Settings" → "Environment Variables"
3. Add these variables:

```
INNGEST_SIGNING_KEY = signkey-prod-01490dead05bc0ab983cf7b4d50eecec2dfb7b2a56596f5c0941b696d9305a20

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = pk_test_bWFueS1waWthLTkzLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY = sk_test_l4BMN3NyxHcq7cqyVMH5XZVh2MZtDnalcpGzEq2URP
NEXT_PUBLIC_CLERK_SIGN_IN_URL = /sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL = /sign-up

DATABASE_URL = postgresql://postgres.czjvkkbfsktqmmikznen:kRPOGdw9qxBDkbnA@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL = postgresql://postgres.czjvkkbfsktqmmikznen:kRPOGdw9qxBDkbnA@aws-1-ap-south-1.pooler.supabase.com:5432/postgres

GEMINI_API_KEY = AIzaSyB1XD83aUIaZEkVRqFBIFncPBnA8-EtiqI
RESEND_API_KEY = re_BqXyKE6q_DuJJY1aCPWUXh7n5F3kLQyM5
ARCJET_KEY = ajkey_01khp49scyeq6bt73vbwm1321h
```

4. Click "Save"

---

### Step 3: Redeploy After Adding Variables

**IMPORTANT:** Vercel needs to rebuild with the new environment variables!

1. Go to "Deployments" tab
2. Click the three dots (•••) on the latest deployment
3. Click "Redeploy"
4. Wait for redeployment to complete (2-3 minutes)

---

### Step 4: Test the Inngest Endpoint

Before syncing with Inngest, verify the endpoint works:

1. Open your browser
2. Go to: `https://your-app-name.vercel.app/api/inngest`
3. You should see JSON response like:
```json
{
  "authentication_succeeded": true,
  "function_count": 4,
  "has_event_key": false,
  "has_signing_key": true,
  "mode": "cloud"
}
```

**If you see an error:**
- Check Vercel logs: Deployments → Click deployment → "Functions" tab
- Look for errors related to Inngest or environment variables

---

### Step 5: Sync with Inngest

Now you can sync:

1. Go to https://app.inngest.com
2. Navigate to your app
3. Click "Apps" → "Sync App"
4. Enter FULL URL: `https://your-app-name.vercel.app/api/inngest`
   - ✅ Include `https://`
   - ✅ Include `/api/inngest`
5. Click "Sync"

**Expected Result:**
- ✅ "Successfully synced"
- ✅ 4 functions registered:
  - process-recurring-transaction
  - trigger-recurring-transactions
  - generate-monthly-reports
  - Check Budget Alerts

---

## 🔍 Troubleshooting

### Error: "We could not reach your URL"

**Cause 1: App not deployed**
- Solution: Deploy to Vercel first

**Cause 2: Wrong URL**
- Solution: Use full URL with https:// and /api/inngest

**Cause 3: Signing key not set**
- Solution: Add INNGEST_SIGNING_KEY in Vercel, then redeploy

**Cause 4: Build failed**
- Solution: Check Vercel deployment logs for errors

**Cause 5: Route not working**
- Solution: Visit the URL in browser to verify it responds

---

### Error: "Signature verification failed"

**Cause:** Signing key mismatch
**Solution:**
1. Copy the EXACT signing key from Inngest dashboard
2. Paste it in Vercel environment variables
3. Redeploy
4. Try sync again

---

### Error: "No functions found"

**Cause:** Functions not registered properly
**Solution:**
1. Check `/app/api/inngest/route.js` exists
2. Verify all 4 functions are imported
3. Check Vercel build logs for errors
4. Redeploy

---

## 📋 Quick Checklist

Before syncing with Inngest, verify:

- [ ] App is deployed to Vercel
- [ ] Deployment is successful (green checkmark)
- [ ] INNGEST_SIGNING_KEY is added in Vercel
- [ ] App was redeployed after adding the key
- [ ] `/api/inngest` endpoint returns JSON (test in browser)
- [ ] Using full URL: `https://your-domain.vercel.app/api/inngest`

---

## 🎯 Expected Flow

```
1. Deploy to Vercel
   ↓
2. Add INNGEST_SIGNING_KEY
   ↓
3. Redeploy
   ↓
4. Test: https://your-app.vercel.app/api/inngest
   ↓
5. Sync in Inngest dashboard
   ↓
6. ✅ Success! 4 functions registered
```

---

## 💡 Pro Tips

1. **Always redeploy after adding environment variables**
2. **Test the endpoint in browser before syncing**
3. **Check Vercel logs if something fails**
4. **Copy signing key exactly (no extra spaces)**
5. **Wait 1-2 minutes after deployment before syncing**

---

## 🆘 Still Having Issues?

### Check Vercel Logs:
1. Go to Vercel dashboard
2. Click your project
3. Go to "Deployments"
4. Click latest deployment
5. Click "Functions" tab
6. Look for `/api/inngest` errors

### Check Inngest Logs:
1. Go to Inngest dashboard
2. Click "Apps"
3. Look for sync errors
4. Check function registration status

### Common Log Errors:

**"INNGEST_SIGNING_KEY is not defined"**
- Add the variable in Vercel and redeploy

**"Cannot find module '@/lib/inngest/client'"**
- Build error, check your imports

**"Prisma Client not generated"**
- Ensure `postinstall` script runs: `"postinstall": "prisma generate"`

---

## ✅ Success Indicators

When everything works:

1. **Vercel Deployment:**
   - Status: Ready ✓
   - No errors in logs

2. **Inngest Endpoint:**
   - Returns JSON with `"has_signing_key": true`
   - Shows `"function_count": 4`

3. **Inngest Dashboard:**
   - Shows "Synced" status
   - Lists 4 functions
   - Can trigger test runs

---

**Need more help?** Check:
- Vercel Docs: https://vercel.com/docs
- Inngest Docs: https://www.inngest.com/docs/deploy/vercel
- Your deployment logs in Vercel dashboard

---

Made with 💗 by Jay Kumar
