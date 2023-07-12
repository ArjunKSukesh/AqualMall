// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase  configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg_PO6C-2bktVqzCDTIFYF-byI0Sl5DBY",
  authDomain: "aquamall-44ed5.firebaseapp.com",
  projectId: "aquamall-44ed5",
  storageBucket: "aquamall-44ed5.appspot.com",
  messagingSenderId: "546952308834",
  appId: "1:546952308834:web:ed98cda3f8be7e7f32c93b"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
const auth=firebase.auth();
const db=firebase.firestore();
export{db,auth}
export default firebase;