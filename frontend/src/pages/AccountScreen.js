import React, { useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  getAddressByUser,
  getUser,
  handleUpdateUser,
  deleteAddress,
} from "../APIUtils";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import LoadingSpinner from "../components/LoadingSpinner";

export default function AccountScreen() {
  const [user, setUser] = useState(null);

  // user details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [isModified, setIsModified] = useState(false);

  // user functions
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setIsModified(true);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setIsModified(true);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsModified(true);
  };
  const handleContactNumChange = (event) => {
    setContactNum(event.target.value);
    setIsModified(true);
  };
  const handleSaveChanges = () => {
    handleUpdateUser(
      1,
      firstName,
      lastName,
      email,
      user.username,
      user.password,
      contactNum,
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

  const getUserId = () => {
    try {
      const userJson = localStorage.getItem("user");
      const user = JSON.parse(userJson);
      const userId = user.userId;
      return userId;
    } catch (error) {
      console.log(error);
    }
  };

  const userId = getUserId();

  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const data = await getUser(userId);
      if (data) {
        let tempUser = data;
        setUser(tempUser);
        setFirstName(tempUser.firstName);
        setLastName(tempUser.lastName);
        setEmail(tempUser.email);
        setContactNum(tempUser.contactNum);
      }
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const fetchAddress = async () => {
    const userId = getUserId();
    const data = await getAddressByUser(userId);
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

  useEffect(() => {
    fetchUser();
    fetchAddress();
  }, []);

  return (
    <div className="mb-24">
      {loading && <LoadingSpinner />}
      <div className="w-full bg-red text-white h-1/6 justify-center text-2xl font-bold p-8 mb-8">
        Hello, {firstName}
      </div>
      <div className="flex flex-col items-center h-screen space-y-8 w-3/4 m-auto">
        <div className="border-2 border-grey w-full divide-y divide-solid divide-y-2 bg-zinc-50">
          <div className="p-4 text-lg font-bold">Account details</div>
          <div className="grid gap-6 grid-cols-2 grid-rows- p-6">
            <label className="flex flex-col gap-2 text-base">
              First Name
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={handleFirstNameChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              ></input>
            </label>
            <label className="flex flex-col gap-2 text-base">
              Last Name
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={handleLastNameChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              ></input>
            </label>
            <label className="flex flex-col gap-2 text-base">
              Email
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              ></input>
            </label>
            <label className="flex flex-col gap-2 text-base">
              Mobile Phone
              <input
                type="tel"
                id="phone"
                name="phone"
                value={contactNum}
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
            <div className="font-bold text-lg">Addresses</div>
            <Link to={`/createAddress/${userId}`}>
              <IoAddOutline style={{ width: "25px", height: "25px" }} />
            </Link>
          </div>
          {addresses.map((address, index) => (
            <div
              className="w-full flex flex-row justify-between p-4 text-base"
              key={index}
            >
              <div className="flex flex-row items-center justify-center">
                <IoHome style={{ width: "25px", height: "25px" }} />
                <div className="flex flex-col pl-4">
                  <div className="font-bold ">
                    {streets[index]}, {houseNums[index]}
                  </div>
                  <div>{labels[index]}</div>
                </div>
              </div>
              <div className="flex flex-row gap-x-2 items-center">
                <Link
                  to={`/editAddress/${address.userId}/${address.addressId}`}
                >
                  <AiFillEdit style={{ width: "25px", height: "30px" }} />
                </Link>{" "}
                |{" "}
                <RiDeleteBin6Line
                  style={{ width: "25px", height: "30px" }}
                  onClick={() =>
                    handleDeleteAddress(
                      address.addressId,
                      address.userId,
                      index
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
