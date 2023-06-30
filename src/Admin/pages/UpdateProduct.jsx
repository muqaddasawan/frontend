import React from "react";
import { useState } from "react";
import axios from "../../Services/axiosInterceptor";
import mainaxios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const [p_name, setProduct_name] = useState("");
  const [p_price, setProduct_price] = useState("");
  const [p_city, setAvailable_city] = useState([]);
  const [p_files, setfile] = useState("");
  const [p_id, setPid] = useState("");
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

  const [product, setProduct] = useState([]);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    mainaxios
      .get("/api/products/single-product/" + id)
      .then(({ data }) => {
        setProduct_name(data.name);
        setProduct_price(data.price);
        setAvailable_city(data.city);
        setProduct(data);
        setPid(id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formData = new FormData();
  formData.append("name", p_name);
  formData.append("price", p_price);
  formData.append("city", p_city);
  formData.append("thumbnail", p_files);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await mainaxios({
        method: "put",
        url: `/api/products/update-product/${p_id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/all-products");

      if (response.status === 200) {
        document.getElementById("successdiv").classList.remove("hidden");
        document.getElementById("alertdiv").classList.add("hidden");
        const message = response.data.message;
        document.getElementById("successmsg").innerHTML = message;
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
            <p className="font-medium">Update Product</p>
            <p className="text-sm text-gray-600">Enter New Product details</p>
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
        <form onSubmit={handleUpdateProduct}>
          <div className="flex flex-col gap-4 py-4 sm:flex-row">
            <p className="shrink-0 w-32 font-medium">Product Name</p>

            <input
              placeholder="Product Name"
              value={p_name}
              className="w-full rounded-md  bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
              onChange={(e) => {
                setProduct_name(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-4 py-4 sm:flex-row text-center">
            <p className="text-center">Previous city : {product.city}</p>
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
              defaultValue={p_city}
            >
              {cityOptions.map((city, i) => (
                <option key={i} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-4 py-4 sm:flex-row">
            <p className="shrink-0 w-32 font-medium">Price £ :</p>
            <input
              type="number"
              placeholder="Price"
              value={p_price}
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
          <div className="flex flex-col gap-4 py-4 sm:flex-row">
            <p className="font-semibold text-center">Old image</p>
            <div className="h-20 w-20">
              <img
                src={`https://api.thebaklavaboxx.co.uk/${product.thumbnail}`}
              />
            </div>
          </div>
          <div className="w-full text-center">
            <button
              className="cursor-pointer bg-dark_gray font-semibold text-white  p-3 rounded-lg w-1/2"
              // onClick={addProd}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
