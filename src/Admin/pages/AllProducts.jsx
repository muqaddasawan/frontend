import React from "react";
import { useEffect, useState } from "react";
import axios from "../../Services/axiosInterceptor";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("api/products/all-products")
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteProduct = (id) => {
    // alert(id);
    console.log(id);
  };

  return (
    <div className="">
      <div className="mx-auto mt-8 max-w-screen-lg px-2 overflow-hidden">
        <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
          <p className="flex-1 text-xl font-bold text-center  text-gray-900">
            All Products
          </p>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border shadow">
          <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
            <thead className="hidden border-b lg:table-header-group">
              <tr className="">
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                  Product Name
                </td>
                <td
                  width="50%"
                  className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
                >
                  Price
                </td>
                <td
                  width="50%"
                  className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
                >
                  City
                </td>

                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                  Details
                </td>
              </tr>
            </thead>

            <tbody className="lg:border-gray-300">
              {products.map((item, i) => (
                <tr className="divide-y" key={i}>
                  <td
                    width="50%"
                    className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
                  >
                    {item.name}
                    <img
                      className="h-20 w-20"
                      src={`http://localhost:9000/${item.thumbnail}`}
                    />
                    <div className="mt-1 lg:hidden">
                      <p className="font-normal text-gray-500">${item.price}</p>
                    </div>
                    <div className="mt-1 lg:hidden">
                      <p className="font-normal text-gray-500">{item.city}</p>
                    </div>
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    <p className="font-normal text-gray-500">${item.price}</p>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    <p className="font-normal text-gray-500">{item.city}</p>
                  </td>

                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                    <button
                      className="flex mt-1 ml-auto w-fit items-center rounded-full bg-red-700 py-2 px-3 text-left text-md font-medium text-white lg:hidden"
                      onClick={() => deleteProduct(item._id)}
                    >
                      Delete
                    </button>
                    <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-dark_gray py-2 px-3 text-left text-md font-medium text-white lg:hidden">
                      Details
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    <div className="flex gap-2">
                      <button
                        className="items-center rounded-xl  bg-red-700 py-2 px-3 text-md text-white"
                        onClick={() => deleteProduct(item._id)}
                      >
                        Delete
                      </button>
                      <Link
                        className="inline-flex items-center rounded-xl  bg-dark_gray py-2 px-3 text-md text-white"
                        to={"/admin/singleproduct/" + item._id}
                      >
                        Details
                      </Link>
                    </div>
                  </td>
                  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                </tr>
              ))}

              {/* <tr className="">
                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                  <p className="font-normal text-gray-500">07 February, 2026</p>
                </td>

                <td
                  width="50%"
                  className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
                >
                  Standard Plan - Feb 202
                  <div className="mt-1 lg:hidden">
                    <p className="font-normal text-gray-500">
                      07 February, 2022
                    </p>
                  </div>
                </td>

                <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                  $59.00
                  <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-dark_gray py-2 px-3 text-left text-md font-medium text-white lg:hidden">
                    Details
                  </div>
                </td>

                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                  <div className="inline-flex items-center rounded-xl  bg-dark_gray py-2 px-3 text-md text-white">
                    Details
                  </div>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
