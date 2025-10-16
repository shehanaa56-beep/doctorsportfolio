// Firebase configuration helper
// This file initializes Firestore, Realtime Database and Analytics.
// Values prefer environment variables (REACT_APP_*) but default to the provided project config.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyC-gezoI34c7e1oPq0tD_UVoyHGxT_3DDY",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "ecommerce-be353.firebaseapp.com",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || "https://ecommerce-be353-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "ecommerce-be353",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "ecommerce-be353.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "565831558769",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:565831558769:web:41552d517b6d4d632dddd0",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-B1S99Q42TX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const rtdb = getDatabase(app);
const auth = getAuth(app);
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  // Analytics may fail to initialize in some environments (SSR, missing window)
  // This is non-fatal; log for debug.
  // console.warn('Analytics not available', e);
}

export { db, rtdb, analytics, auth };
