import React from "react";
import { useState } from "react";
import axios from "../../Services/axiosInterceptor";

const Newsletter = () => {
  const [input, setinput] = useState({
    email: "",
  });

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("api/subscriber/register", input);
      if (response.status === 201) {
        document.getElementById("successdiv").classList.remove("hidden");
        document.getElementById("alertdiv").classList.add("hidden");
        const message = response.data.message;
        console.log(response.data.message);
        document.getElementById("successmsg").innerHTML = message;
        setinput({ email: "" });
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
    <div className="flex justify-center px-2 bg-dark_gray mb-5">
      <div className="max-w-2xl px-3 py-1 rounded-2xl md:px-2 md:py-2">
        <h4 className="text-2xl font-semibold tracking-wide text-white lg:text-3xl">
          Want more From Us?
        </h4>
        <p className="max-w-xl mt-2 leading-relaxed text-blue-gray-50 lg:text-lg">
          Get notified for latest promotions and addition on new products in
          your area.
        </p>
        <div id="successdiv" className="hidden">
          <div className="flex p-3 justify-between rounded-md bg-green-800 text-white">
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
        <form onSubmit={handleSave} className="flex flex-col pt-3 md:pt-8">
          <div className="my-4 sm:flex sm:flex-row sm:justify-evenly">
            <input
              className=" block w-full px-4 py-3 mt-3 text-gray-800 placeholder-gray-500 bg-white border border-gray-300 rounded-md appearance-none sm:max-w-xs focus:outline-none focus:ring focus:ring-blue-50 focus:border-blue-300"
              type="email"
              name="email"
              value={input.email}
              onChange={(e) =>
                setinput({
                  ...input,
                  [e.target.name]: e.target.value,
                })
              }
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="bg-gray text-white block w-full py-3 mt-3 font-bold tracking-wide rounded shadow sm:ml-3 md:w-52 focus"
            >
              <span className="block">Subscribe</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
