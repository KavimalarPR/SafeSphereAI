import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvsDhJCGq8FwafBBf5bgYqIEEXmamlKL0",
  authDomain: "safesphere-183f6.firebaseapp.com",
  projectId: "safesphere-183f6",
  storageBucket: "safesphere-183f6.firebasestorage.app",
  messagingSenderId: "678995781349",
  appId: "1:678995781349:web:d58be3c968d15eb338960c",
  measurementId: "G-GSEKLQXWLR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;