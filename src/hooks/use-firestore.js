import { firebaseConfig } from '/config/firebase'
import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const useFirestore = () => firebase.firestore()
export const useFirestoreAuth = () => firebase.auth()
export const googleProvider = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  provider.addScope('profile')
  provider.addScope('email')
  return provider
}

export const addArrayItem = (item) => firebase.firestore.FieldValue.arrayUnion( item )
export const removeArrayItem = (item) => firebase.firestore.FieldValue.arrayRemove( item )
