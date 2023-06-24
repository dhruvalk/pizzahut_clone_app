import React, { useState } from "react";
import { ImGoogle3 } from "react-icons/im";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, pass);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 w-3/4 md:w-1/2 m-auto">
      <div className="font-bold text-5xl text-left"> Welcome Back</div>
      <div className="text-left">
        Don't have an account?{" "}
        <Link to="/register" className="italic text-blue-500 underline">
          Sign up
        </Link>
      </div>
      <form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className=" px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className="max-w-lg w-full mx-auto bg-green text-white font-bold py-4 px-4 rounded-full border border-green"
        >
          Sign in
        </button>
      </form>
      <Link to="/getmypassword" className="italic font-bold underline ">
        Forgot password?
      </Link>
      <div className="text-center">or you can sign in with</div>
      <div className="flex flex-row w-full items-center justify-center space-x-2">
        <FaFacebook style={{ width: "42px", height: "42px", color: "gray" }} />
        <ImGoogle3 style={{ width: "42px", height: "42px", color: "gray" }} />
      </div>
    </div>
  );
}
