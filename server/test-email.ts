import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';

// Load .env.local file
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('Testing email configuration...');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***configured***' : 'NOT SET');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

console.log('\nVerifying transporter...');

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error);
    process.exit(1);
  } else {
    console.log('✅ Email server is ready to send messages');
    
    // Send test email
    console.log('\nSending test email...');
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'santosh07entrepreneur@gmail.com',
      subject: 'Test Email from Portfolio Backend',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify the email configuration is working.</p>
        <p>If you receive this, your Nodemailer setup is working correctly!</p>
        <p>Timestamp: ${new Date().toLocaleString()}</p>
      `,
    }, (err, info) => {
      if (err) {
        console.error('❌ Failed to send test email:', err);
        process.exit(1);
      } else {
        console.log('✅ Test email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Check your inbox at: santosh07entrepreneur@gmail.com');
        process.exit(0);
      }
    });
  }
});
