import React from "react";
import data from "../mockData.json";
import MenuItem from "../components/MenuItem";
import MenuNavBar from "../components/MenuNavBar";
import CartSideBar from "../components/CartSideBar";

export default function OrderScreen() {
  return (
    <div className="flex w-full relative">
      <div className="w-3/4">
        <MenuNavBar />
        <div className="w-full flex flex-wrap justify-center">
          {data.map((val) => (
            <MenuItem
              title={val.title}
              desc={val.description}
              image_url={val.image_url}
            />
          ))}
        </div>
      </div>
      <CartSideBar />
    </div>
  );
}
