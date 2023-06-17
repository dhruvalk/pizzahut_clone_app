import React from "react";

export default function CartSideBar() {
  return (
    <div className="w-1/4 border border-gray-300 sticky top-0 right-0 h-screen flex flex-col p-2">
      <h1 className="text-xl font-bold w-full text-center mb-4">Cart</h1>
      <div className="flex flex-col gap-2 overflow-auto">
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
      <div className="border-t-2 border-gray-300 mt-6 gap-2 flex flex-col p-2">
        <div className="flex flex-row justify-between items-center">
          <div>Subtotal</div>
          <div>120.22</div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div>Delivery Fee</div>
          <div>5.00</div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="font-bold">Total</div>
          <div>125.22</div>
        </div>
        <button className="bg-green rounded-lg py-2 text-white text-bold">
          Checkout
        </button>
      </div>
    </div>
  );
}

function CartItem() {
  return (
    <div className="flex flex justify-between items-center border border-gray-300 px-4 py-2 rounded-xl">
      <div className="flex flex-col">
        <div>Veggie lovers pizza x 1</div>
        <div className="text-sm italic">Pan</div>
        <div className="text-xs italic">No mushroom, no onion</div>
      </div>
      <div className="flex flex-col text-right">
        <div className="font-bold border-l-2 pl-2 border-gray-300">28.90</div>
      </div>
    </div>
  );
}
