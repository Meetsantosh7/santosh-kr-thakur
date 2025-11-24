import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
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
        { status: 400 }
      );
    }

    // Call Express backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    console.log(`🔗 Calling backend at: ${backendUrl}/api/contact`);
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message, subject }),
    });
    console.log(`📡 Backend response status: ${response.status}`);

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'Failed to send message' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
