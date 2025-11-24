# IMPORTANT: Fix 405 Error on Vercel

## 🔴 Problem
You're getting a 405 error because the environment variables are NOT set on Vercel.

## ✅ Solution: Add Environment Variables on Vercel

### Step 1: Go to Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select your project: `santosh-kr-thakur`
3. Click on **Settings** tab
4. Click on **Environment Variables** in the left sidebar

### Step 2: Add These Variables

Add each of these environment variables:

```
EMAIL_HOST
Value: smtp.gmail.com
Select: Production, Preview, Development
```

```
EMAIL_PORT
Value: 587
Select: Production, Preview, Development
```

```
EMAIL_USER
Value: santosh07entrepreneur@gmail.com
Select: Production, Preview, Development
```

```
EMAIL_PASSWORD
Value: nrhcnehfnubbanmu
Select: Production, Preview, Development
```

### Step 3: Redeploy

After adding all environment variables:
1. Go to **Deployments** tab
2. Click on the **...** menu on the latest deployment
3. Click **Redeploy**

OR simply push a new commit:
```bash
git add .
git commit -m "Update email config"
git push origin main
```

---

## 🧪 Test After Deployment

1. Go to your live site: `https://your-domain.vercel.app`
2. Fill out the contact form
3. Submit it
4. Check your Gmail at `santosh07entrepreneur@gmail.com`

---

## 🔍 Why This Happens

- **Local**: Works because `.env.local` file has the variables
- **Vercel**: Doesn't work because `.env.local` is not uploaded (and shouldn't be!)
- **Solution**: Environment variables must be added in Vercel dashboard

---

## ⚠️ If Still Getting 405 Error

1. **Clear browser cache**: Press Ctrl+Shift+R (or Cmd+Shift+R on Mac)
2. **Check console logs**: Open browser DevTools (F12) → Console tab
3. **Check Vercel logs**: 
   - Go to your project on Vercel
   - Click **Deployments**
   - Click on your deployment
   - Click **Functions** tab to see logs

---

## 📧 The Email Will Be Sent To

`santosh07entrepreneur@gmail.com`

All contact form submissions will arrive in this inbox!

---

## 🚀 Quick Deploy Command

```bash
git add .
git commit -m "Fix email backend for Vercel"
git push origin main
```

Vercel will auto-deploy in ~2 minutes.
