// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCP5RezgDLn5fXd3xGYsGmIw2fUjidsORY",
  authDomain: "lpu2hand.firebaseapp.com",
  databaseURL: "https://lpu2hand-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lpu2hand",
  storageBucket: "lpu2hand.appspot.com",
  messagingSenderId: "794914930867",
  appId: "1:794914930867:web:e42d65bc57da07c177f0c6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Use database URL from env with a safe default to the correct region
const databaseUrl =
  import.meta.env.VITE_DATABASE ||
  "https://lpu2hand-default-rtdb.firebaseio.com";
export const db = getDatabase(app, databaseUrl);

// Secondary app for privileged operations like creating other users without switching sessions
let secondaryApp;
export function getSecondaryAuth() {
  if (!secondaryApp) {
    secondaryApp = initializeApp(firebaseConfig, "secondary");
  }
  return getAuth(secondaryApp);
}

export { databaseUrl };
