import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Handle CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    console.log('🔷 Next.js API Route /api/contact called');
    const body = await request.json();
    const { name, email, message, subject } = body;
    console.log('📝 Request data:', { name, email, subject, messageLength: message?.length });

    // Validate input
    if (!name || !email || !message) {
      console.log('❌ Validation failed - missing required fields');
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400, headers }
      );
    }

    // Send email directly using Nodemailer
    console.log('✉️ Preparing to send email...');
    
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'santosh07entrepreneur@gmail.com',
      subject: subject || `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    };

    console.log('📤 Sending email to: santosh07entrepreneur@gmail.com');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully! Message ID:', info.messageId);

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      messageId: info.messageId,
    }, { headers });
  } catch (error) {
    console.error('❌ Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500, headers }
    );
  }
}
