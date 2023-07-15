import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getAddressByUser, handleUpdateAddress } from "../APIUtils";
import { IoIosArrowBack } from "react-icons/io";

const EditAddressScreen = () => {
  const { userId, addressId } = useParams();
  const navigate = useNavigate();

  // user details
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [houseNum, setHouseNum] = useState("");
  const [label, setLabel] = useState("");
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
    handleUpdateAddress(
      addressId,
      userId,
      street,
      houseNum,
      label,
      //TODO: add in button for default
      false,
      address.createdTime,
      Date.now()
    );
    navigate("/profile");
  };

  const fetchAddress = async () => {
    try {
      const data = await getAddressByUser(userId);
      if (data) {
        let tempAddress = data.find(
          (address) =>
            address.userId === +userId && address.addressId === +addressId
        );
        setAddress(tempAddress);
        setStreet(tempAddress.street);
        setHouseNum(tempAddress.houseNum);
        setLabel(tempAddress.label);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <div className="mb-24">
      <Link
        to="/profile"
        className="flex flex-row text-lg mt-4 items-center px-6"
      >
        <IoIosArrowBack style={{ width: "35px", height: "35px" }} />
        <span className="hover:underline">Back</span>
      </Link>

      <div className="m-auto mt-12 w-5/6 md:w-2/3">
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
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default EditAddressScreen;
