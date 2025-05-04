import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc , collection, getDocs, writeBatch, query} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyALjDqnPkliKJZ_QVG1-Q-fPiGrQwkmQDw",
  authDomain: "upshop-db.firebaseapp.com",
  projectId: "upshop-db",
  storageBucket: "upshop-db.firebasestorage.app",
  messagingSenderId: "708446535356",
  appId: "1:708446535356:web:994ac0c17d78c986a29ab9",
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

const auth = getAuth(app);

const signInWithGPopup = () => signInWithPopup(auth, googleProvider);

const signInWithGRedirect = () => signInWithRedirect(auth, googleProvider);

const signUserOut = () => signOut(auth);

const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);  

const addCollectionAndDocs = async(collectionKey, dataToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  dataToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('Done');
}

const getCategoriesAndDoc = async() => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshop = await getDocs(q);

  const categoriesMap = querySnapshop.docs.reduce((acc , docSnapShot) => {
    const {title, items} = docSnapShot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  } , {});

  return categoriesMap

}

const retrieveAllDocs = async() => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);


 const result =  querySnapshot.docs.map((doc) => {
     return doc.data();
  });
  return result
}


const db = getFirestore(app);

const createUserDocFromSignIn = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (userSnapShot.exists()) {
    return userDocRef;
  } else {
    const { displayName, email, photoURL} = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        createdAt,
        displayName,
        email,
        photoURL
      });
    } catch (error) {
      console.log("user could not be created", error.message);
    }
  }
};

const createUserWithTraditionalMethod = async(email, password, displayName) => {
  if(!email || !password) return;
 return await createUserWithEmailAndPassword(auth, email, password, displayName)

}

const signInUser = async(email, password) => {
  if(!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password)
}


// const retrieveUserFromUserData = async(userAuth) => {
//   const userDocRef = doc(db, "users", userAuth.uid);
//   const userSnapShot = await getDoc(userDocRef);
//   console.log(userSnapShot)
// }

const retrieveUserFromUsersCollection = () => getDocs(collection(db, "users"));
const retrieveUserFromCollection = (userAuth) => doc(db, "users", userAuth.uid);

export {
  auth,
  db,
  signInWithGPopup,
  createUserDocFromSignIn,
  signInWithGRedirect,
  getRedirectResult,
  createUserWithTraditionalMethod,
  signInUser,
  retrieveUserFromUsersCollection,
  retrieveUserFromCollection,
  signUserOut,
  onAuthStateChangedListener,
  addCollectionAndDocs,
  getCategoriesAndDoc,
  retrieveAllDocs
};
