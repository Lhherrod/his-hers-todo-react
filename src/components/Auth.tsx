import { useState } from "react";
import {
  auth,
  // googleProvider
} from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  // signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import Login from "./Login";
import Register from "./Register";

initializeApp;

interface Props {
  onLoggedIn: Function;
}

function Auth({ onLoggedIn }: Props) {
  const [showLogin, setShowLogin] = useState(true);

  const handleAuthView = (e: any) => {
    e.preventDefault();
    showLogin ? setShowLogin(false) : setShowLogin(true);
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onLoggedIn();
    } catch (error: any) {
      setError(error.message)
      setTimeout(() => {setError("")},3000)
      console.error(error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoggedIn();
    } catch (error: any) {
      setError(error.message)
      setTimeout(() => {setError("")},3000)
      console.error(error);
    }
  };

  const [error, setError] = useState("");


  

  // const signInWithGoogle = async () => {
  //   try {
  //     await signInWithPopup(auth, googleProvider);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="w-full sm:w-[400px] px-5 mx-auto mt-16 text-center">
      {showLogin ? (
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-orange-300">
            Login to access todos
          </h2>
          <p className="mb-4 text-indigo-800">
            <span> or </span>
            <a
              href="/src/signup.html"
              className="signup-button"
              onClick={handleAuthView}
            >
              create new one...
            </a>
          </p>
          <h1 className="text-red-500">{error}</h1>
          <Login sendLogin={signIn} />
        </div>
      ) : (
        <div>
          {" "}
          <h2 className="text-2xl font-semibold mb-2 text-orange-300">
            Register to create todos
          </h2>
          <p className="mb-4 text-indigo-800">
            <span> or </span>
            <a
              href="/src/signup.html"
              className="signup-button"
              onClick={handleAuthView}
            >
              already have an account?..
            </a>
          </p>
          <h1 className="text-red-500">{error}</h1>
          <Register sendRegister={signUp} />
        </div>
      )}
      {/* <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={logOutFromGoogle} classNameName="ml-3">
         Logout From Google
      </button> */}
    </div>
  );
}
export default Auth;
