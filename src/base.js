import firebase from "firebase";

// configure the firebase app
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
};

// init firebase app
export const firebaseApp = firebase.initializeApp(config);

// initialise database and auth interfaces
export const db = firebaseApp.database(); // the realtime database
export const auth = firebaseApp.auth(); // the firebase auth namespace

// localStorage default key
export const storageKey = "KEY_FOR_LOCAL_STORAGE";

// check for auth
export const isAuthenticated = () =>
  !!auth.currentUser || !!localStorage.getItem(storageKey);

// check for verification
export const isVerified = () => {
  if (auth.currentUser) {
    return auth.currentUser.emailVerified;
  }
  return false;
};

// function to set a local storage key for login Processing
export const loginProcessing = () => {
  localStorage.setItem("loginProcessing", true);
};
