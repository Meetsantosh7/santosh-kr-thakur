#!/usr/bin/env node

/**
 * Test script for Vercel deployed API
 * Usage: node test-vercel.js https://your-domain.vercel.app
 */

const testVercelAPI = async (domain) => {
  if (!domain) {
    console.log('❌ Please provide your Vercel domain');
    console.log('Usage: node test-vercel.js https://your-domain.vercel.app');
    process.exit(1);
  }

  // Remove trailing slash
  domain = domain.replace(/\/$/, '');

  console.log('🧪 Testing Vercel API endpoints...\n');
  console.log('Domain:', domain);
  console.log('─'.repeat(50));

  // Test 1: Health check
  console.log('\n1️⃣ Testing health endpoint...');
  try {
    const healthResponse = await fetch(`${domain}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }

  // Test 2: Contact form
  console.log('\n2️⃣ Testing contact form endpoint...');
  try {
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message from the Vercel deployment test script.',
      subject: 'Test Email from Vercel'
    };

    console.log('Sending:', contactData);
    
    const contactResponse = await fetch(`${domain}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });

    const contactResult = await contactResponse.json();
    
    if (contactResult.success) {
      console.log('✅ Contact form test passed!');
      console.log('📧 Check your email at: santosh07entrepreneur@gmail.com');
    } else {
      console.log('❌ Contact form test failed:', contactResult.message);
    }
  } catch (error) {
    console.log('❌ Contact form test failed:', error.message);
  }

  console.log('\n' + '─'.repeat(50));
  console.log('✨ Testing complete!\n');
};

// Get domain from command line argument
const domain = process.argv[2];
testVercelAPI(domain);
