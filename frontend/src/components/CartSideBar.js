import React, { useEffect, useState } from "react";
import {
  AiOutlineShoppingCart,
  AiFillDelete,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { addItemsToOrder, createNewOrder, getAddressByUser } from "../APIUtils";
import { BsCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function CartSideBar({ data, setData }) {
  const [total, setTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(5);
  const [status, setStatus] = useState("Checkout");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddress();
  }, []);

  useEffect(() => {
    const prices = data.map((val) => val.price);
    const tempTotal = prices.reduce((a, b) => a + b, 0);
    setTotal(tempTotal);
  }, [data]);

  function deleteHandler(title, type) {
    setData((prev) =>
      prev.filter((val) => !(val.title === title && val.type === type))
    );
  }

  function reduceQtyHandler(title, type) {
    const obj = data.filter(
      (val) => val.title === title && val.type === type
    )[0];
    const newQty = obj.qty - 1;
    if (newQty === 0) {
      deleteHandler(title, type);
    } else {
      const newPrice = (obj.price / obj.qty) * newQty;
      setData((prev) => {
        prev.forEach((val) => {
          if (val.title === title && val.type === type) {
            val.qty = newQty;
            val.price = newPrice;
          }
        });
        return [...prev];
      });
    }
  }

  function addQtyHandler(title, type) {
    const obj = data.filter(
      (val) => val.title === title && val.type === type
    )[0];
    const newQty = obj.qty + 1;
    const newPrice = (obj.price / obj.qty) * newQty;
    setData((prev) => {
      prev.forEach((val) => {
        if (val.title === title && val.type === type) {
          val.qty = newQty;
          val.price = newPrice;
        }
      });
      return [...prev];
    });
  }

  async function checkoutHandler() {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login");
      return;
    } else {
      console.log(userData);
      setStatus("Placing order...");
      const response = await createNewOrder(
        1,
        selectedAddressId,
        userData.userId,
        Date.now(),
        total + deliveryFee,
        "Ordered",
        "Delivery"
      );
      if (response.orderId) {
        localStorage.removeItem("cartData");
        const orderItemsData = [];
        data.forEach((val) => {
          orderItemsData.push({
            itemId: val.itemId,
            title: val.title,
            orderId: response.orderId,
            quantity: val.qty,
            comments: "",
            type: val.type,
          });
        });
        addItemsToOrder(orderItemsData);
      }
      setTimeout(() => {
        setStatus("Order Placed!");
        setTimeout(() => {
          navigate("/track");
        }, 2000);
      }, 1000);
    }
  }

  const fetchAddress = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userId = user.userId;

      const data = await getAddressByUser(userId);
      if (data) {
        const res = data.map(
          (address) => `${address.street}, ${address.houseNum}`
        );
        setAddresses(res);
        setSelectedAddressId(0);
        console.log(addresses);
      }
    }
  };

  function addressChangeHandler(e) {
    setSelectedAddressId(e.target.value);
  }

  return (
    <div className="w-1/4 border border-gray-300 sticky top-0 right-0 h-screen flex flex-col p-2">
      <h1 className="text-xl font-bold w-full text-center mb-4">Cart</h1>
      {total === 0 ? (
        <div className="flex justify-center flex-col gap-4 items-center h-full">
          <AiOutlineShoppingCart size={100} />
          <h6>Your cart is currently empty!</h6>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 overflow-auto">
            {data.map((entry) => (
              <CartItem
                title={entry.title}
                key={entry.title + entry.type}
                type={entry.type}
                qty={entry.qty}
                price={entry.price}
                deleteHandler={deleteHandler}
                addHandler={addQtyHandler}
                removeHandler={reduceQtyHandler}
              />
            ))}
          </div>

          <div className="border-t-2 border-gray-300 mt-6 gap-2 flex flex-col p-2">
            {addresses.length !== 0 && (
              <div className="text-sm py-2">
                Deliver to:
                <select
                  name="addressOptions"
                  value={selectedAddressId}
                  onChange={addressChangeHandler}
                  className="border border-gray-300 w-full py-1 rounded-md text-sm"
                >
                  {addresses.map((address, index) => (
                    <option value={index} key={address}>
                      {address}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex flex-row justify-between items-center">
              <div>Subtotal</div>
              <div>{total.toFixed(2)}</div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div>Delivery Fee</div>
              <div>{deliveryFee.toFixed(2)}</div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="font-bold">Total</div>
              <div>{(total + deliveryFee).toFixed(2)}</div>
            </div>
            <button
              className="bg-green rounded-lg py-2 text-white text-bold flex items-center justify-center"
              onClick={checkoutHandler}
            >
              {status === "Placing order..." && (
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {status === "Order Placed!" && (
                <BsCheckCircleFill className="mr-2" />
              )}
              {status}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function CartItem({
  title,
  type,
  price,
  qty,
  deleteHandler,
  addHandler,
  removeHandler,
}) {
  return (
    <div className="flex flex justify-between items-center border border-gray-300 px-4 py-2 rounded-xl">
      <div className="flex flex-col">
        <div>
          {title} x {qty}
        </div>
        <div className="text-sm italic">{type}</div>
        <div className="text-xs italic">No mushroom, no onion</div>
        <div className="flex gap-2 pt-3">
          <AiFillDelete
            className="cursor-pointer hover:scale-110"
            color="red"
            size={18}
            onClick={() => deleteHandler(title, type)}
          />
          <AiFillPlusCircle
            className="cursor-pointer hover:scale-110"
            color="green"
            size={18}
            onClick={() => addHandler(title, type)}
          />
          <AiFillMinusCircle
            className="cursor-pointer hover:scale-110"
            color="red"
            size={18}
            onClick={() => removeHandler(title, type)}
          />
        </div>
      </div>
      <div className="flex flex-col text-right">
        <div className="font-bold border-l-2 pl-2 border-gray-300">
          {price.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
