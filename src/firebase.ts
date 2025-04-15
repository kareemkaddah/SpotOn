import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBopQQGQ8jZJeo5G4FBziuhGSYvlwoRh44',
  authDomain: 'spoton-2025.firebaseapp.com',
  projectId: 'spoton-2025',
  storageBucket: 'spoton-2025.firebasestorage.app',
  messagingSenderId: '743163701933',
  appId: '1:743163701933:web:15287f1de71f689fe0b424',
  measurementId: 'G-WNTHGR15RE',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBopQQGQ8jZJeo5G4FBziuhGSYvlwoRh44",
//   authDomain: "spoton-2025.firebaseapp.com",
//   projectId: "spoton-2025",
//   storageBucket: "spoton-2025.firebasestorage.app",
//   messagingSenderId: "743163701933",
//   appId: "1:743163701933:web:15287f1de71f689fe0b424",
//   measurementId: "G-WNTHGR15RE"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
