// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_APIKEY,
  authDomain: String(import.meta.env.VITE_APP_AUTHDOMAIN),
  projectId: String(import.meta.env.VITE_APP_PROJECT_ID),
  storageBucket: String(import.meta.env.VITE_APP_STORAGEBUCKET),
  messagingSenderId: String(import.meta.env.VITE_APP_MESSAGINGSENDERID),
  appId: String(import.meta.env.VITE_APP_APPID),
  measurementId: String(import.meta.env.VITE_APP_MEASUREMENTID),
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export default app