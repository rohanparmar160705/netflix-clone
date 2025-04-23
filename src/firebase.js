import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBENKVP-Vmc9uSMQJxl4ZnzBqfLi3Sfojg",
  authDomain: "netflixclonex.firebaseapp.com",
  projectId: "netflixclonex",
  storageBucket: "netflixclonex.appspot.com",
  messagingSenderId: "1038082934430",
  appId: "1:1038082934430:web:0a0aad04c386b55efa9d8f",
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { auth };
export default db; 