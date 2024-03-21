import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD43OBKNWRz38oEXTTWTxaPKcQ6eri9tG4",
  authDomain: "delivery-boy-9a901.firebaseapp.com",
  projectId: "delivery-boy-9a901",
  storageBucket: "delivery-boy-9a901.appspot.com",
  messagingSenderId: "232451145963",
  appId: "1:232451145963:web:b792c20e120f802f39beae",
  measurementId: "G-R49RBHTCSN",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
