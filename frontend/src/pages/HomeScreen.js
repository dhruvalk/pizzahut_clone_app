import React, { useState } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

export default function HomeScreen() {
  const [delivery, setDelivery] = useState(true);
  const toggleActiveTab = () => setDelivery((prev) => !prev);
  return (
    <div className="h-full w-full">
      <div className="w-full text-center h-1/3 mt-[50px]">
        <img
          className="object-cover h-[350px]"
          src="https://static.phdvasia.com/sg1/banners/phdv-1686763208184-PH_Hut-Melts%2723_FCDS_Homepage-Header_Desktop_1843x400_FAp-01.jpg"
        />
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="bg-white shadow-lg border border-gray-300 rounded-lg p-4 w-1/3 -translate-y-[50%] flex flex-col justify-center items-center gap-6">
          <div className="flex flex-row w-full justify-center items-center">
            <div
              className={`font-semibold cursor-pointer flex flex-1 justify-center items-center w-full px-4 py-2 rounded-lg transition-all ${
                delivery && "bg-green text-white"
              }`}
              onClick={toggleActiveTab}
            >
              Delivery
            </div>
            <div
              className={`font-semibold cursor-pointer flex flex-1 justify-center items-center w-full px-4 py-2 rounded-lg transition-all ${
                !delivery && "bg-green text-white"
              }`}
              onClick={toggleActiveTab}
            >
              Self-Collect
            </div>
          </div>
          <div className="flex flex-row w-full justify-center items-center gap-4">
            <input
              placeholder="Enter address or postal code"
              className="w-full border border-gray-300 px-4 py-2 rounded-xl"
            />
            <BsFillArrowRightCircleFill
              size={30}
              className="cursor-pointer text-green hover:text-lime-700"
              onClick={() => alert("popup to select store location")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
