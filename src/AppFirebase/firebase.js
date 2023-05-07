// Import the functions you need from the SDKs you need
import { getApp, initializeApp }from 'firebase/app'
import { getFirestore } from '@firebase/firestore';
import { getDoc,setDoc, collection ,doc,updateDoc,arrayUnion,arrayRemove} from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// Initialize Firebase

const initFirebaseApp =()=>{
  try {
    return getApp()
  } catch (error) {
    return initializeApp(firebaseConfig);
  }
}
const app = initFirebaseApp();

export const auth = getAuth(app);
export const firestoreDB = getFirestore(app);

//=======
//CREATE DOC FOR USER BY UID
//=======

export const createUserFirebaseDB = async(uid) => {
   // Firebase creates this automatically
  let data = {movies:[]};
  let moviesRef = collection(firestoreDB, 'movies')
  // console.log('uidDB',uid)
  // console.log('dataDB',data)
  try {
   await setDoc(doc(moviesRef,uid), data);
  } catch (err) {
    console.log(err);
  }
};

//=======
//GET DOC  USER BY UID
//=======

export const  retreiveUserFirebaseDB = async(uid) => {
  // console.log('retreive',uid)
  const moviesRef = doc(firestoreDB, 'movies',uid);
  const movieSnapshot = await getDoc(moviesRef);
  const movieList = movieSnapshot.data().movies;
  return movieList;
}

//=======
//UPDATE DOC FOR USER BY UID
//=======

export const handleUpdateFirebase = async(movie,uid)=>{
  const moviesRef = doc(firestoreDB, "movies",uid);

// update movies array with arrayUnion
    await updateDoc(moviesRef, {
      movies:arrayUnion(movie)
    });
};

export const handleDeleteFromFirebase = async(movie, uid) =>{
  
  console.log("remove is done");
  const moviesRef = doc(firestoreDB, "movies",uid);
 
  await updateDoc(moviesRef,{
    'movies': arrayRemove(movie)
  });
 
}
