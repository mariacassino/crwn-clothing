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


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef)

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    /* collectionRef.doc() tells Firebase to give us a new document reference in this collection and randomly 
    generate an ID. If for instance you wanted to assign the name of the obj as the obj's ID, you could do 
    `collectionRef.doc(obj.title)` instead */
    const newDocRef = collectionRef.doc();
    /* loop through objects, and for each one pass in document reference (newDocRef), and the value 
    we want to set it to (obj)  */
    batch.set(newDocRef, obj);
  });
  
  /* batch.commit() fires off our batch call, but returns a promise; when commit succeeds, it will come 
  back and resolve a a void (null) value This is useful bc if we call addCollectionAndDocuments somewhere 
  else, we can chain off of it and call `.then` and then do something if this call succeeds, or we can handle errors.
  
  We return `await` bc this is an async function
  */
  // return await batch.commit();
};

/* convert `collections` snapshot from array to object */
export const convertCollectionsSnapshotToMap = (collections) => {
  /* `collection.docs` will give us the querySnapshot array. We map over it and for each document object (`doc`) 
  in the array we collect the title and items properties from the data  */
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    /* `encoreURI` is a JS method where you pass it a string, and it returns a string where any chars that a URL cant
    handle (like spaces etc.) it converts them into a URL-readable version  */
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });
  
  /* should turn the collection into something like {'hats': {hats_collection}, 'shoes': {shoes_collection}} etc. */
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// this triggers the Google popup whenever we use this Google Auth provider for authentication
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
