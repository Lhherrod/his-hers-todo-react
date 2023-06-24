import { useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

initializeApp;

interface Props {
  isLoggedIn: Function;
}

function Auth({isLoggedIn}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // console.log(auth?.currentUser?.email);

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      isLoggedIn()
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
    <div className="w-full sm:w-[400px] px-5 mx-auto mt-16 text-center">
      <h2 className="text-2xl font-semibold mb-2 text-orange-300">
        Login to access todos
      </h2>
      {/* <p className="mb-4">
        or{" "}
        <a href="/src/signup.html" className="signup-button">
          create new one
        </a>
      </p> */}
      <div className="mb-3">
        <label className="mr-2 text-orange-300" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Your Email..."
          className="w-full rounded border-orange-300 focus:border-orange-300 focus:ring-orange-300"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="mr-2 text-orange-300" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Your Password..."
          className="w-full rounded border-orange-300 focus:border-orange-300 focus:ring-orange-300"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-between mb-3">
        {/* <div className="flex items-center">
            <label className="mr-2 text-orange-300" htmlFor="remember-me">
              Remember Me
            </label>
            <input
              type="checkbox"
              id="remember-me"
              className="text-orange-300 focus:ring-orange-300"
            />
          </div> */}
        {/* <a
            href="/src/password-reset.html"
            className="text-orange-300 hover:text-orange-200"
          >
            Reset Your Password
          </a> */}
      </div>
      <button 
        className="btn-primary w-full flex items-center justify-center mt-3 bg-purple-800 text-white py-2 px-3 rounded hover:bg-purple-600 active:bg-purple-700 transition-colors shadow-md shadow-[#103];"
        onClick={signIn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
        Login
      </button>
    </div>
    // <div classNameName="mx-auto w-1/2 border border-indigo-500">
    //   <label htmlFor="email" classNameName="mr-2">
    //     email
    //   </label>
    //   <input
    //     type="email"
    //     id="email"
    //     placeholder="Email..."
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <label htmlFor="password" classNameName="mr-2">
    //     password
    //   </label>
    //   <input
    //     type="password"
    //     id="password"
    //     placeholder="Password..."
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <button onClick={signIn}>login</button>
    //   <button onClick={signInWithGoogle}>Sign In With Google</button>
    //   <button onClick={logOut} classNameName="ml-3">
    //     Logout
    //   </button>
    //   <button onClick={logOutFromGoogle} classNameName="ml-3">
    //     Logout From Google
    //   </button>
    // </div>
  );
}
export default Auth;
