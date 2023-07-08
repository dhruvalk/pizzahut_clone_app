import React, { useEffect, useState } from "react";
import data from "../mockFoodData.json";
import MenuItem from "../components/MenuItem";
import MenuNavBar from "../components/MenuNavBar";
import CartSideBar from "../components/CartSideBar";
import { getAllMenu } from "../APIUtils";

export default function OrderScreen() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    getAllMenu();
  }, []);

  function addToOrder(title, type, price) {
    const exists = orderData.filter(
      (val) => val.title === title && val.type === type
    );
    if (exists.length !== 0) {
      const newQty = exists[0].qty + 1;
      const newPrice = newQty * price;
      setOrderData((prev) => {
        prev.forEach((val) => {
          if (val.title === title && val.type === type) {
            val.qty = newQty;
            val.price = newPrice;
          }
        });
        return [...prev];
      });
    } else {
      setOrderData((prev) => [
        ...prev,
        { title: title, type: type, price: price, qty: 1 },
      ]);
    }
  }

  const transformedArray = [];
  data.forEach((obj) => {
    const existingItem = transformedArray.find(
      (item) => item.title === obj.title
    );
    if (existingItem) {
      existingItem.types.push(obj.type);
    } else {
      transformedArray.push({ ...obj, types: [obj.type] });
    }
  });

  return (
    <div className="flex w-full relative">
      <div className="w-3/4">
        <MenuNavBar />
        <div className="w-full flex flex-wrap justify-center">
          {transformedArray.map((val) => (
            <MenuItem
              title={val.title}
              desc={val.description}
              image_url={val.photo}
              onClick={addToOrder}
              key={val.itemId}
              types={val.types}
            />
          ))}
        </div>
      </div>
      <CartSideBar data={orderData} setData={setOrderData} />
    </div>
  );
}
