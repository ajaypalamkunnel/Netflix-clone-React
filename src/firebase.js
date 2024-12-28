import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyBAa5vpvIYsplRMIsOjf9k6vvCOZvDjESE",
  authDomain: "netflix-clone-5c827.firebaseapp.com",
  projectId: "netflix-clone-5c827",
  storageBucket: "netflix-clone-5c827.firebasestorage.app",
  messagingSenderId: "1039291651290",
  appId: "1:1039291651290:web:cee34777e99bcc008bc1e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


const signup = async (name,email,password)=>{
    try {
            const res = await createUserWithEmailAndPassword(auth,email,password)
            const user = res.user;
            await addDoc(collection(db,"user"),{
                uid:user.uid,
                name,
                auth:"local",
                email
            })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}


const login = async (email,password)=>{
    try {
      await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
        
    }
}


const logout =()=>{
    signOut(auth)
}


export {auth,db,login,signup,signOut,logout}