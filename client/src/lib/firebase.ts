import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8zTExeOruiSorHh4jUrcdomn7S2ucBrE",
    authDomain: "yaerib-e835e.firebaseapp.com",
    projectId: "yaerib-e835e",
    storageBucket: "yaerib-e835e.firebasestorage.app",
    messagingSenderId: "857467373921",
    appId: "1:857467373921:web:0213fed9e138b29ee5dd20",
    measurementId: "G-9RN0YJM59V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
