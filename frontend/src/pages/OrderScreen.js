import React from "react";
import data from "../mockData.json";
import MenuItem from "../components/MenuItem";
import MenuNavBar from "../components/MenuNavBar";

export default function OrderScreen() {
  return (
    <div className="flex w-full relative">
      <div className="w-3/4">
        <MenuNavBar />
        <div className="w-full flex flex-wrap justify-center">
          {data.map((val) => (
            <MenuItem title={val.title} desc={val.description} />
          ))}
        </div>
      </div>
      <div className="w-1/4 border border-gray-300 sticky top-0 right-0 h-screen">
        Cart section
      </div>
    </div>
  );
}
