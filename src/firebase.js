// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4qdRyEkwZEIdqwW464-OfkovuGP9OtEw",
  authDomain: "personal-finance-app-4d7f2.firebaseapp.com",
  projectId: "personal-finance-app-4d7f2",
  storageBucket: "personal-finance-app-4d7f2.appspot.com",
  messagingSenderId: "442064332511",
  appId: "1:442064332511:web:8b7caa56bc2ffc7d3fab6a",
  measurementId: "G-3QJ6Y9FR2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();

export {db, auth, provider, doc, setDoc};
