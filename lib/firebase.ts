// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm4Amg7LvY_977oNkV33t0coxoPpp6V7w",
  authDomain: "contact-us-form-3e89d.firebaseapp.com",
  projectId: "contact-us-form-3e89d",
  storageBucket: "contact-us-form-3e89d.appspot.com", // <-- FIXED HERE
  messagingSenderId: "588730014261",
  appId: "1:588730014261:web:d99b4627a4de45fdf3af7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
