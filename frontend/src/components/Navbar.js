import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const signOutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <div className="flex flex-row justify-between px-6 py-4">
      <span>
        <img
          src="https://static.phdvasia.com/sg1/assets/images/logos/logo_mob@x2_A.png"
          className="h-[30px] cursor-pointer"
          alt="logo"
          onClick={() => navigate("/")}
        />
      </span>
      <span className="flex flex-row divide-x-2">
        <div className="px-6 cursor-pointer hover:underline">
          <Link to="/order">Order</Link>
        </div>
        <div className="px-6 cursor-pointer hover:underline">
          <Link to="/profile">My Account</Link>
        </div>
        <div className="px-6 cursor-pointer hover:underline">
          <Link to="/login" onClick={signOutHandler}>
            Sign Out
          </Link>
        </div>
      </span>
    </div>
  ) : (
    <div className="flex flex-row justify-between px-6 py-4" id="navbar">
      <span>
        <img
          src="https://static.phdvasia.com/sg1/assets/images/logos/logo_mob@x2_A.png"
          className="h-[30px] cursor-pointer"
          alt="logo"
          onClick={() => navigate("/")}
        />
      </span>
      <span className="flex flex-row divide-x-2">
        <div className="px-6 cursor-pointer hover:underline">
          <Link to="/order">Order</Link>
        </div>
        <div className="px-6 cursor-pointer hover:underline">
          <Link to="/login">Login</Link>
        </div>
        <div className="px-6 cursor-pointer hover:underline">
          <Link to="/register">Register</Link>
        </div>
        <div className="px-6 cursor-pointer hover:underline">
          <Link to="">Track</Link>
        </div>
      </span>
    </div>
  );
}
