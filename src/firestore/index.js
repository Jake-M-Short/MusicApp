import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
    apiKey: "AIzaSyAjZ3Pk7T6hkV80jUXdIetyK7CtZfPmhCw",
    authDomain: "musicapp-c2028.firebaseapp.com",
    projectId: "musicapp-c2028",
    storageBucket: "musicapp-c2028.firebasestorage.app",
    messagingSenderId: "541484001756",
    appId: "1:541484001756:web:27c9cc17474f0632784719"
};

initializeApp(firebaseConfig);

getDatabase();