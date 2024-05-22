// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-app-1e7e0.firebaseapp.com",
  projectId: "auth-app-1e7e0",
  storageBucket: "auth-app-1e7e0.appspot.com",
  messagingSenderId: "675683453245",
  appId: "1:675683453245:web:8fab4c5a3860437262dd54",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
