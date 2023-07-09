import React, { useEffect, useState } from "react";
import { ImGoogle3 } from "react-icons/im";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { handleSignUp } from "../APIUtils";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [password1Visible, setPassword1Visible] = useState(false);
  const [password2Visible, setPassword2Visible] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedPrivacy, setIsCheckedPrivacy] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const handlePrivacyCheckboxChange = (event) => {
    setIsCheckedPrivacy(event.target.checked);
  };

  const [signInError, setSignInError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!passwordMatch) {
        return;
      }
      const response = await handleSignUp(
        firstName,
        lastName,
        "mock",
        email,
        pass1,
        phone,
        birthday
      );
      // console.log(response);
      if (response.status == 500) {
        setSignInError(true);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (pass2 == pass1) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [pass2]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-3/4 md:w-1/2 h-full mx-auto mt-16">
      <div className="font-bold text-5xl text-left"> Create Account</div>
      {signInError ? (
        <div className="bg-rose-300 px-6 py-2">
          This email address is already associated with an account. If this
          account is yours, you can{" "}
          <Link to="/getmypassword" className="underline italic text-blue-700">
            reset your password.
          </Link>
        </div>
      ) : (
        <div className="text-left">
          Already have an account?{" "}
          <Link to="/login" className="italic text-blue-500 underline">
            Sign In
          </Link>
        </div>
      )}
      <form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          required
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          type="text"
          id="phone"
          name="phone"
          placeholder="Phone Number"
          required
        />
        <div className="relative">
          <input
            value={pass1}
            onChange={(e) => setPass1(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            type={password1Visible ? "text" : "password"}
            id="password1"
            name="password1"
            placeholder="Password"
            required
          />
          {password1Visible ? (
            <AiFillEyeInvisible
              style={{ width: "20px", height: "20px" }}
              onClick={() => setPassword1Visible(!password1Visible)}
              className="absolute right-4 top-2/4 transform -translate-y-2/4"
            ></AiFillEyeInvisible>
          ) : (
            <AiFillEye
              style={{ width: "20px", height: "20px" }}
              onClick={() => setPassword1Visible(!password1Visible)}
              className="absolute right-4 top-2/4 transform -translate-y-2/4"
            ></AiFillEye>
          )}
        </div>
        <div className="relative">
          <input
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
            className={
              passwordMatch
                ? "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                : "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
            }
            type={password2Visible ? "text" : "password"}
            id="password2"
            name="password2"
            placeholder="Retype Password"
            required
          />
          {password2Visible ? (
            <AiFillEyeInvisible
              style={{ width: "20px", height: "20px" }}
              onClick={() => setPassword2Visible(!password2Visible)}
              className="absolute right-4 top-2/4 transform -translate-y-2/4"
            ></AiFillEyeInvisible>
          ) : (
            <AiFillEye
              style={{ width: "20px", height: "20px" }}
              onClick={() => setPassword2Visible(!password2Visible)}
              className="absolute right-4 top-2/4 transform -translate-y-2/4"
            ></AiFillEye>
          )}
        </div>
        {!passwordMatch && (
          <span className="bg-rose-300 px-6 py-2">Passwords do not match!</span>
        )}
        <label className="flex items-center">
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            name="gender"
            className="ml-5 text-center px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 mt-2"
            type="text"
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </label>
        <label className="flex flex-row space-x-4 items-center w-full ">
          Birthday:
          <DatePicker
            selected={birthday}
            type="date"
            onChange={(date) => setBirthday(date)}
            className="ml-4 text-center py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
          />
        </label>
        <div className="flex flex-row items-center justify-center w-full">
          <input
            type="checkbox"
            checked={isCheckedPrivacy}
            onChange={handlePrivacyCheckboxChange}
            className="mr-2"
            required
          />
          <div className="w-full">
            I agree to the Privacy Policy and understand that my information
            will be used as described on this page and the Pizza Hut Privacy
            Policy
          </div>
        </div>
        <div className="flex flex-row items-center justify-center ">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <div className="w-full">
            YES! Sign me up to receive EXCLUSIVE offers and deals from Pizza Hut
            via email and SMS. I agree to the Pizza hut Privacy Policy and Terms
            of Use.
          </div>
        </div>
        <button
          type="submit"
          className="w-full max-w-lg mx-auto bg-green text-white font-bold py-4 px-4 rounded-full border border-green"
        >
          Register
        </button>
      </form>
      <div className="text-center">or you can sign in with</div>
      <div className="flex flex-row w-full items-center justify-center space-x-2">
        <FaFacebook style={{ width: "42px", height: "42px", color: "gray" }} />
        <ImGoogle3 style={{ width: "42px", height: "42px", color: "gray" }} />
      </div>
    </div>
  );
}
