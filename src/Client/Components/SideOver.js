import React from "react";
import Cart from "./Cart";
import { useState } from "react";

const SideOver = () => {
  const [cartOpen, setcartOpen] = useState(true);
  const showCart = () => {
    setcartOpen((current) => !current);
  };

  return (
    <div
      className="fixed z-40"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity"></div>

      <div className="inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
            <div className="pointer-events-auto relative w-screen max-w-md transition-opacity ease-in-out delay-1000">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <button
                  onClick={showCart}
                  type="button"
                  className="rounded-md text-black hover:text-gray-800 "
                >
                  <span className="sr-only">Close panel</span>
                  <svg
                    className="h-8 w-8 pl-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="px-1 sm:px-2">
                  <Cart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideOver;
