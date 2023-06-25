import React from "react";
import { useState } from "react";

const UserShipping = () => {
  const [reciever, setReciever] = useState("Malik");
  const [house, setHouse] = useState("89");
  const [street, setStreet] = useState("30");
  const [postal, setPostal] = useState("2132");
  const [city, setCity] = useState([]);
  const [cityOptions, setCityOptions] = useState([
    "Luton",
    "Dunstable",
    "Hitchin",
    "Hemel Hempstead",
    "Watford",
    "St Albans",
    "Bedford",
    "Milton Keynes",
    "Other City",
  ]);
  return (
    <div>
      <section className=" py-12 text-gray-800 sm:py-24">
        <div className="mx-auto flex max-w-md flex-col rounded-lg lg:max-w-screen-xl lg:flex-row">
          <div className="max-w-2xl px-4 lg:pr-24 lg:w-6/12">
            <h3 className="mb-5 text-3xl font-semibold border-b text-center">
              Previous Shipping Details
            </h3>
            <h3 className="mb-5 text-2xl font-semibold">{reciever}</h3>
            <div className="mb-5 flex font-medium">
              <div className="">
                <p className="mb-2">House number#</p>
                <span className="font-normal text-gray-600">{house}</span>
              </div>
            </div>
            <div className="mb-5 flex font-medium">
              <div className="">
                <p className="mb-2">Street :</p>
                <span className="font-normal text-gray-600">{street}</span>
              </div>
            </div>
            <div className="mb-5 flex font-medium">
              <div className="">
                <p className="mb-2">City :</p>
                <span className="font-normal text-gray-600">{city}</span>
              </div>
            </div>
            <div className="mb-5 flex font-medium">
              <div className="">
                <p className="mb-2">PostalCode #</p>
                <span className="font-normal text-gray-600">{postal}</span>
              </div>
            </div>
          </div>
          <div className="lg:w-6/12 border border-gray-100 shadow-gray-500/20 mt-8 mb-8 max-w-md bg-white shadow-sm sm:rounded-lg sm:shadow-lg lg:mt-0">
            <div className="relative border-b border-gray-300 p-4 py-8 sm:px-8">
              <h3 className="mb-1 inline-block text-2xl font-semibold">
                <span className="mr-4">Update Shipping Details</span>
              </h3>
            </div>
            <form>
              <div className="p-4 sm:p-8">
                <input
                  id="name"
                  type="text"
                  className="mt-4 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                  placeholder="Enter Reciever name"
                  onChange={(e) => {
                    setReciever(e.target.value);
                  }}
                />
                <input
                  id="house"
                  type="text"
                  className="mt-4 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                  placeholder="Enter House Number"
                  onChange={(e) => {
                    setHouse(e.target.value);
                  }}
                />
                <input
                  id="Street"
                  type="text"
                  className="mt-4 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                  placeholder="Enter Street Details"
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                />

                <div className="flex flex-col gap-4 py-4 sm:flex-row">
                  <p className=" w-32 font-medium">Cities</p>

                  <select
                    name="cities"
                    id="cities"
                    className="w-full rounded-md bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    defaultValue={city}
                  >
                    {cityOptions.map((city, i) => (
                      <option key={i} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  id="Postal Code"
                  type="text"
                  className="mt-4 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                  placeholder="Enter Postal code"
                  onChange={(e) => {
                    setPostal(e.target.value);
                  }}
                />
                <button
                  type="Submit"
                  className="w-full rounded-lg border mt-5 border-blue-700 bg-dark_gray p-3 text-center font-medium text-white outline-none transition focus:ring hover:border-blue-700 hover:bg-gray_light hover:text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserShipping;
