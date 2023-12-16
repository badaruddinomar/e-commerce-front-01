// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-commerce01-8f1fd.firebaseapp.com",
  projectId: "e-commerce01-8f1fd",
  storageBucket: "e-commerce01-8f1fd.appspot.com",
  messagingSenderId: "959823245193",
  appId: "1:959823245193:web:18dc14062ebd069c117b58",
  measurementId: "G-XC3DL7MDE7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
