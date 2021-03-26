import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCrUSioblCkoVqITcq_jXzpgq5ZBm9u9jg",
    authDomain: "crwn-db-1ee88.firebaseapp.com",
    projectId: "crwn-db-1ee88",
    storageBucket: "crwn-db-1ee88.appspot.com",
    messagingSenderId: "383249376739",
    appId: "1:383249376739:web:c2e40cc6920372dba42cd6"
  };

  firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

// this triggers the Google popup whenever we use this Google Auth provider for authentication
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
