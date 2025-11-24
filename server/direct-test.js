// Simple test script to verify email is working
// Run with: node server/direct-test.js

const testEmail = async () => {
  try {
    console.log('🧪 Testing contact form endpoint...\n');
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message to verify the email system is working correctly.',
      subject: 'Test Email from Direct Test Script'
    };

    console.log('📤 Sending request to http://localhost:5000/api/contact');
    console.log('Data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('\n📡 Response status:', response.status);
    
    const data = await response.json();
    console.log('📧 Response data:', JSON.stringify(data, null, 2));

    if (data.success) {
      console.log('\n✅ SUCCESS! Email should be sent to santosh07entrepreneur@gmail.com');
      console.log('Check your inbox (including spam folder) in a few seconds.');
    } else {
      console.log('\n❌ FAILED:', data.message);
    }
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.log('\n⚠️ Make sure the backend server is running:');
    console.log('   npm run server:dev');
  }
};

// Add a small delay to ensure server is ready
setTimeout(testEmail, 1000);
