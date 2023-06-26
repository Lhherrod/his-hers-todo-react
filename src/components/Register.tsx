import { useState } from "react";

interface Props {
  sendRegister: (email: string, password: string) => object;
}



export const Register = ({ sendRegister }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmPassword] = useState("");

  const handleSendRegister = () => {
    if(password !== confirmedPassword) {
      return;
    }
    sendRegister(email, password)
  }

  return (
    <>
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
      {password !== confirmedPassword && <h1 className="text-red-500 text-left">The password and password confirmation does not match...</h1>}
      <div className="mb-3">
        <label className="mr-2 text-orange-300" htmlFor="register-password">
          Password
        </label>
        <input
          id="register-password"
          type="password"
          placeholder="Your Password..."
          className="w-full rounded border-orange-300 focus:border-orange-300 focus:ring-orange-300"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="mr-2 text-orange-300" htmlFor="password-confirm">
          Confirm Password
        </label>
        <input
          id="password-confirm"
          type="password"
          placeholder="Your Password...Again..."
          className="w-full rounded border-orange-300 focus:border-orange-300 focus:ring-orange-300"
          onChange={(e) => setConfirmPassword(e.target.value)}
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
      </div>
      <button
        className="btn-primary w-full flex items-center justify-center mt-3 bg-purple-800 text-white py-2 px-3 rounded hover:bg-purple-600 active:bg-purple-700 transition-colors shadow-md shadow-[#103];"
        onClick={() => handleSendRegister()}
      >
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
        Register
      </button>
    </>
  );
};

export default Register;
