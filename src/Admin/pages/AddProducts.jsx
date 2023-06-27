import React from "react";
import { useState } from "react";
// import axios from "axios";
import axios from "../../Services/axiosInterceptor";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const navigate = useNavigate();
  const [p_name, setProduct_name] = useState("");
  const [p_price, setProduct_price] = useState("");
  const [p_city, setAvailable_city] = useState([]);
  const [p_files, setfile] = useState("");

  const formData = new FormData();
  formData.append("name", p_name);
  formData.append("price", p_price);
  formData.append("city", p_city);
  formData.append("thumbnail", p_files);

  const handleaddProduct = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post("api/products/add-product", formData);

      const response = await axios({
        method: "post",
        url: "api/products/add-product",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },

        //  const response = await axios({
        //   method: "post",
        //   url: "api/products/add-product",
        //   data: formData,
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //     "Access-Control-Allow-Origin": "https://api.thebaklavaboxx.co.uk/",
        //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        //   },
        // https://api.thebaklavaboxx.co.uk/

        // headers: {
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        //   "Content-Type": "multipart/form-data",
        // },
      });
      if (response.status === 200) {
        document.getElementById("successdiv").classList.remove("hidden");
        document.getElementById("alertdiv").classList.add("hidden");
        const message = response.data.message;
        document.getElementById("successmsg").innerHTML = message;
        setProduct_name("");
        setProduct_price("");
        setAvailable_city([]);

        navigate("/admin/all-products");
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
    <div className="mt-20">
      <div className="my-4 max-w-screen-md border-spacing-0 px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
          <p className="flex-1 text-xl font-bold text-center  text-gray-900">
            Add Product
          </p>
        </div>
        <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
          <p className="flex-1 text-base text-center text-gray-900">
            Enter Product details
          </p>
        </div>
        <div id="successdiv" className="hidden">
          <div className="flex p-3 justify-between rounded-md bg-green-900 text-white">
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
              value={p_name}
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
              value={p_city}
              className="w-full rounded-md bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
              onChange={(e) => {
                setAvailable_city(e.target.value);
              }}
            >
              <option>Select City</option>
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
          </div>

          <div className="flex flex-col gap-4 py-4 sm:flex-row">
            <p className="shrink-0 w-32 font-medium">Price £:</p>
            <input
              value={p_price}
              type="number"
              placeholder="Price"
              className="mb-2 w-full rounded-md bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
              onChange={(e) => {
                setProduct_price(e.target.value);
              }}
            />

            {/* <input
              placeholder="Discount"
              className="w-full rounded-md bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
            /> */}
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

          <div className="w-full text-center">
            <button className="cursor-pointer bg-dark_gray font-semibold text-white  p-3 rounded-lg w-1/2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
