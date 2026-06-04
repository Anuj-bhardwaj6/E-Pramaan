# 🚀 Hackaton - Automated Attendance System

A low-cost, user-friendly *Automated Attendance System* for rural schools using *React + Vite + Firebase + MUI*.

---

## 🔗 Repository
Clone this repository:
```bash
cd Hackaton
📦 Install Dependencies
bash
Copy code
npm install
⚙️ Firebase Setup
Go to Firebase Console

Create a project named Hackaton

Enable Authentication (Email/Password)

Enable Firestore Database

Copy your Firebase SDK Config (Project Settings > Web App)

📂 Add Environment Variables
Create file:

bash
Copy code
src/.env.local
Paste your Firebase config:

env
Copy code
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
🔑 Firebase Config File
Create file:

bash
Copy code
src/firebase.js
Add this code:

js
Copy code
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
▶️ Run Project
bash
Copy code
npm run dev
Open: http://localhost:5173
