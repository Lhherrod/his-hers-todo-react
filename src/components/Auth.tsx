import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

initializeApp;

interface Props {
  color?: String;
}

function Auth({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };
  const logOutFromGoogle = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="mx-auto w-1/2 border border-indigo-500">
      <label htmlFor="email" className="mr-2">
        email
      </label>
      <input
        type="email"
        id="email"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password" className="mr-2">
        password
      </label>
      <input
        type="password"
        id="password"
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>login</button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={logOut} className="ml-3">
        Logout
      </button>
      <button onClick={logOutFromGoogle} className="ml-3">
        Logout From Google
      </button>
    </div>
  );
}

export default Auth;
