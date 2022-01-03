import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC6BSGPQXHPVrqEpSYHZSDOc9x-zRoHO6M",
  authDomain: "team-6adf2.firebaseapp.com",
  projectId: "team-6adf2",
  storageBucket: "team-6adf2.appspot.com",
  messagingSenderId: "102327140491",
  appId: "1:102327140491:web:ae2befc19899efa25cd48e"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };