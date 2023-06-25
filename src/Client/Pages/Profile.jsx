import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [clientname, setclientname] = useState("");

  useEffect(() => {
    setclientname(localStorage.getItem("clientname"));
  }, [clientname]);
  return (
    <div>
      <div className="mx-auto my-10 flex max-w-xs flex-col items-center rounded-xl border px-4 py-4 text-center md:max-w-lg md:flex-row md:items-start md:text-left">
        <div className="mb-4 md:mr-6 md:mb-0">
          <img
            className="w-32 h-32 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
            alt="Bordered avatar"
          />
        </div>
        <div className="">
          <p className="text-xl font-medium text-gray-700">{clientname}</p>
          {/* <p className="mb-4 text-sm font-medium text-gray-500">Senior Editor</p> */}
          <div className="flex space-x-2">
            {/* <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
              <p className="text-sm font-medium text-gray-500">Articles</p>
              <p className="text-3xl font-medium text-gray-600">13</p>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
              <p className="text-sm font-medium text-gray-500">Papers</p>
              <p className="text-3xl font-medium text-gray-600">7</p>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
              <p className="text-sm font-medium text-gray-500">Followers</p>
              <p className="text-3xl font-medium text-gray-600">2.5k</p>
            </div> */}
            <div className=""></div>
          </div>
          <div className="mb-3"></div>
          <div className="flex space-x-2">
            <Link
              to="/profile/userorders"
              className="w-full rounded-lg border-2 bg-white px-4 py-2 font-medium text-gray-500"
            >
              My Orders
            </Link>
            {/* <Link
              to="/profile/shipping"
              className="w-full rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white"
            >
              Shipping
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
