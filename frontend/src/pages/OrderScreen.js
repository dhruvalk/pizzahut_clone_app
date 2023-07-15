import React, { useEffect, useState } from "react";
// import data from "../mockFoodData.json";
import MenuItem from "../components/MenuItem";
import MenuNavBar from "../components/MenuNavBar";
import CartSideBar from "../components/CartSideBar";
import { getAllMenu } from "../APIUtils";
import LoadingSpinner from "../components/LoadingSpinner";

export default function OrderScreen() {
  const [orderData, setOrderData] = useState([]);
  const [allMenuData, setAllMenuData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("pizza");

  useEffect(() => {
    updateMenu();
    const cartData = localStorage.getItem("cartData");
    if (cartData && cartData.length !== 0) setOrderData(JSON.parse(cartData));
  }, []);

  useEffect(() => {
    if (orderData.length !== 0)
      localStorage.setItem("cartData", JSON.stringify(orderData));
  }, [orderData]);

  async function updateMenu() {
    setLoading(true);
    const fetchedData = await getAllMenu();
    setAllMenuData(fetchedData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  function addToOrder(itemId, title, type, price) {
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
        { itemId: itemId, title: title, type: type, price: price, qty: 1 },
      ]);
    }
  }

  return (
    <div className="flex w-full relative mb-24">
      {loading && <LoadingSpinner />}
      <div className="w-3/4">
        <MenuNavBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {selectedTab === "Pizza" ? (
          <div className="w-full flex flex-wrap justify-center">
            {allMenuData.map((val) => (
              <MenuItem
                title={val.title}
                desc={val.description}
                image_url={val.photo}
                onClick={addToOrder}
                key={val.itemID}
                id={val.itemID}
              />
            ))}
          </div>
        ) : (
          <div className="text-lg font-bold w-full py-4 flex justify-center items-center">
            Stay tuned! More coming soon...
          </div>
        )}
      </div>
      <CartSideBar data={orderData} setData={setOrderData} />
    </div>
  );
}
