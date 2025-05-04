import  { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyBzAS65E4ykqiD52rVs5JqmqhP_DJ1fX10",
  authDomain: "rent-vehicle-8ad23.firebaseapp.com",
  projectId: "rent-vehicle-8ad23",
  storageBucket: "rent-vehicle-8ad23.firebasestorage.app",
  messagingSenderId: "114045785130",
  appId: "1:114045785130:web:a6ca72d94b226922aa5f53",
  measurementId: "G-N6GB23WD12"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
 