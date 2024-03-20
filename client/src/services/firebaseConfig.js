import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBxuVV9AiFsat03NKz5KnyiGSS3U3AqgyQ',
  authDomain: 'food-delivery-ad1d2.firebaseapp.com',
  projectId: 'food-delivery-ad1d2',
  storageBucket: 'food-delivery-ad1d2.appspot.com',
  messagingSenderId: '149175752685',
  appId: '1:149175752685:web:b54a6c8d7d82d79eff39e4',
  measurementId: 'G-S8VHLP3DR9',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
