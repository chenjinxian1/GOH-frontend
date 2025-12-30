// src/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Database
import { getAuth } from "firebase/auth";           // 🟢 Added: Authentication service

// Do not keep "......", otherwise it will throw an "Invalid API Key" error
const firebaseConfig = {
    apiKey: "AIzaSyARwcZ_4SV_0HbLe0umeT-WkjCQk-kvCmw",
    authDomain: "goh-frontend.firebaseapp.com",
    projectId: "goh-frontend",
    storageBucket: "goh-frontend.firebasestorage.app",
    messagingSenderId: "667091169322",
    appId: "1:667091169322:web:fbd520888b4b51b32b9353",
    measurementId: "G-C8HXCHHZQN"
};

// 1. Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 2. Export database instance (used for articles, disease information)
export const db = getFirestore(app);

// 3. 🟢 Export auth instance (used for login, registration, password changes)
export const auth = getAuth(app);