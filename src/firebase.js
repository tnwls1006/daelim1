import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4SRvhZKC9-Eu9NxOR_tu2iWtgDeN_qho",
  authDomain: "dealim101.firebaseapp.com",
  projectId: "dealim101",
  storageBucket: "dealim101.appspot.com",
  messagingSenderId: "253225700864",
  appId: "1:253225700864:web:f3bc09068eb5fe77d352e5",
  measurementId: "G-9QQZNLQ1NF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
