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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    // get displayName & email from big userAuth object
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    //If snapshot doesn't exist, create it. The `.set` method does async request to db to store data.
    try {
      await userRef.set({
        displayName, 
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  
  return userRef;
};



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// this triggers the Google popup whenever we use this Google Auth provider for authentication
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
