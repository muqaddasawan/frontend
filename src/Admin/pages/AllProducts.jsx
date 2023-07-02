import React from "react";
import { useEffect, useState } from "react";
import axios from "../../Services/axiosInterceptor";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (products.length === 0) {
      axios
        .get("api/products/all-products")
        .then(({ data }) => {
          setProducts(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [products]);

  const deleteProduct = async (id) => {
    try {
      let answer = window.prompt(
        "Are You sure you want to delete this product? type = yes"
      );
      if (answer && answer === "yes") {
        const { response } = await axios.delete(
          `api/products/delete-product/${id}`
        );
        alert("Prodcut Deleted Successfully");
        navigate("/admin/all-products");
      } else {
        alert("Product not deleted");
        return;
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="">
      <div className="mx-auto mt-20  max-w-screen-lg px-2 overflow-hidden">
        <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
          <p className="flex-1 border-t mt-2 text-xl font-bold text-center  text-gray-900">
            All Products
          </p>
        </div>

        <div className="mt-6 overflow-hidden mb-4 rounded-xl border shadow">
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
                <tr className="divide-y border-b" key={i}>
                  <td
                    width="50%"
                    className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
                  >
                    <div className="w-auto flex-wrap">
                      <h2 className="text-sm mb-3">{item.name}</h2>

                      <img
                        className="h-20 w-20 rounded-lg"
                        src={`https://api.thebaklavaboxx.co.uk/${item.thumbnail}`}
                      />
                    </div>
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
                    <Link
                      className="flex mt-1 ml-auto w-fit items-center rounded-full bg-dark_gray py-2 px-3 text-left text-md font-medium text-white lg:hidden"
                      to={"/admin/update-product/" + item._id}
                    >
                      Update
                    </Link>
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
                        to={"/admin/update-product/" + item._id}
                      >
                        Update
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
