import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/performance";

// firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// });

const firebaseConfig = {
  apiKey: "AIzaSyB2trxBuBY0EsrpIGHBiZVVnGxGxMyw3x0",
  authDomain: "spectrenoc-b81f8.firebaseapp.com",
  databaseURL: "https://spectrenoc-b81f8-default-rtdb.firebaseio.com",
  projectId: "spectrenoc-b81f8",
  storageBucket: "spectrenoc-b81f8.appspot.com",
  messagingSenderId: "1061834855962",
  appId: "1:1061834855962:web:ecdccdb3b8762fc936a3a3"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const performance = firebase.performance();

export let analytics;

if (process.env.NODE_ENV !== "test") {
  analytics = firebase.analytics();
}
