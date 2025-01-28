import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIShDoU-cjMOw1jH_05Tb4CMwhWy_LnXM",
  authDomain: "leetcode-clone-5.firebaseapp.com",
  projectId: "leetcode-clone-5",
  storageBucket: "leetcode-clone-5.firebasestorage.app",
  messagingSenderId: "616095821331",
  appId: "1:616095821331:web:0002db5910820a142e99e6",
  measurementId: "G-V5KC9QB2R3"
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, app };