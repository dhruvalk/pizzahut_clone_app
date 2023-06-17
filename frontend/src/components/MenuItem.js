import React from "react";

export default function MenuItem({ title, desc, image_url }) {
  return (
    <div className="border border-gray-300 m-2 w-1/5 rounded-md flex flex-col justify-between items-center pb-4 shadow-md">
      <section>
        <div className="overflow-hidden">
          <img
            src={image_url}
            className="object-contain hover:scale-110 transition-all"
          />
        </div>
        <div className="p-4">
          <div className="font-semibold mb-4">{title}</div>
          <div className="text-sm">{desc}</div>
        </div>
      </section>
      <section className="w-full text-center px-4">
        <label for="pizzaOptions" className="font-semibold text-left">
          Choose a size and crust:
        </label>
        <select
          name="pizzaOptions"
          className="border border-gray-300 w-full mt-2 py-1 px-2 rounded-md text-sm"
        >
          <option value="large">Large</option>
        </select>
        <button className="w-full bg-green rounded-lg py-1 font-semibold text-white text-sm mt-6">
          Add
        </button>
      </section>
    </div>
  );
}
