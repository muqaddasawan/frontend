import React from "react";
import { useState, useEffect } from "react";
import axios from "../../Services/axiosInterceptor";
import mainaxios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import Profile from "../Pages/Profile";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  const buyer = localStorage.getItem("clientId");

  const getOrders = async () => {
    try {
      // const { data } = await axios.get("/api/braintree/orders");
      const { data } = await axios.get(`/api/braintree/user-orders/${buyer}`);
      setOrders(data);
      console.log(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (orders.length === 0) {
      getOrders();
    }
  });
  return (
    <div>
      <Profile />
      <div className="mx-auto mt-14  max-w-screen-lg px-2 overflow-hidden mb-10">
        <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
          <h1 className="text-center flex-1 text-2xl font-bold text-gray-900 border-b">
            My Orders
          </h1>
          {/* <p> {JSON.stringify(orders, null, 4)}</p> */}
          <div className="mt-4 sm:mt-0">
            <div className="flex items-center justify-start sm:justify-end">
              {/* <div className="flex items-center">
            <label
              htmlFor=""
              className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"
            >
              {" "}
              Sort by:{" "}
            </label>
            <select
              name=""
              className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm"
            >
              <option className="whitespace-no-wrap text-sm">Recent</option>
            </select>
          </div> */}
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border shadow">
          <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2 ">
            <thead className="hidden border-b lg:table-header-group">
              <tr className="">
                <td
                  width="40%"
                  className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
                >
                  <span>#</span>
                  {"    "}
                  Order Id
                </td>

                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                  Date
                </td>

                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                  Amount
                </td>

                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                  Details
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                  Status
                </td>
              </tr>
            </thead>

            <tbody className="lg:border-gray-300">
              {!orders ? (
                <tr>
                  <h1 className="text-center font-semibold text-xl">
                    No Order Placed Yet
                  </h1>
                </tr>
              ) : (
                orders.map((order, i) => (
                  <tr
                    className=" hover:bg-blue-gray-50"
                    key={i}
                    // onClick={() => {
                    //   setOrder(order);
                    //   setProducts(order.products2);
                    //   orderClick();
                    // }}
                  >
                    <td
                      width="50%"
                      className="whitespace-no-wrap text-sm font-bold text-gray-900 sm:px-6"
                    >
                      {i + 1}
                      {".   "}
                      {order._id}

                      <div className="mt-1 lg:hidden text-xs">
                        <p className="font-normal text-gray-500">
                          {moment(order.createdAt).format("llll")}
                        </p>
                      </div>
                    </td>

                    <td className="whitespace-no-wrap hidden  text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                      {moment(order.createdAt).format("llll")}
                    </td>

                    <td className="whitespace-no-wrap px-6 text-right text-xs text-gray-600 lg:text-left">
                      £ {order.payment.transaction.amount}
                      <div className="flex mt-1 ml-auto w-fit items-center text-left text-xs font-semibold lg:hidden">
                        {order.status}
                      </div>
                    </td>
                    <td>
                      <Link to={`/profile/order-details/${order._id}`}>
                        <div className="inline-flex items-center rounded-full bg-dark_gray py-2 px-3 text-xs text-white mr-10">
                          Details
                        </div>
                      </Link>
                    </td>

                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                      <div className="flex flex-row">
                        <div className=" inline-flex items-center text-center text-xs">
                          {order.status}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
