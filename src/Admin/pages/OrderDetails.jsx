import React from "react";
import { useParams } from "react-router-dom";
import axios from "../../Services/axiosInterceptor";
import { useState, useEffect } from "react";

const OrderDetails = () => {
  const [singleOrder, setSingleOrder] = useState("");
  const [changeStatus, setChangeStatus] = useState("");
  const [status, setStatus] = useState([
    "Not Process",
    "Processsing",
    "Shipped",
    "Deliverd",
    "Cancelled",
  ]);

  const params = useParams();
  const orderId = params.orderId;

  const getSingleOrder = async () => {
    try {
      const { data } = await axios.get(`/api/braintree/order/${orderId}`);
      setSingleOrder(data);
      console.log(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (!singleOrder) {
      getSingleOrder();
    } else {
      // console.log(singleOrder.buyer.clientname);
      singleOrder.map((o, i) => {
        console.log(o.buyer.clientname);
      });
    }
  }, [singleOrder]);

  const updateStatus = async (value, orderId) => {
    try {
      const data = await axios.put(`/api/braintree/order-status/${orderId}`, {
        status: value,
      });
      getSingleOrder();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section class="pt-12 pb-6 overflow-hidden bg-blueGray-100">
        <div class="container px-4 mx-auto">
          <div class="mb-8 pb-8 border-b border-gray-200 border-opacity-40">
            <h1 class="text-center text-3xl xl:text-4xl font-heading font-medium">
              Order Details
            </h1>
          </div>

          {!singleOrder ? (
            console.log("Fetching")
          ) : (
            <div class="flex flex-wrap -mx-4 mb-6 xl:mb-24">
              {singleOrder.map((order, i) => (
                <div>
                  <div key={i} class="w-full px-4 mb-5 md:mb-0">
                    <div class="py-12 px-8 md:px-12 bg-white rounded-3xl">
                      <span class="inline-block text-darkBlueGray-300 font-medium mb-6 text-2xl">
                        {order.products.length} products
                      </span>
                      <div class="xl:px-10">
                        {order.products.map((product, i) => (
                          <div class="relative flex flex-wrap items-center xl:justify-between -mx-4 mb-8 pb-8 border-b border-gray-200 border-opacity-40">
                            <div class="relative w-full md:w-auto px-4 mb-6 xl:mb-2">
                              <div class="block mx-auto max-w-max">
                                <img
                                  class="h-28 object-cover"
                                  src={`http://localhost:8000/${product.image}`}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div class="w-full md:w-auto px-4 mb-6 xl:mb-2">
                              <div class="block mb-5 text-xl font-heading font-medium">
                                {product.name}
                              </div>
                            </div>
                            <div class="w-full xl:w-auto px-4 mb-6 xl:mb-0 mt-6 xl:mt-0">
                              <div class="flex items-center">
                                <h4 class="mr-4 font-heading font-medium">
                                  Qty:
                                </h4>
                                <div class="w-16 px-3 py-2 text-center placeholder-gray-400 text-gray-400 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl">
                                  {product.quantity}
                                </div>
                              </div>
                            </div>
                            <div class="w-full xl:w-auto px-4">
                              <span class="text-xl font-heading font-medium text-blue-500">
                                <span class="text-sm">£</span>
                                <span>{product.itemTotal}</span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div class="w-full md:w-6/12 xl:w-6/12 px-4">
                    <div class="mb-14">
                      <h2 class="mb-7 md:mt-6 text-3xl font-heading font-medium">
                        Order totals
                      </h2>
                      <div class="flex items-center justify-between py-4 px-10 mb-3 leading-8 bg-white bg-opacity-50 font-heading font-medium rounded-3xl">
                        <span>Subtotal: </span>
                        <span class="flex items-center text-xl">
                          <span class="mr-2 ml-5 text-lg">£</span>
                          <span>{order.payment.transaction.amount}</span>
                        </span>
                      </div>
                      <div class="flex items-center justify-between py-4 px-10 mb-3 leading-8 bg-white bg-opacity-50 font-heading font-medium rounded-3xl">
                        <span>Shipping</span>
                        <span class="flex items-center text-xl">
                          <span class="mr-2 ml-5 text-lg">£ </span>
                          <span>10</span>
                        </span>
                      </div>
                      <div class="flex items-center justify-between py-4 px-10 mb-6 leading-8 bg-white font-heading font-medium rounded-3xl">
                        <span>Total</span>
                        <span class="flex items-center text-xl text-blue-500">
                          <span class="mr-2 ml-5 text-lg">£ </span>
                          <span>
                            {parseFloat(order.payment.transaction.amount) + 10}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="text-center font-2xl font-semibold mb-4 bg-blue-gray-100 rounded-full p-3">
                      <h2>Current Status : {order.status}</h2>
                    </div>
                    <div className="flex items-center mb-5">
                      <label
                        htmlFor=""
                        className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"
                      >
                        Update Status:{" "}
                      </label>

                      <select
                        className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm"
                        // onChange={(e) => console.log(e.target.value)}
                        onChange={(e) =>
                          updateStatus(e.target.value, order._id)
                        }
                        defaultValue={order.status}
                      >
                        {status.map((stat, i) => (
                          <option
                            key={i}
                            value={stat}
                            className="whitespace-no-wrap text-sm"
                          >
                            {stat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div class="text-center md:text-left">
                      <h4 class="mb-5 text-3xl font-heading font-medium">
                        Shipping Details
                      </h4>
                      <h4 className="text-lg font-semibold">
                        Reciever Name :
                        <span className="ml-5 text-base">
                          {order.shipping.reciever}
                        </span>
                      </h4>
                      <h4 className="text-lg font-semibold">
                        House # :
                        <span className="ml-5 text-base">
                          {order.shipping.house}
                        </span>
                      </h4>
                      <h4 className="text-lg font-semibold">
                        Street # :
                        <span className="ml-5 text-base">
                          {order.shipping.street}
                        </span>
                      </h4>
                      <h4 className="text-lg font-semibold">
                        Postal Code :
                        <span className="ml-5 text-base">
                          {order.shipping.postal}
                        </span>
                      </h4>
                      <h4 className="text-lg font-semibold">
                        City :
                        <span className="ml-5 text-base">
                          {order.shipping.city}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrderDetails;
