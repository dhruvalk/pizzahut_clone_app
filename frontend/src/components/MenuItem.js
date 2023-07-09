import React, { useEffect, useState } from "react";
import { getItemPrices } from "../APIUtils";

export default function MenuItem({ title, desc, image_url, onClick, id }) {
  function onClickHandler() {
    onClick(title, type, price);
  }
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [allPricesData, setAllPricesData] = useState([]);

  useEffect(() => {
    getAllItemData();
  }, []);

  async function getAllItemData() {
    const data = await getItemPrices(id);
    setAllPricesData(data);
    if (data.length !== 0) {
      setType(data[0].type);
      setPrice(data[0].price);
    }
  }

  function typeChangeHandler(e) {
    setType(e.target.value);
    const price = allPricesData.filter((val) => val.type === e.target.value)[0]
      .price;
    setPrice(price);
  }

  return (
    <div className="border border-gray-300 m-2 w-1/5 rounded-md flex flex-col justify-between items-center pb-4 shadow-md">
      <section>
        <div className="overflow-hidden">
          <img
            src={image_url}
            className="object-contain hover:scale-110 transition-all"
            alt="food"
          />
        </div>
        <div className="p-4">
          <div className="font-semibold mb-4">{title}</div>
          <div className="text-sm">{desc}</div>
        </div>
      </section>
      <section className="w-full text-center px-4">
        <label htmlFor="pizzaOptions" className="font-semibold text-left">
          Choose a size and crust:
        </label>
        <select
          name="pizzaOptions"
          className="border border-gray-300 w-full mt-2 py-1 px-2 rounded-md text-sm"
          value={type}
          onChange={typeChangeHandler}
        >
          {allPricesData.map((val) => (
            <option value={val.type} key={val.itemID + val.type}>
              {val.type}
            </option>
          ))}
        </select>
        <button
          className="w-full bg-green rounded-lg py-1 font-semibold text-white text-sm mt-6 flex justify-between items-center px-3"
          onClick={onClickHandler}
        >
          <div>Add</div>
          <div>${price}</div>
        </button>
      </section>
    </div>
  );
}
