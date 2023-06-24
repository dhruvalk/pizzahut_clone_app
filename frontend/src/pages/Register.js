import React, { useEffect, useState } from "react";
import { ReactComponent as FBIcon } from "../assets/FBIcon.svg";
import { ReactComponent as GoogleIcon } from "../assets/GoogleIcon.svg";
import { Link } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");

  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const years = Array.from({ length: 100 }, (_, index) => 2023 - index);
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedPrivacy, setIsCheckedPrivacy] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const handlePrivacyCheckboxChange = (event) => {
    setIsCheckedPrivacy(event.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, pass1, firstName, lastName, phone, gender, pass2);
  };

  useEffect(() => {
    fetch("/menu/all")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-3/4 md:w-1/2 h-screen m-auto">
      <div className="font-bold text-5xl text-left"> Create Account</div>
      <div className="text-left">
        Already have an account? <Link to="/login">Sign In</Link>
      </div>
      <form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          type="text"
          id="email"
          name="email"
          placeholder="Email"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          type="text"
          id="phone"
          name="phone"
          placeholder="Phone Number"
        />
        <input
          value={pass1}
          onChange={(e) => setPass1(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          type="text"
          id="password1"
          name="password1"
          placeholder="Password"
        />
        <input
          value={pass2}
          onChange={(e) => setPass2(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          type="text"
          id="password2"
          name="password2"
          placeholder="Retype Password"
        />
        <label className="flex items-center">
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            name="gender"
            className="ml-5 text-center px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 mt-2"
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </label>
        <label className="flex flex-row space-x-2 items-center w-full ">
          Birthday:
          <div className=" flex flex-row space-x-2 ">
            {/* Day Selection */}
            <select className="ml-5 p-2 border border-gray-300 rounded-md">
              <option value="" disabled selected>
                Day
              </option>
              {days.map((day) => (
                <option key={day}>{day}</option>
              ))}
            </select>

            {/* Month Selection */}
            <select className="p-2 border border-gray-300 rounded-md">
              <option value="" disabled selected>
                Month
              </option>
              {months.map((month) => (
                <option key={month}>{month}</option>
              ))}
            </select>

            {/* Year Selection */}
            <select className="p-2 border border-gray-300 rounded-md">
              <option value="" disabled selected>
                Year
              </option>
              {years.map((year) => (
                <option key={year}>{year}</option>
              ))}
            </select>
          </div>
        </label>
        <div className="flex flex-row items-center justify-center w-full">
          <input
            type="checkbox"
            checked={isCheckedPrivacy}
            onChange={handlePrivacyCheckboxChange}
            className="mr-2"
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
        <FBIcon
          style={{ width: "42px", height: "42px", transition: "fill 0.3s" }}
          className="test"
        />
        <GoogleIcon style={{ width: "42px", height: "42px" }} />
      </div>
    </div>
  );
}
