import React, { useState } from "react";
import { ReactComponent as FBIcon } from "../assets/FBIcon.svg";
import { ReactComponent as GoogleIcon } from "../assets/GoogleIcon.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, pass);
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center h-screen w-full">
        {/* <div className="grow h-1/6"></div> */}
        <div className="flex flex-col h-5/6 space-y-4 m-0 p-0">
          <div className="font-bold text-5xl text-left"> Welcome Back</div>
          <div className="text-left">Don't have an account? Sign up</div>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              type="text"
              id="email"
              name="email"
              placeholder="Email"
            />
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              type="text"
              id="password"
              name="password"
              placeholder="Password"
            />
            <button
              type="submit"
              className="w-full max-w-lg bg-green text-white font-bold py-4 px-4 rounded-full border border-green"
            >
              Sign in
            </button>
          </form>
          <div className="text-left">Forgot password?</div>
          <div className="text-center">or you can sign in with</div>
          <div className="flex flex-row w-full items-center justify-center space-x-2">
            <FBIcon
              style={{ width: "42px", height: "42px", transition: "fill 0.3s" }}
              className="test"
            />
            <GoogleIcon style={{ width: "42px", height: "42px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
