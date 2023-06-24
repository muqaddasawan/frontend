import React from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <div>
      <div className="relative mx-auto w-full py-16 px-5 font-sans text-gray-800 sm:px-20 md:max-w-screen-lg lg:py-24">
        <h2 className="mb-5 text-center font-sans text-4xl sm:text-5xl font-bold">
          Frequently asked Questions
        </h2>
        <p className="mb-12 text-center text-lg text-gray-600">
          We have written down answers to some of the frequently asked
          questions. But, if you still have any queries, feel free to ping us on
          chat.
        </p>
        <ul className="space-y-4">
          <li className="text-left">
            <label
              htmlFor="accordion-1"
              className="relative flex flex-col rounded-md border border-gray-100 shadow-md"
            >
              <input
                className="peer hidden"
                type="checkbox"
                id="accordion-1"
                checked
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <div className="relative ml-4 cursor-pointer select-none items-center py-4 pr-12">
                <h3 className="text-sm text-gray-600 lg:text-base">
                  Are these Product Available in all cities?
                </h3>
              </div>
              <div className="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
                <div className="p-5">
                  <p className="text-sm">
                    No We only provides in selected cities, to maintain Quality.
                  </p>
                </div>
              </div>
            </label>
          </li>

          <li className="text-left">
            <label
              htmlFor="accordion-2"
              className="relative flex flex-col rounded-md border border-gray-100 shadow-md"
            >
              <input className="peer hidden" type="checkbox" id="accordion-2" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <div className="relative ml-4 cursor-pointer select-none items-center py-4 pr-12">
                <h3 className="text-sm text-gray-600 lg:text-base">
                  Do you Support Cash on Delievery?
                </h3>
              </div>
              <div className="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
                <div className="p-5">
                  <p className="text-sm">
                    No Only online payment, Credit/debit card, googlepay and
                    apple pay are accepted.
                  </p>
                </div>
              </div>
            </label>
          </li>

          <li className="text-left">
            <label
              htmlFor="accordion-3"
              className="relative flex flex-col rounded-md border border-gray-100 shadow-md"
            >
              <input className="peer hidden" type="checkbox" id="accordion-3" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <div className="relative ml-4 cursor-pointer select-none items-center py-4 pr-12">
                <h3 className="text-sm text-gray-600 lg:text-base">
                  How Do you deliever product?
                </h3>
              </div>
              <div className="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
                <div className="p-5">
                  <p className="text-sm">We deliever through Royal mail.</p>
                </div>
              </div>
            </label>
          </li>
        </ul>
        <div className="mt-20 flex justify-center">
          <Link
            className="inline-flex cursor-pointer rounded-lg bg-dark_gray py-3 px-5 text-lg text-white"
            to="/contact"
          >
            Still have questions?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
