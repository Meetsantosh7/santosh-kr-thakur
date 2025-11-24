# Express Backend with Nodemailer

## Setup

1. Install dependencies (already done):
```bash
npm install
```

2. Configure environment variables in `.env.local`:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CONTACT_EMAIL=your-contact-email@gmail.com
PORT=5000
```

### Gmail Setup
If using Gmail:
1. Enable 2-factor authentication on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password as `EMAIL_PASSWORD`

## Running the Server

### Development Mode
```bash
npm run server:dev
```

### Production Mode
```bash
npm run server:start
```

## API Endpoints

### 1. Health Check
```
GET /api/health
```

### 2. Send Email
```
POST /api/send-email
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "text": "Plain text content",
  "html": "<p>HTML content</p>",
  "from": "sender@example.com" // optional
}
```

### 3. Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Contact Subject", // optional
  "message": "Your message here"
}
```

## Example Usage from Frontend

```typescript
// Send email
const response = await fetch('http://localhost:5000/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'recipient@example.com',
    subject: 'Test Email',
    html: '<h1>Hello!</h1><p>This is a test email.</p>'
  })
});

// Contact form
const contactResponse = await fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello, I would like to get in touch.'
  })
});
```
