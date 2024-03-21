import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_API_KEY_FIREBASE,
  authDomain: import.meta.env.REACT_APP_AUTHDOMAIN,
  projectId: import.meta.env.REACT_APP_PRJECT_ID,
  storageBucket: import.meta.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.REACT_APP_MESSAGINGSENDERID,
  appId: import.meta.env.REACT_APP_APPID,
  measurementId: import.meta.env.REACT_APP_MESSAGINGSENDERID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
