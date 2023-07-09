import React, { useEffect, useState } from "react";
import { getAllUserOrders } from "../APIUtils";

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
    <div>
      <div>Track screen</div>
      <div>Orders info:</div>
      {ordersData.map((val) => (
        <div className="flex" key={val.orderId}>
          <div>_____OrderId:{val.orderId}</div>
          <div>_____AddressId:{val.addressId}</div>
          <div>_____userId:{val.userId}</div>
          <div>_____orderStatus:{val.orderStatus}</div>
          <div>_____orderType:{val.orderType}</div>
          <div>_____totalAmount:{val.totalAmount}</div>
        </div>
      ))}
    </div>
  );
}
