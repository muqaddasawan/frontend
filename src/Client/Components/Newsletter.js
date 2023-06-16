import React from "react";

const Newsletter = () => {
  return (
    <div className="flex justify-center px-2 bg-dark_gray mb-5">
      <div className="max-w-2xl px-3 py-1 rounded-2xl md:px-2 md:py-2">
        <h4 className="text-2xl font-semibold tracking-wide text-white lg:text-3xl">
          Want more From Us?
        </h4>
        <p className="max-w-xl mt-2 leading-relaxed text-blue-gray-50 lg:text-lg">
          Sign up and get notified for latest promotions and addition on new
          products in your area.
        </p>
        <div className="my-4 sm:flex sm:flex-row sm:justify-evenly">
          <input
            className=" block w-full px-4 py-3 mt-3 text-gray-800 placeholder-gray-500 bg-white border border-gray-300 rounded-md appearance-none sm:max-w-xs focus:outline-none focus:ring focus:ring-blue-50 focus:border-blue-300"
            type="email"
            placeholder="Enter your email"
          />
          <button className="bg-gray text-white block w-full py-3 mt-3 font-bold tracking-wide rounded shadow sm:ml-3 md:w-52 focus">
            <span className="block ">Subscribe</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
