import React from "react";
import { useCart } from "react-use-cart";
import GooglePayButton from "@google-pay/button-react";
import DropIn from "braintree-web-drop-in-react";
import { useState, useEffect } from "react";
import axios from "../../Services/axiosInterceptor";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    emptyCart,
    updateItemQuantity,
    cartTotal,
    removeItem,
  } = useCart();

  const navigate = useNavigate();

  const [clientToken, setClientToken] = useState("");
  const [clientLoggedtoken, setclientLoggedtoken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const getToken = async () => {
    try {
      const response = await axios.get("/api/braintree/token");
      const token = response.data.clientToken;
      setClientToken(token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setclientLoggedtoken(localStorage.getItem("clienttoken"));
    getToken();
  }, [clientLoggedtoken]);

  const handlePayment2 = () => {
    alert("called 2");
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const clientId = localStorage.getItem("clientId");
      alert(clientId);
      const data = await axios.post("/api/braintree/payment", {
        nonce,
        items,
        clientId,
      });
      console.log("called");
      setLoading(false);
      emptyCart();
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="mb-5 z-8">
      <div className="flex  flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-8 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          sneekpeeks
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable payment method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border border-blue-gray-100 bg-white px-2 py-4 sm:px-6">
            {items.map((item) => (
              <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border border-blue-gray-100 object-cover object-center"
                  src={`http://localhost:8000/${item.image}`}
                  alt="Image"
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{item.name}</span>

                  <p className="text-lg font-bold">£ {item.price}</p>
                  <small className="float-right text-gray-400">
                    Quantity : {item.quantity}
                  </small>
                </div>
              </div>
            ))}

            {/* <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt="Image"
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">
                  Bakery item 1
                </span>
                <span className="float-right text-gray-400">42EU - 8.5US</span>
                <p className="text-lg font-bold">$138.99</p>
              </div>
            </div> */}
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="mt-8 text-lg font-medium">Choose Payment Methods</p>
          <div className=" mt-5 grid gap-6 mb-5">
            <div className="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-2 py-3 font-medium text-gray-700">
              <GooglePayButton
                environment="TEST"
                paymentRequest={{
                  apiVersion: 2,
                  apiVersionMinor: 0,
                  allowedPaymentMethods: [
                    {
                      type: "CARD",
                      parameters: {
                        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                        allowedCardNetworks: ["MASTERCARD", "VISA"],
                      },
                      tokenizationSpecification: {
                        type: "PAYMENT_GATEWAY",
                        parameters: {
                          gateway: "example",
                          gatewayMerchantId: "exampleGatewayMerchantId",
                        },
                      },
                    },
                  ],
                  merchantInfo: {
                    merchantId: "12345678901234567890",
                    merchantName: "Demo Merchant",
                  },
                  transactionInfo: {
                    totalPriceStatus: "FINAL",
                    totalPriceLabel: "Total",
                    totalPrice: "100.00",
                    currencyCode: "GBP",
                    countryCode: "US",
                  },
                }}
                onLoadPaymentData={(paymentRequest) => {
                  console.log("load payment data", paymentRequest);
                }}
              />
              {/* <input
                className="peer hidden"
                type="radio"
                name="radio"
                id="radio3"
                checked
              />
              <label
                className="peer-checked:border-blue-400 peer-checked:bg-blue-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border"
                htmlFor="radio3"
              ></label>
             
              <div className="peer-checked:border-transparent peer-checked:bg-blue-400 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-400 ring-offset-2"></div>
              <span className="pointer-events-none z-10">Google Pay</span>
              <div className="peer-checked:border-transparent absolute right-4 h-10 w-12 pt-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png" />
              </div> */}
            </div>

            <div className="mt-2">
              {!clientToken || !items.length ? (
                " "
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    onClick={handlePayment}
                    disabled={!instance || !clientLoggedtoken}
                    className="mt-4 mb-8 w-full rounded-md bg-dark_gray px-6 py-3 font-medium text-white"
                  >
                    {loading ? "Loading...." : "Place Order"}
                  </button>
                </>
              )}
            </div>

            {/* <div className="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-2 py-3 font-medium text-gray-700">
              <input
                className="peer hidden"
                type="radio"
                name="radio"
                id="radio1"
                checked
              />
              <label
                className="peer-checked:border-blue-400 peer-checked:bg-blue-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border"
                htmlFor="radio1"
              ></label>
              <div className="peer-checked:border-transparent peer-checked:bg-blue-400 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-400 ring-offset-2"></div>
              <span className="pointer-events-none z-10">Apple Pay</span>
              <div className="peer-checked:border-transparent absolute right-4 h-12 w-12 pt-4">
                <img src="https://seeklogo.com/images/A/apple-pay-logo-F68C9AC252-seeklogo.com.png" />
              </div>
            </div>
            <div className="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-2 py-3 font-medium text-gray-700">
              <input
                className="peer hidden"
                type="radio"
                name="radio"
                id="radio2"
                checked
              />
              <label
                className="peer-checked:border-blue-400 peer-checked:bg-blue-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border"
                htmlFor="radio2"
              ></label>
              <div className="peer-checked:border-transparent peer-checked:bg-blue-400 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-400 ring-offset-2"></div>
              <span className="pointer-events-none z-10">Visa Card</span>
              <div className="peer-checked:border-transparent absolute right-4 h-12 w-12 pt-2">
                <img src="https://logowik.com/content/uploads/images/153_visa.jpg" />
              </div>
            </div> */}

            {/* <div className="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-2 py-3 font-medium text-gray-700">
              <input
                className="peer hidden"
                type="radio"
                name="radio"
                id="radio4"
                checked
              />
              <label
                className="peer-checked:border-blue-400 peer-checked:bg-blue-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border"
                htmlFor="radio4"
              ></label>
              <div className="peer-checked:border-transparent peer-checked:bg-blue-400 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-400 ring-offset-2"></div>
              <span className="pointer-events-none z-10">Amex</span>
              <div className="peer-checked:border-transparent absolute right-4 h-16 w-16 pt-2">
                <img src="https://download.logo.wine/logo/American_Express/American_Express-Logo.wine.png " />
              </div>
            </div>
            <div className="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-2 py-3 font-medium text-gray-700">
              <input
                className="peer hidden"
                type="radio"
                name="radio"
                id="radio5"
                checked
              />
              <label
                className="peer-checked:border-blue-400 peer-checked:bg-blue-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border"
                htmlFor="radio5"
              ></label>
              <div className="peer-checked:border-transparent peer-checked:bg-blue-400 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-400 ring-offset-2"></div>
              <span className="pointer-events-none z-10">Master Card</span>
              <div className="peer-checked:border-transparent absolute right-4 h-10 w-12 pt-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png" />
              </div>
            </div> */}
          </div>
          <hr />
          <p className="text-xl font-medium">Shipping Details</p>
          <p className="text-gray-400">
            Complete your order by providing your shipping details.
          </p>
          <div className="">
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>

            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  id="billing-address"
                  name="billing-address"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"></div>
              </div>
              {/* <select
                type="text"
                name="billing-state"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="State">State</option>
              </select> */}
              <input
                type="text"
                name="billing-zip"
                className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ZIP"
              />
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">£ {cartTotal}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">£ 8.00</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                £ {cartTotal + 8.0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
