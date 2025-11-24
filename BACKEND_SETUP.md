# Backend Setup Guide

## What's Been Added

✅ Express.js server with Nodemailer
✅ TypeScript support
✅ CORS enabled
✅ Environment variable configuration
✅ Next.js API routes integration
✅ Contact form component example

## Dependencies Installed

```json
{
  "dependencies": {
    "express": "^4.x",
    "nodemailer": "^6.x",
    "cors": "^2.x",
    "dotenv": "^16.x"
  },
  "devDependencies": {
    "@types/express": "^4.x",
    "@types/nodemailer": "^6.x",
    "@types/cors": "^2.x",
    "tsx": "^4.x",
    "concurrently": "^8.x"
  }
}
```

## Configuration Steps

### 1. Configure Email Settings

Edit `.env.local` and add your email credentials:

```env
# For Gmail
EMAIL_SERVICE=gmail
EMAIL_USER=youremail@gmail.com
EMAIL_PASSWORD=your-app-password
CONTACT_EMAIL=youremail@gmail.com

# Server Configuration
PORT=5000
BACKEND_URL=http://localhost:5000
```

**Gmail App Password Setup:**
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to https://myaccount.google.com/apppasswords
4. Generate an app password
5. Use that password as `EMAIL_PASSWORD`

**For Other Email Services:**
- Outlook: Use `EMAIL_SERVICE=outlook`
- Yahoo: Use `EMAIL_SERVICE=yahoo`
- Custom SMTP: Modify `server/index.ts` transporter config

### 2. Run the Servers

**Option 1: Run Both Servers Together (Recommended)**
```bash
npm run dev:all
```
This runs:
- Next.js on http://localhost:3000
- Express backend on http://localhost:5000

**Option 2: Run Separately**
```bash
# Terminal 1 - Next.js
npm run dev

# Terminal 2 - Backend
npm run server:dev
```

## API Endpoints

### Backend (Express) - Port 5000

#### Health Check
```http
GET http://localhost:5000/api/health
```

#### Send Email
```http
POST http://localhost:5000/api/send-email
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Test Email",
  "html": "<h1>Hello!</h1>",
  "text": "Hello!"
}
```

#### Contact Form
```http
POST http://localhost:5000/api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here",
  "subject": "Optional subject"
}
```

### Next.js API Routes - Port 3000

These routes proxy to the Express backend:

```http
POST http://localhost:3000/api/contact
POST http://localhost:3000/api/send-email
```

## Usage Examples

### Frontend Component

```typescript
// Using the ContactForm component
import ContactForm from '@/components/ContactForm';

export default function Page() {
  return (
    <div className="container py-10">
      <ContactForm />
    </div>
  );
}
```

### Custom API Call

```typescript
// Send email from any component
const sendEmail = async () => {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: 'recipient@example.com',
      subject: 'Welcome!',
      html: '<h1>Welcome to our site!</h1>'
    })
  });
  
  const data = await response.json();
  console.log(data);
};
```

### Server-Side Usage (Next.js Server Components)

```typescript
// In a server component or API route
export async function POST(request: Request) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
  
  const response = await fetch(`${backendUrl}/api/send-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: 'user@example.com',
      subject: 'Order Confirmation',
      html: '<p>Your order has been confirmed!</p>'
    })
  });
  
  return Response.json(await response.json());
}
```

## File Structure

```
santosh-kr-thakur/
├── server/
│   ├── index.ts          # Express server with Nodemailer
│   └── README.md         # Backend documentation
├── app/
│   └── api/
│       ├── contact/
│       │   └── route.ts  # Contact form API route
│       └── send-email/
│           └── route.ts  # Send email API route
├── components/
│   └── ContactForm.tsx   # Example contact form
├── .env.local            # Environment variables
└── package.json          # Updated with server scripts
```

## Troubleshooting

### Gmail Authentication Error
- Make sure 2-Step Verification is enabled
- Use an App Password, not your regular password
- Check that EMAIL_USER and EMAIL_PASSWORD are correct in .env.local

### Port Already in Use
Change the port in `.env.local`:
```env
PORT=5001
BACKEND_URL=http://localhost:5001
```

### CORS Errors
The backend is configured to accept requests from all origins. For production, update `server/index.ts`:
```typescript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

### Environment Variables Not Loading
- Make sure `.env.local` exists in the root directory
- Restart both servers after changing environment variables

## Production Deployment

### Deploy Backend
1. Choose a hosting service (Heroku, Railway, Render, etc.)
2. Set environment variables on the hosting platform
3. Deploy the server folder

### Update Next.js
Update `BACKEND_URL` in production environment variables to point to your deployed backend.

## Testing

Test the backend directly:
```bash
# Health check
curl http://localhost:5000/api/health

# Send test email
curl -X POST http://localhost:5000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"to":"test@example.com","subject":"Test","text":"Hello"}'
```

## Security Notes

- Never commit `.env.local` to version control
- Use App Passwords, not regular passwords
- In production, restrict CORS to your domain
- Implement rate limiting for production
- Validate and sanitize all inputs

## Next Steps

1. ✅ Configure email credentials in `.env.local`
2. ✅ Run `npm run dev:all` to start both servers
3. ✅ Test the contact form at your Next.js app
4. ✅ Customize email templates as needed
5. ✅ Add additional email routes if required
