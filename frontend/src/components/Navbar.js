import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <navbar className="flex flex-row justify-between px-6 py-4">
      <span>
        <img
          src="https://static.phdvasia.com/sg1/assets/images/logos/logo_mob@x2_A.png"
          className="h-[30px] cursor-pointer"
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
    </navbar>
  );
}
