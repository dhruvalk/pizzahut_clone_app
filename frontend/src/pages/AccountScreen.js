import React from "react";
import { IoHome } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";

export default function AccountScreen() {
  return (
    <>
      <div className="w-full bg-green text-white h-1/6 justify-center text-5xl p-20 mb-20">
        Hello, Li Cady
      </div>
      <div className="flex flex-col items-center h-screen space-y-16 w-3/4 m-auto">
        <div className="border-2 border-grey w-full divide-y divide-solid divide-y-2 bg-zinc-50">
          <div className="p-4 text-xl font-bold">Account details</div>
          <div className="grid gap-6 grid-cols-2 grid-rows-2 p-6">
            <label for="firstName" className="flex flex-col gap-2 text-lg">
              First Name
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              ></input>
            </label>
            <label for="lastName" className="flex flex-col gap-2 text-lg">
              Last Name
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              ></input>
            </label>
            <label for="email" className="flex flex-col gap-2 text-lg">
              Email
              <input
                type="text"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              ></input>
            </label>
            <label for="phone" className="flex flex-col gap-2 text-lg">
              Mobile Phone
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              ></input>
            </label>
          </div>
        </div>
        <div className="border-2 border-grey w-full divide-y divide-solid divide-y-2 bg-zinc-50">
          <div className="p-4 flex flex-row justify-between ">
            <text className="font-bold text-xl">Addresses</text>
            <AiFillEdit style={{ width: "25px", height: "25px" }} />
          </div>
          <div className="w-full flex flex-row justify-between p-4 text-lg ">
            <div className="flex flex-row items-center justify-center">
              <IoHome style={{ width: "25px", height: "25px" }} />
              <text className="flex flex-col pl-4">
                <text className="font-bold ">
                  155 Bukit Batok St 10, #05-44
                </text>
                <text>Home</text>
              </text>
            </div>
            <div>Edit | Delete</div>
          </div>
        </div>
      </div>
    </>
  );
}
