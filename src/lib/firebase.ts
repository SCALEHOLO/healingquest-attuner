// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: "attuner-75d93.firebaseapp.com",
//   projectId: "attuner-75d93",
//   storageBucket: "attuner-75d93.firebasestorage.app",
//   messagingSenderId: "314684965444",
//   appId: "1:314684965444:web:409d73db116c5139107211",
//   measurementId: "G-069D49BK6E"
// };
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (only on client side)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firebase Auth with mobile-friendly settings
export const auth = getAuth(app);

// Configure auth for mobile browsers
if (typeof window !== 'undefined') {
  // Set auth persistence for mobile browsers
  import('firebase/auth').then(({ setPersistence, browserLocalPersistence }) => {
    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.warn('Failed to set auth persistence:', error);
    });
  });
}

// Initialize Firestore
export const db = getFirestore(app);

export { analytics };
export default app; 