import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="w-full h-full 2xl:w-1/2 m-auto">
      <Navbar />
      <Outlet />
    </div>
  );
}
