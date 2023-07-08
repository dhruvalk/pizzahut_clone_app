import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAddressByUser, handleUpdateAddress } from "../APIUtils";

const EditAddressScreen = () => {
  const { userId, addressId } = useParams();

  // user details
  const [address, setAddress] = useState(null);
  const [street, setStreet] = useState(null);
  const [houseNum, setHouseNum] = useState(null);
  const [label, setLabel] = useState(null);

  const [modifiedStreet, setModifiedStreet] = useState(street);
  const [modifiedHouseNum, setModifiedHouseNum] = useState(houseNum);
  const [modifiedLabel, setModifiedLabel] = useState(label);

  const [isModified, setIsModified] = useState(false);

  // user functions
  const handleStreetChange = (event) => {
    setModifiedStreet(event.target.value);
    setIsModified(true);
  };
  const handleHouseNumChange = (event) => {
    setModifiedHouseNum(event.target.value);
    setIsModified(true);
  };
  const handleLabelChange = (event) => {
    setModifiedLabel(event.target.value);
    setIsModified(true);
  };

  const handleSaveChanges = () => {
    setStreet(modifiedStreet);
    setHouseNum(modifiedHouseNum);
    setLabel(modifiedLabel);
    setIsModified(false);
    handleUpdateAddress(
      addressId,
      userId,
      modifiedStreet,
      modifiedHouseNum,
      modifiedLabel,
      //TODO: add in button for default
      false,
      address.createdTime,
      Date.now()
    );
  };

  useEffect(() => {
    setModifiedStreet(street);
    setModifiedHouseNum(houseNum);
    setModifiedLabel(label);
    setIsModified(false);
  }, [street, houseNum, label]);

  useEffect(() => {
    const fetchAddress = async () => {
      const data = await getAddressByUser(userId);
      if (data) {
        let tempAddress = data.find(
          (address) =>
            address.userId == userId && address.addressId == addressId
        );
        setAddress(tempAddress);
        setStreet(tempAddress.street);
        setHouseNum(tempAddress.houseNum);
        setLabel(tempAddress.label);
      }
    };
    fetchAddress();
  }, []);

  return (
    <div className="w-3/4 m-auto mt-16">
      <div className=" border-2 border-grey w-full divide-y divide-solid divide-y-2 bg-zinc-50">
        <div className="p-4 text-xl font-bold">Address details</div>
        <div className="grid gap-6 grid-cols-2 grid-rows- p-6">
          <label for="firstName" className="flex flex-col gap-2 text-lg">
            Street
            <input
              type="text"
              id="street"
              name="street"
              value={modifiedStreet}
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
              value={modifiedHouseNum}
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
              value={modifiedLabel}
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
  );
};
export default EditAddressScreen;
