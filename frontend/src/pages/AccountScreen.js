import React, { useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  getAddressByUser,
  getUser,
  handleUpdateUser,
  deleteAddress,
} from "../APIUtils";

export default function AccountScreen() {
  const [user, setUser] = useState(null);

  // user details
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [contactNum, setContactNum] = useState(null);
  const [modifiedFirstName, setModifiedFirstName] = useState(firstName);
  const [modifiedLastName, setModifiedLastName] = useState(lastName);
  const [modifiedEmail, setModifiedEmail] = useState(email);
  const [modifiedContactNum, setModifiedContactNum] = useState(contactNum);
  const [isModified, setIsModified] = useState(false);

  // user functions
  const handleFirstNameChange = (event) => {
    setModifiedFirstName(event.target.value);
    setIsModified(true);
  };
  const handleLastNameChange = (event) => {
    setModifiedLastName(event.target.value);
    setIsModified(true);
  };
  const handleEmailChange = (event) => {
    setModifiedEmail(event.target.value);
    setIsModified(true);
  };
  const handleContactNumChange = (event) => {
    setModifiedContactNum(event.target.value);
    setIsModified(true);
  };
  const handleSaveChanges = () => {
    setFirstName(modifiedFirstName);
    setLastName(modifiedLastName);
    setContactNum(modifiedContactNum);
    setEmail(modifiedEmail);
    handleUpdateUser(
      1,
      modifiedFirstName,
      modifiedLastName,
      modifiedEmail,
      user.username,
      user.password,
      user.contactNum,
      user.birthday
    );
    setIsModified(false);
  };

  // address details
  const [addresses, setAddresses] = useState([]);
  const [streets, setStreets] = useState([]);
  const [houseNums, setHouseNums] = useState([]);
  const [labels, setLabels] = useState([]);

  //address functions
  const handleDeleteAddress = (addressId, userId, index) => {
    const newAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(newAddresses);
    deleteAddress(userId, addressId);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(1);
      if (data) {
        let tempUser = data[0];
        setUser(tempUser);
        setFirstName(tempUser.firstName);
        setLastName(tempUser.lastName);
        setEmail(tempUser.email);
        setContactNum(tempUser.contactNum);
      }
    };
    const fetchAddress = async () => {
      const data = await getAddressByUser(1);
      if (data) {
        let tempAddresses = data;
        setAddresses(tempAddresses);
        const tempStreets = [];
        const tempHouseNums = [];
        const tempLabels = [];
        tempAddresses.forEach((address) => {
          tempStreets.push(address.street);
          tempHouseNums.push(address.houseNum);
          tempLabels.push(address.label);
        });

        setStreets(tempStreets);
        setHouseNums(tempHouseNums);
        setLabels(tempLabels);
      }
    };
    fetchUser();
    fetchAddress();
  }, []);

  useEffect(() => {
    setModifiedFirstName(firstName);
    setModifiedLastName(lastName);
    setModifiedEmail(email);
    setModifiedContactNum(contactNum);
    setIsModified(false);
  }, [firstName, lastName, email, contactNum]);

  return (
    <>
      <div className="w-full bg-green text-white h-1/6 justify-center text-5xl p-20 mb-16">
        Hello, {lastName} {firstName}
      </div>
      <div className="flex flex-col items-center h-screen space-y-8 w-3/4 m-auto">
        <div className="border-2 border-grey w-full divide-y divide-solid divide-y-2 bg-zinc-50">
          <div className="p-4 text-xl font-bold">Account details</div>
          <div className="grid gap-6 grid-cols-2 grid-rows- p-6">
            <label for="firstName" className="flex flex-col gap-2 text-lg">
              First Name
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={modifiedFirstName}
                onChange={handleFirstNameChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              ></input>
            </label>
            <label for="lastName" className="flex flex-col gap-2 text-lg">
              Last Name
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={modifiedLastName}
                onChange={handleLastNameChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              ></input>
            </label>
            <label for="email" className="flex flex-col gap-2 text-lg">
              Email
              <input
                type="text"
                id="email"
                name="email"
                value={modifiedEmail}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              ></input>
            </label>
            <label for="phone" className="flex flex-col gap-2 text-lg">
              Mobile Phone
              <input
                type="tel"
                id="phone"
                name="phone"
                value={modifiedContactNum}
                onChange={handleContactNumChange}
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

        <div className="border-2 border-grey w-full divide-y divide-solid divide-y-2 bg-zinc-50">
          <div className="p-4 flex flex-row justify-between ">
            <text className="font-bold text-xl">Addresses</text>
            <AiFillEdit style={{ width: "25px", height: "25px" }} />
          </div>
          {addresses.map((address, index) => (
            <div
              className="w-full flex flex-row justify-between p-4 text-lg"
              key={index}
            >
              <div className="flex flex-row items-center justify-center">
                <IoHome style={{ width: "25px", height: "25px" }} />
                <div className="flex flex-col pl-4">
                  <text className="font-bold ">
                    {streets[index]}, {houseNums[index]}
                  </text>
                  <text>{labels[index]}</text>
                </div>
              </div>
              <div>
                <Link
                  to={`/editAddress/${address.userId}/${address.addressId}`}
                >
                  <button className="hover:underline ">Edit</button>
                </Link>{" "}
                |{" "}
                <button
                  className="hover:underline"
                  onClick={() =>
                    handleDeleteAddress(
                      address.addressId,
                      address.userId,
                      index
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
