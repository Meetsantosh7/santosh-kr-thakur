# Firebase Contact Form Integration

This portfolio website now includes a Firebase-integrated contact form that stores messages in Firestore.

## Features

- **Real-time form submission** to Firebase Firestore
- **Form validation** with required fields
- **Loading states** with animated spinner
- **Success/Error notifications** with auto-hide
- **Responsive design** matching the glassmorphism theme

## Setup

1. Firebase configuration is already set up in `lib/firebase.ts`
2. The contact form automatically saves to the `contacts` collection in Firestore
3. Each submission includes:
   - Name
   - Email
   - Message
   - Timestamp (server timestamp)
   - Created date (ISO string)

## Firebase Console

To view submitted messages:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `contact-us-form-3e89d`
3. Navigate to Firestore Database
4. Check the `contacts` collection

## Security Rules

Make sure to set up proper Firestore security rules in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to contacts collection
    match /contacts/{document} {
      allow create: if true; // Allow anyone to create contact messages
      allow read, update, delete: if false; // Restrict other operations
    }
  }
}
```

## Environment Variables (Optional)

For production, consider moving Firebase config to environment variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# ... other config values
```
