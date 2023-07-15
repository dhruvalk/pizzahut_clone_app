import React, { useEffect, useState } from "react";
import {
  getAddressByUser,
  getAllOrderItems,
  getAllUserOrders,
} from "../APIUtils";
import { AiFillClockCircle, AiFillHome } from "react-icons/ai";
import LoadingSpinner from "../components/LoadingSpinner";

export default function TrackScreen() {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateOrders();
  }, []);

  async function updateOrders() {
    setLoading(true);
    const userData = await JSON.parse(localStorage.getItem("user"));
    const data = await getAllUserOrders(userData.userId);
    setOrdersData(data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="flex w-full flex-col mb-24">
      {loading && <LoadingSpinner />}
      <h1 className="bg-red p-8 text-white font-bold text-2xl mb-8">
        All Orders
      </h1>
      {ordersData.length === 0 ? (
        <div className="w-full h-full flex items-center px-4 py-2">
          You have no orders.
        </div>
      ) : (
        <div className="px-4 py-2 flex flex-wrap gap-4">
          {ordersData.map((val) => (
            <OrderItem data={val} />
          ))}
        </div>
      )}
    </div>
  );
}

function OrderItem({ data }) {
  const date = new Date(+data.orderDateTime);
  const [itemData, setItemData] = useState([]);
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    updateItemData();
    fetchAddress();
  }, []);

  async function updateItemData() {
    const response = await getAllOrderItems(data.orderId);
    console.log(response);
    setItemData(response);
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
      }
    }
  };

  return (
    <div className="border flex rounded-lg px-4 py-2 justify-between divide-x w-2/5">
      <div className="flex flex-col pr-3 gap-3">
        <div className="bg-green w-fit px-4 py-1 text-xs text-white font-bold rounded-full">
          {data.orderStatus}
        </div>
        <div className="gap-1 flex flex-col">
          <div className="text-sm flex items-center gap-1">
            <AiFillHome />
            <div>{addresses[data.addressId]}</div>
          </div>
          <div className="text-sm flex items-center gap-1">
            <AiFillClockCircle />
            <div>{date.toDateString() + ", " + date.toLocaleTimeString()}</div>
          </div>
        </div>
        <ul className="text-xs pl-5 list-disc">
          {itemData.map((val) => (
            <li>{`${val.quantity} x ${val.title}, ${val.type}`}</li>
          ))}
        </ul>
      </div>
      <div className="pl-4 flex justify-center items-center">
        ${data.totalAmount.toFixed(2)}
      </div>
    </div>
    // <div className="flex">
    //   <div>_____OrderId:{data.orderId}</div>
    //   <div>_____AddressId:{data.addressId}</div>
    //   <div>_____userId:{data.userId}</div>
    //   <div>_____orderDateTime:{data.orderDateTime}</div>
    //   <div>_____orderStatus:{data.orderStatus}</div>
    //   <div>_____orderType:{data.orderType}</div>
    //   <div>_____totalAmount:{data.totalAmount}</div>
    //   <div>There are {itemData.length} items</div>
    // </div>
  );
}
