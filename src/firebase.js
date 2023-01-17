import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5F6h4umwkRenaeo8UMG2kKX9l3j2lEfQ",
  authDomain: "robotic-pact-276206.firebaseapp.com",
  projectId: "robotic-pact-276206",
  storageBucket: "robotic-pact-276206.appspot.com",
  messagingSenderId: "817373280657",
  appId: "1:817373280657:web:bd4731beb83ee88aa3c230",
  measurementId: "G-VXEX7VGZEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);