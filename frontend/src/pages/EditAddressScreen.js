import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditAddressScreen = (props) => {
  const { id } = useParams;

  // TODO: implement API for address
  const mockAddress = {
    addressId: 123,
    street: "Sesame Street",
    houseNum: 123,
    label: "Home",
    isDefault: true,
    createdDateTime: "01/01/11",
    modifiedDateTime: "",
  };
  // user details
  const [street, setStreet] = useState(mockAddress.street);
  const [houseNum, setHouseNum] = useState(mockAddress.houseNum);
  const [label, setLabel] = useState(mockAddress.label);

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
    // TODO: send to backend
  };

  useEffect(() => {
    setModifiedStreet(street);
    setModifiedHouseNum(houseNum);
    setModifiedLabel(label);
    setIsModified(false);
  }, [street, houseNum, label]);

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
