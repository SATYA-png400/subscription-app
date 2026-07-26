import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNae33NjcTXsKkWOIRfg_FG-IQLdEvuKU",
  authDomain: "subscription-app-3ad0b.firebaseapp.com",
  projectId: "subscription-app-3ad0b",
  storageBucket: "subscription-app-3ad0b.firebasestorage.app",
  messagingSenderId: "150367586367",
  appId: "1:150367586367:web:e5a5cb03f73893ae49108a",
  measurementId: "G-E24CLTGCEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);