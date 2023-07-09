import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { handleAddAddress } from "../APIUtils";
import { IoIosArrowBack } from "react-icons/io";

export default function CreateAddressScreen() {
  const { userId } = useParams();
  const navigate = useNavigate();
  // user details
  const [address, setAddress] = useState(null);
  const [street, setStreet] = useState(null);
  const [houseNum, setHouseNum] = useState(null);
  const [label, setLabel] = useState(null);
  const [isModified, setIsModified] = useState(false);

  // user functions
  const handleStreetChange = (event) => {
    setStreet(event.target.value);
    setIsModified(true);
  };
  const handleHouseNumChange = (event) => {
    setHouseNum(event.target.value);
    setIsModified(true);
  };
  const handleLabelChange = (event) => {
    setLabel(event.target.value);
    setIsModified(true);
  };

  const handleSaveChanges = () => {
    setIsModified(false);
    handleAddAddress(
      userId,
      street,
      houseNum,
      label,
      //TODO: add in button for default
      false
    );
    navigate("/profile");
  };
  return (
    <>
      <Link
        to="/profile"
        className="flex flex-row text-lg mt-4 items-center px-6"
      >
        <IoIosArrowBack style={{ width: "35px", height: "35px" }} />
        <span className="hover:underline">Back</span>
      </Link>
      <div className="w-3/4 m-auto mt-12">
        <div className=" border-2 border-grey w-full divide-y divide-solid divide-y-2 bg-zinc-50">
          <div className="p-4 text-xl font-bold">Address details</div>
          <div className="grid gap-6 grid-cols-2 grid-rows- p-6">
            <label for="firstName" className="flex flex-col gap-2 text-lg">
              Street
              <input
                type="text"
                id="street"
                name="street"
                value={street}
                onChange={handleStreetChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              ></input>
            </label>
            <label for="houseNum" className="flex flex-col gap-2 text-lg">
              House No.
              <input
                type="text"
                id="houseNum"
                name="houseNum"
                value={houseNum}
                onChange={handleHouseNumChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              ></input>
            </label>
            <label for="label" className="flex flex-col gap-2 text-lg">
              Name this location
              <input
                type="label"
                id="label"
                name="label"
                value={label}
                onChange={handleLabelChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              ></input>
            </label>
          </div>

          {isModified && (
            <button
              className="flex justify-center w-full bg-green hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSaveChanges}
            >
              Create Address
            </button>
          )}
        </div>
      </div>
    </>
  );
}
