const testContactForm = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'johndoe@example.com',
        subject: 'Test Contact from Script',
        message: 'This is a test message from the contact form testing script. If you receive this, the contact form is working perfectly!'
      })
    });

    const data = await response.json();
    console.log('Response:', data);
    
    if (data.success) {
      console.log('✅ SUCCESS: Email sent! Check santosh07entrepreneur@gmail.com');
    } else {
      console.log('❌ FAILED:', data.message);
    }
  } catch (error) {
    console.error('❌ ERROR:', error);
  }
};

testContactForm();
