// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIzBbut1ZsBU1dxpNtdk7xj2QjPD6RuTQ",
  authDomain: "safetynet-1a1b1c.firebaseapp.com",
  projectId: "safetynet-1a1b1c",
  storageBucket: "safetynet-1a1b1c.appspot.com",
  messagingSenderId: "1031693600561",
  appId: "1:1031693600561:web:04193bac60ae3ac62a1210",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
