import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYfT3A8uYI7CfIiXAUP07u6GWSSbB-qZ8",
  authDomain: "ethlance-b9509.firebaseapp.com",
  projectId: "ethlance-b9509",
  storageBucket: "ethlance-b9509.appspot.com",
  messagingSenderId: "169683826728",
  appId: "1:169683826728:web:71a41c804402e05523dd1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);