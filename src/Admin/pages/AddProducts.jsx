import React from "react";
import Axios from "axios";
import { useState } from "react";
import axios from "../../Services/axiosInterceptor";
import { json, useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import { useEffect } from "react";
import { MultiSelectt } from "react-multi-select-component";

const AddProducts = () => {
  const navigate = useNavigate();
  const [p_name, setProduct_name] = useState("");
  const [p_price, setProduct_price] = useState("");
  const [p_city, setAvailable_city] = useState([]);
  const [p_files, setfile] = useState("");
  const [cityOptions, setCityOptions] = useState([
    "All Country",
    "London",
    "Birmingham",
    "Liverpool",
    "Scotland",
  ]);

  const formData = new FormData();
  formData.append("name", p_name);
  formData.append("price", p_price);
  formData.append("city", p_city);
  formData.append("thumbnail", p_files);

  const handleaddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "api/products/add-product",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        document.getElementById("successdiv").classList.remove("hidden");
        document.getElementById("alertdiv").classList.add("hidden");
        const message = response.data.message;
        document.getElementById("successmsg").innerHTML = message;
        navigate("/admin/add-products");
      }
    } catch (error) {
      document.getElementById("alertdiv").classList.remove("hidden");
      document.getElementById("successdiv").classList.add("hidden");
      const message = error.response.data.message;
      document.getElementById("alert").innerHTML = message;
    }
  };

  function closeAlert() {
    document.getElementById("alertdiv").classList.add("hidden");
  }

  function closeSuccess() {
    document.getElementById("successdiv").classList.add("hidden");
  }

  return (
    <div className="mt-12">
      <div className="my-4 max-w-screen-md border-spacing-0 px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
        <div className="flex flex-col py-4 sm:flex-row sm:items-start ">
          <div className="shrink-0 mr-auto sm:py-3 ">
            <p className="font-medium">Product Details</p>
            <p className="text-sm text-gray-600">Enter Product details</p>
          </div>
        </div>
        <div id="successdiv" className="hidden">
          <div className="flex p-3 justify-between rounded-md bg-gray text-white">
            <p id="successmsg" className="text-base"></p>
            <button className="font-bold text-2xl" onClick={closeSuccess}>
              X
            </button>
          </div>
        </div>
        <div id="alertdiv" className="hidden">
          <div className="flex p-3 justify-between rounded-md bg-red-400 text-white">
            <p id="alert" className="text-base"></p>
            <button className="font-bold text-2xl" onClick={closeAlert}>
              X
            </button>
          </div>
        </div>
        <form onSubmit={handleaddProduct}>
          <div className="flex flex-col gap-4 py-4 sm:flex-row">
            <p className="shrink-0 w-32 font-medium">Product Name</p>

            <input
              placeholder="Product Name"
              className="w-full rounded-md  bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
              onChange={(e) => {
                setProduct_name(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-4 py-4 sm:flex-row">
            <p className=" w-32 font-medium">Cities</p>

            <select
              name="cities"
              id="cities"
              className="w-full rounded-md bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
              onChange={(e) => {
                setAvailable_city(e.target.value);
              }}
            >
              <option>Select Your City</option>
              <option value="Luton">Luton</option>
              <option value="Dunstable">Dunstable</option>
              <option value="Hitchin">Hitchin</option>
              <option value="Hemel Hempstead">Hemel Hempstead</option>
              <option value="Watford">Watford</option>
              <option value="St Albans">St Albans</option>
              <option value="Bedford">Bedford</option>
              <option value="Milton Keynes">Milton Keynes</option>
              <option value="Other City">Other City</option>
            </select>

            {/* <div className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1">
              <Multiselect
                isObject={false}
                options={cityOptions}
                showCheckbox
                onSelect={(event) => {
                  const city = event;
                  setAvailable_city(city);
                }}
                onRemove={(event) => {
                  const city = event;
                  setAvailable_city(city);
                }}
              />
            </div> */}
          </div>

          {/* <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
            <p className="shrink-0 w-32 font-medium">Cities</p>
            <input
              placeholder="Cities"
              className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
              onChange={(e) => {
                setAvailable_city(e.target.value);
              }}
            />
          </div> */}

          <div className="flex flex-col gap-4 py-4 sm:flex-row">
            <p className="shrink-0 w-32 font-medium">Orignal Price</p>
            <input
              type="number"
              placeholder="Orignal Price"
              className="mb-2 w-full rounded-md bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
              onChange={(e) => {
                setProduct_price(e.target.value);
              }}
            />

            <input
              placeholder="Discount"
              className="w-full rounded-md bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
            />
          </div>
          <div className="flex flex-col gap-4 py-4 sm:flex-row">
            <p className="shrink-0 w-32 font-medium">Thumbnail Image</p>
            <input
              onChange={(e) => {
                setfile(e.target.files[0]);
              }}
              type="file"
              id="product-thumbnail"
              className="w-full rounded-md  bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
            />
          </div>
          {/* <div className="flex flex-col gap-4 py-4  lg:flex-row">
            <div className="shrink-0 w-32  sm:py-4">
              <p className="mb-auto font-medium">Avatar</p>
              <p className="text-sm text-gray-600">Change your avatar</p>
            </div>
            <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
              <img
                src="/images/ddHJYlQqOzyOKm4CSCY8o.png"
                className="h-16 w-16 rounded-full"
              />
              <p className="text-sm text-gray-600">
                Drop your desired image file here to start the upload
              </p>
              <input
                type="file"
                className="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1"
              />
            </div>
          </div> */}
          <div className="w-full text-center">
            <button
              className="cursor-pointer bg-dark_gray font-semibold text-white  p-3 rounded-lg w-1/2"
              // onClick={addProd}
            >
              Submit
            </button>
          </div>
        </form>
        {/* <div className="flex justify-end py-4 sm:hidden">
          <button className="mr-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 focus:outline-none focus:ring hover:bg-gray-200">
            Cancel
          </button>
          <button className="rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700">
            Save
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default AddProducts;
