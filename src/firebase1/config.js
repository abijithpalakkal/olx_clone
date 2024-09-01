
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBDa7H_mC10I8jrEoTcu0XUxJiYuHbPHm8",
    authDomain: "olxdemo-9c388.firebaseapp.com",
    projectId: "olxdemo-9c388",
    storageBucket: "olxdemo-9c388.appspot.com",
    messagingSenderId: "231174511894",
    appId: "1:231174511894:web:37e40d7b0b141e5188c437",
    measurementId: "G-VGJF6P9P40"
};
export const Firebase = initializeApp(firebaseConfig);
export const db = getFirestore(Firebase); 
export const auth = getAuth();
