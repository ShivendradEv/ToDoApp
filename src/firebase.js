// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBa011LQBNbZJICwM3eoUgsrHcJ9eaSXe4",
    authDomain: "todoapp-efca6.firebaseapp.com",
    projectId: "todoapp-efca6",
    storageBucket: "todoapp-efca6.firebasestorage.app",
    messagingSenderId: "877491224578",
    appId: "1:877491224578:web:73ad9d14adef48f149271b",
    measurementId: "G-W8HP615MYJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);