import React, { useEffect, useState } from "react";
import { ImGoogle3 } from "react-icons/im";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { handleLogIn } from "../APIUtils";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { user, token } = await handleLogIn(email, pass);
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/order");
      navigate(0);
    } else {
      setLoginFail(true);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4 w-3/4 md:w-1/2 m-auto mt-16 mb-24">
      {loading && <LoadingSpinner />}
      <div className="font-bold text-4xl md:text-5xl text-left">
        {" "}
        Welcome Back
      </div>
      <div className="text-left">
        Don't have an account?{" "}
        <Link to="/register" className="italic text-blue-500 underline">
          Sign up
        </Link>
      </div>
      {loginFail ? (
        <div className="bg-rose-300 px-6 py-2">
          Sorry, unrecognized email or password. Have you forgotten your
          password?
        </div>
      ) : (
        <></>
      )}
      <form
        className="flex flex-col space-y-4 w-3/4 md:w-1/2"
        onSubmit={handleSubmit}
      >
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
        <div className="relative">
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            required
          />
          {passwordVisible ? (
            <AiFillEyeInvisible
              style={{ width: "20px", height: "20px" }}
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-4 top-2/4 transform -translate-y-2/4"
            ></AiFillEyeInvisible>
          ) : (
            <AiFillEye
              style={{ width: "20px", height: "20px" }}
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-4 top-2/4 transform -translate-y-2/4"
            ></AiFillEye>
          )}
        </div>
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
