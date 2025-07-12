// Optional: Manual collection initialization script
// Run this once to create the collection structure

import { db } from './lib/firebase'
import { collection, addDoc } from 'firebase/firestore'

export async function initializeContactsCollection() {
  try {
    // Create a test document to initialize the collection
    await addDoc(collection(db, 'contacts'), {
      name: 'Test Contact',
      email: 'test@example.com',
      message: 'This is a test message to initialize the collection',
      timestamp: new Date(),
      createdAt: new Date().toISOString(),
    })
    
    console.log('Contacts collection initialized successfully!')
  } catch (error) {
    console.error('Error initializing collection:', error)
  }
}

// Call this function once to set up the collection
// initializeContactsCollection()
