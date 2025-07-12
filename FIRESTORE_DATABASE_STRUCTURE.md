# Firestore Database Structure

## Collection: `contacts`

This document outlines the complete database structure for the contact form submissions in your portfolio website.

### Collection Name
```
contacts
```

### Document Structure

Each contact form submission creates a new document with the following fields:

#### Field Schema

| Field Name | Type | Required | Description | Example Value |
|------------|------|----------|-------------|---------------|
| `name` | string | Yes | Contact person's full name | "John Doe" |
| `email` | string | Yes | Contact person's email address | "john.doe@example.com" |
| `message` | string | Yes | The message content from contact form | "Hi, I'm interested in working with you..." |
| `timestamp` | timestamp | Yes | Auto-generated submission timestamp | 2024-01-15T10:30:00Z |
| `status` | string | No | Message status (optional for future use) | "new", "read", "replied" |

#### Sample Document

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com", 
  "message": "Hi Santosh, I came across your portfolio and I'm really impressed with your work. I'd love to discuss a potential project collaboration. Please let me know when you're available for a call.",
  "timestamp": {
    "_seconds": 1705312200,
    "_nanoseconds": 0
  }
}
```

### Firestore Rules

For security, use these Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public write access to contacts collection (for form submissions)
    // Only allow authenticated users to read (you can set up admin access)
    match /contacts/{document} {
      allow write: if true; // Anyone can submit
      allow read: if request.auth != null; // Only authenticated users can read
    }
  }
}
```

### Manual Collection Creation (Optional)

If you want to create the collection manually before the first submission:

#### Option 1: Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to Firestore Database
4. Click "Start collection"
5. Collection ID: `contacts`
6. Add a sample document with these fields:
   - Field: `name`, Type: string, Value: "Test User"
   - Field: `email`, Type: string, Value: "test@example.com"
   - Field: `message`, Type: string, Value: "Test message"
   - Field: `timestamp`, Type: timestamp, Value: (current time)

#### Option 2: Using the Init Script
Run the provided initialization script:

```bash
node scripts/init-firestore.js
```

### Data Validation

The contact form includes client-side validation:
- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format
- **Message**: Required, minimum 10 characters

### Indexes

Firestore will automatically create indexes for:
- Single field indexes for each field
- Composite index for queries (if needed later)

Recommended indexes for admin queries:
```
Collection: contacts
Fields: timestamp (Descending), status (Ascending)
```

### Security Considerations

1. **Write Access**: Currently allows public write access for form submissions
2. **Read Access**: Restricted to authenticated users only
3. **Data Sanitization**: Consider adding server-side validation
4. **Rate Limiting**: Consider implementing rate limiting for form submissions
5. **Spam Protection**: Consider adding reCAPTCHA or similar protection

### Backup Strategy

1. **Automatic Backups**: Enable Firestore automatic backups
2. **Export Schedule**: Set up regular exports to Cloud Storage
3. **Point-in-time Recovery**: Available for up to 7 days

### Monitoring

Set up alerts for:
- High number of submissions (potential spam)
- Failed writes
- Security rule violations

### Future Enhancements

Potential fields to add later:
- `ip_address`: string (for tracking)
- `user_agent`: string (browser info)
- `source`: string (referrer page)
- `priority`: string ("low", "medium", "high")
- `category`: string ("project", "job", "collaboration")
- `replied_at`: timestamp (when you responded)
- `notes`: string (internal notes)

### Sample Queries

Common queries you might need:

#### Get all contacts ordered by newest first
```javascript
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

const q = query(collection(db, 'contacts'), orderBy('timestamp', 'desc'));
const querySnapshot = await getDocs(q);
```

#### Get unread contacts
```javascript
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

const q = query(
  collection(db, 'contacts'), 
  where('status', '==', 'new'),
  orderBy('timestamp', 'desc')
);
const querySnapshot = await getDocs(q);
```

#### Get contacts from last 30 days
```javascript
import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';

const thirtyDaysAgo = Timestamp.fromDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

const q = query(
  collection(db, 'contacts'),
  where('timestamp', '>=', thirtyDaysAgo),
  orderBy('timestamp', 'desc')
);
const querySnapshot = await getDocs(q);
```

---

## Summary

The `contacts` collection is designed to be simple yet extensible. It captures the essential information from your contact form and can be easily extended with additional fields as your needs grow. The automatic timestamp ensures you can track when each message was received, and the flexible schema allows for future enhancements without breaking existing functionality.
