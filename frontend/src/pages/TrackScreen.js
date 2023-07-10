import React, { useEffect, useState } from "react";
import { getAllOrderItems, getAllUserOrders } from "../APIUtils";
import { AiFillClockCircle, AiFillHome } from "react-icons/ai";

export default function TrackScreen() {
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    updateOrders();
  }, []);

  async function updateOrders() {
    const userData = await JSON.parse(localStorage.getItem("user"));
    const data = await getAllUserOrders(userData.userId);
    setOrdersData(data);
  }

  return (
    <div className="flex w-full flex-col">
      <h1 className="bg-red py-2 px-4 text-white font-bold text-2xl">
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
  useEffect(() => {
    updateItemData();
  }, []);

  async function updateItemData() {
    const response = await getAllOrderItems(data.orderId);
    console.log(response);
    setItemData(response);
  }
  return (
    <div className="border flex rounded-lg px-4 py-2 justify-between divide-x">
      <div className="flex flex-col pr-3 gap-3">
        <div className="bg-green w-fit px-4 py-1 text-xs text-white font-bold rounded-full">
          {data.orderStatus}
        </div>
        <div className="gap-1 flex flex-col">
          <div className="text-sm flex items-center gap-1">
            <AiFillHome />
            <div>12 Marine Parade Drive, #07-11, S479238</div>
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
