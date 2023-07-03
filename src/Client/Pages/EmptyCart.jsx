import React from "react";
import { Link } from "react-router-dom";
const EmptyCart = () => {
  return (
    <div>
      <div className="scroll-smooth relative mx-auto w-full py-16 px-5 font-sans text-gray-800 sm:px-20 md:max-w-screen-lg lg:py-24">
        <h2 className="mb-5 text-center text-orange-800 font-sans text-2xl sm:text-3xl font-bold">
          Your Cart is Empty! Please select products first for shopping.
        </h2>
        <Link
          to="/"
          className="mb-5 text-center text-blue-600 font-sans text-xl sm:text-2xl font-bold"
        >
          <div className="lg:w-1/2 md:w-2/3 w-full">
            <h2 className="text-center bg-blue-gray-100 p-3 rounded-lg hover:shadow-md">
              Continue Shopping
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
