import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5EARfkllc537gOk6oHan9s_6MfFmnmeE",
  authDomain: "project-auction-3c6a3.firebaseapp.com",
  databaseURL: "https://project-auction-3c6a3-default-rtdb.firebaseio.com",
  projectId: "project-auction-3c6a3",
  storageBucket: "project-auction-3c6a3.appspot.com",
  messagingSenderId: "186507734455",
  appId: "1:186507734455:web:3e60268d7aeb253d5c8c32",
  measurementId: "G-QNNVJLC062",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
