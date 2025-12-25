import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDJhnPHA5hEePtfFCEK8lc3tXUX6ltINB0",
    authDomain: "ps-it-support-portal.firebaseapp.com",
    projectId: "ps-it-support-portal",
    storageBucket: "ps-it-support-portal.firebasestorage.app",
    messagingSenderId: "1074172202136",
    appId: "1:1074172202136:web:ace9cf504be016a998d4ed",
    measurementId: "G-MECQG9VKZZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
