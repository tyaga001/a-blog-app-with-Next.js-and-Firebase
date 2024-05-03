import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "blogging-4d6ba.firebaseapp.com",
  projectId: "blogging-4d6ba",
  storageBucket: "blogging-4d6ba.appspot.com",
  messagingSenderId: "256957534126",
  appId: "1:256957534126:web:55a16cfa7aff75e66fc23f"
};

//👇🏻 Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

//👇🏻 required functions
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

//👇🏻 required exports
export { db, auth, googleProvider, storage}