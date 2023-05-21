import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBzb5ERIc38mIF-jkPKt8KlPZiQKI6wxrQ",
  authDomain: "docs-6dbb4.firebaseapp.com",
  projectId: "docs-6dbb4",
  storageBucket: "docs-6dbb4.appspot.com",
  messagingSenderId: "305213869240",
  appId: "1:305213869240:web:b2c5e133185174f07eb84d",
  measurementId: "G-HVWXS6ZPGZ",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getFirestore(app);
