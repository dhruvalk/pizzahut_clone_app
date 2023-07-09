import React, { useState } from "react";

export default function ForgetPasswordScreen() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4 w-3/4 md:w-1/2 m-auto mt-16">
      <div className="font-bold text-5xl text-left"> Reset Password</div>
      <div className="text-left">
        Please enter your email address and we will email you instructions to
        reset your password.
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
        />
        <button
          type="submit"
          className="max-w-lg w-full mx-auto bg-green text-white font-bold py-4 px-4 rounded-full border border-green"
        >
          Reset Password
        </button>
      </form>
      <div>
        If you signed up using Facebook or Google, you will need to reset your
        password with that service.
      </div>
    </div>
  );
}
