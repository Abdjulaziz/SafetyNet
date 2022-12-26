import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIzBbut1ZsBU1dxpNtdk7xj2QjPD6RuTQ",
  authDomain: "safetynet-1a1b1c.firebaseapp.com",
  projectId: "safetynet-1a1b1c",
  storageBucket: "safetynet-1a1b1c.appspot.com",
  messagingSenderId: "1031693600561",
  appId: "1:1031693600561:web:04193bac60ae3ac62a1210",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
