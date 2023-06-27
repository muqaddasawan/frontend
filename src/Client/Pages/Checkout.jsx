import React from "react";
import { useCart } from "react-use-cart";
import GooglePayButton from "@google-pay/button-react";
import DropIn from "braintree-web-drop-in-react";
import { useState, useEffect } from "react";
import axios from "../../Services/axiosInterceptor";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const city = localStorage.getItem("City");
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
  const [input, setinput] = useState({
    reciever: "",
    house: "",
    street: "",
    postal: "",
    city: city,
  });

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

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const clientId = localStorage.getItem("clientId");
      const data = await axios.post("/api/braintree/payment", {
        nonce,
        items,
        input,
        clientId,
      });
      setLoading(false);
      emptyCart();
      alert("Order submitted successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleShipping = async (e) => {
    e.preventDefault();

    if (!input.reciever) {
      alert("Reciever not found");
    } else if (!input.house) {
      alert("House not found");
    } else if (!input.street) {
      alert("Street not found");
    } else if (!input.postal) {
      alert("Postal Code not found");
    } else {
      document.getElementById("paymentdiv").classList.remove("hidden");
    }
  };

  return (
    <div className="mb-5 z-8">
      <div className="flex  flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-8 lg:px-20 xl:px-32">
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
            {items.map((item, i) => (
              <div
                key={i}
                className="flex flex-col rounded-lg bg-white sm:flex-row"
              >
                <img
                  className="m-2 h-24 w-28 rounded-md border border-blue-gray-100 object-cover object-center"
                  src={`http://api.thebaklavaboxx.co.uk/${item.image}`}
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
          </div>

          <div>
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

        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="mt-8 text-lg font-medium">Choose Payment Methods</p>
          <div className=" mt-5 grid gap-6 mb-5">
            <div className="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-2 py-3 font-medium text-gray-700">
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
          </div>
          <hr />
          <p className="text-xl font-medium">Shipping Details</p>
          <p className="text-gray-400">
            Complete your order by providing your shipping details.
          </p>

          <div className="">
            <form onSubmit={handleShipping}>
              <div className="">
                <input
                  id="reciever"
                  name="reciever"
                  type="text"
                  className="mt-4 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                  placeholder="Enter Reciever name"
                  onChange={(e) =>
                    setinput({
                      ...input,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <input
                  id="house"
                  name="house"
                  type="text"
                  className="mt-4 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                  placeholder="Enter House Number"
                  onChange={(e) =>
                    setinput({
                      ...input,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <input
                  id="street"
                  name="street"
                  type="text"
                  className="mt-4 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                  placeholder="Enter Street Details"
                  onChange={(e) =>
                    setinput({
                      ...input,
                      [e.target.name]: e.target.value,
                    })
                  }
                />

                <input
                  id="postal"
                  type="text"
                  name="postal"
                  className="mt-4 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                  placeholder="Enter Postal code"
                  onChange={(e) =>
                    setinput({
                      ...input,
                      [e.target.name]: e.target.value,
                    })
                  }
                />

                <div className="flex flex-col gap-4 py-4 sm:flex-row">
                  <p className="px-2 py-2 w-32 font-medium">City :</p>

                  <select
                    name="city"
                    id="city"
                    defaultValue={city}
                    className="w-full rounded-md bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                    onChange={(e) =>
                      setinput({
                        ...input,
                        [e.target.name]: e.target.value,
                      })
                    }
                  >
                    {cityOptions.map((city, i) => (
                      <option key={i} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="Submit"
                  className="w-full rounded-lg border mt-5 border-blue-700 bg-dark_gray p-3 text-center font-medium text-white outline-none transition focus:ring hover:border-blue-700 hover:bg-gray_light hover:text-white"
                >
                  Save Shipping Details
                </button>
              </div>
            </form>
          </div>

          <div id="paymentdiv" className="hidden">
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

            {/* <div className="w-full">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
