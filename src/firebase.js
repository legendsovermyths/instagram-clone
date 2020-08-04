import firebase from "firebase"
const firebaseApp= firebase.initializeApp({
  apiKey: "AIzaSyC5J_jmmxDZdHxAtJArAK8tCpXbmJbyToE",
  authDomain: "instagram-clone-f9fcd.firebaseapp.com",
  databaseURL: "https://instagram-clone-f9fcd.firebaseio.com",
  projectId: "instagram-clone-f9fcd",
  storageBucket: "instagram-clone-f9fcd.appspot.com",
  messagingSenderId: "671516616005",
  appId: "1:671516616005:web:9c45550db92d7a2ac00a2c"
});
const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage= firebase.storage();
export {db,auth,storage}
