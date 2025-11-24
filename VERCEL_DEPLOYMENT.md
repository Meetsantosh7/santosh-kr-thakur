# Deploying Backend to Vercel

## ✅ Your Email System is Already Working!

The terminal logs show:
```
✅ Email sent successfully! Message ID: <51c2d281-679a-a50c-7ce7-5b153eec8816@gmail.com>
```

**Check your Gmail at `santosh07entrepreneur@gmail.com`** - you should have received the test email!

---

## 🚀 Deploy to Vercel

I've created serverless API routes in the `/api` folder that will work on Vercel.

### Step 1: Set Environment Variables on Vercel

Go to your Vercel project dashboard and add these environment variables:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=santosh07entrepreneur@gmail.com
EMAIL_PASSWORD=nrhcnehfnubbanmu
EMAIL_FROM=santosh07entrepreneur@gmail.com
```

**How to add:**
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable above
5. Make sure to select **Production**, **Preview**, and **Development** for each

### Step 2: Deploy to Vercel

#### Option A: Deploy via Git (Recommended)

```bash
git add .
git commit -m "Add email backend for Vercel"
git push origin main
```

Vercel will automatically deploy your changes.

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Deploy
vercel --prod
```

### Step 3: Test Your Deployed API

After deployment, test your API:

```bash
# Replace YOUR-DOMAIN with your actual Vercel domain
curl -X POST https://YOUR-DOMAIN.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Testing from Vercel",
    "subject": "Test Email"
  }'
```

---

## 📁 What Was Created

### Serverless API Routes (for Vercel)

1. **`/api/contact.ts`** - Main contact form endpoint
2. **`/api/send-email.ts`** - General email sending endpoint
3. **`/api/health.ts`** - Health check endpoint

These files work as serverless functions on Vercel.

### Updated Files

1. **`app/api/contact/route.ts`** - Updated to use Vercel API routes when deployed
2. **`vercel.json`** - Configured for API routes

---

## 🔄 How It Works

### Local Development
- Uses Express server on `http://localhost:5000`
- Run with: `npm run dev:all`

### Production (Vercel)
- Uses serverless functions in `/api` folder
- Automatically deployed when you push to Git
- No separate backend server needed!

---

## 🧪 Testing

### Test Locally
```bash
npm run dev:all
# Then submit a form at http://localhost:3000
```

### Test on Vercel
After deployment, submit the contact form on your live site.

---

## ⚠️ Important Notes

1. **Gmail App Password**: Make sure `EMAIL_PASSWORD` is set correctly in Vercel environment variables
2. **Environment Variables**: Must be added in Vercel dashboard before deployment
3. **CORS**: Already configured to accept requests from any origin
4. **Rate Limiting**: Consider adding rate limiting in production

---

## 📧 Email Configuration

Your emails are configured to:
- **From**: santosh07entrepreneur@gmail.com (via SMTP)
- **To**: santosh07entrepreneur@gmail.com
- **Reply-To**: User's email address

---

## 🐛 Troubleshooting

### Email not sending on Vercel

1. **Check environment variables** in Vercel dashboard
2. **Check Vercel logs**: 
   - Go to your project on Vercel
   - Click on **Deployments**
   - Click on your deployment
   - View **Functions** logs

3. **Verify Gmail settings**:
   - 2-factor authentication enabled
   - App password is correct
   - App password has no spaces

### API not responding

1. **Check the API URL**: Should be `/api/contact` (not `/api/contact/route`)
2. **Check CORS**: Already configured, but verify in browser console
3. **Check request format**: Must be POST with JSON body

---

## 📊 Monitoring

### View Logs on Vercel

1. Go to https://vercel.com/dashboard
2. Select your project
3. Click on **Deployments**
4. Click on a deployment
5. Click on **Functions** to see logs

### Common Log Messages

- ✅ `Email sent successfully!` - Email was sent
- ❌ `Missing required fields` - Form validation failed
- ❌ `Failed to send email` - SMTP error (check credentials)

---

## 🎯 Next Steps

1. ✅ Add environment variables to Vercel
2. ✅ Push code to Git (or deploy via CLI)
3. ✅ Test the contact form on your live site
4. ✅ Check your Gmail for test emails
5. ✅ Monitor logs on Vercel dashboard

---

## 📝 Quick Deploy Commands

```bash
# Commit your changes
git add .
git commit -m "Add serverless email backend"
git push origin main

# Or deploy directly with Vercel CLI
vercel --prod
```

That's it! Your backend will work seamlessly on Vercel! 🚀
