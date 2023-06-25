import React from "react";
import { useParams } from "react-router-dom";
import axios from "../../Services/axiosInterceptor";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserOrderDetails = () => {
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const navigate = useNavigate();

  const handleStarClick = (e) => {
    setCurrentValue(e);
    console.log(e);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const [singleOrder, setSingleOrder] = useState("");
  const [getfeedback, setGetFeedback] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const params = useParams();
  const orderId = params.orderId;

  const buyer = localStorage.getItem("clientId");

  const [feedback, setFeedback] = useState({
    buyer,
    comment: comment,
    rating: rating,
    order: orderId,
  });

  const submitFeedback = async (e) => {
    e.preventDefault();
    console.log(feedback);
    try {
      const response = await axios.post("api/feedback/create", feedback);
      if (response.status === 201) {
        alert("Feedback Submitted");
        navigate("/profile/userorders");
      }
    } catch (error) {
      alert(error);
    }
  };

  const colors = {
    orange: "#FFBA5A",
    gray: "#a9a9a9",
  };

  const getSingleOrder = async () => {
    try {
      const { data } = await axios.get(`/api/braintree/order/${orderId}`);
      console.log(data);
      setSingleOrder(data);
      console.log(data);
    } catch (error) {}
  };

  const getOrderFeedback = async () => {
    try {
      const { data } = await axios.get(
        `/api/feedback/order_feedback/${orderId}`
      );
      if (data.length === 0) {
        setGetFeedback("");
        console.log("Feedback not found");
      } else {
        setGetFeedback(data);
      }
    } catch (error) {}
  };

  //Get Feedback
  useEffect(() => {
    if (!getfeedback) {
      getOrderFeedback();
    } else {
      console.log("Feedback second found");
      console.log(getfeedback);
    }
  }, [getfeedback]);

  //Fetch order
  useEffect(() => {
    if (!singleOrder) {
      getSingleOrder();
    }
  }, [singleOrder]);

  return (
    <div>
      <section className="w-full pt-12 pb-6 overflow-hidden bg-blueGray-100">
        <div className="container px-4 mx-auto">
          <div className="mb-8 pb-8 border-b border-gray-200 border-opacity-40">
            <h1 className="text-center text-3xl xl:text-4xl font-heading font-medium">
              Order Details
            </h1>
          </div>

          {!singleOrder ? (
            console.log("Fetching")
          ) : (
            <div className="flex flex-wrap -mx-4 mb-6 xl:mb-24 w-full">
              {singleOrder.map((order, i) => (
                <div>
                  <div key={i} className="w-full px-4 mb-5 md:mb-0">
                    <div className="py-12 px-8 md:px-12 bg-white rounded-3xl">
                      <span className="inline-block text-darkBlueGray-300 font-medium mb-6 text-2xl">
                        {order.products.length} products
                      </span>
                      <div className="xl:px-10">
                        {order.products.map((product, i) => (
                          <div className="relative flex flex-wrap items-center xl:justify-between -mx-4 mb-8 pb-8 border-b border-gray-200 border-opacity-40">
                            <div className="relative w-full md:w-auto px-4 mb-6 xl:mb-2">
                              <div className="block mx-auto max-w-max">
                                <img
                                  className="h-28 object-cover"
                                  src={`https://api.thebaklavaboxx.co.uk/${product.image}`}
                                  alt="Image Not Found"
                                />
                              </div>
                            </div>
                            <div className="w-full md:w-auto px-4 mb-6 xl:mb-2">
                              <div className="block mb-5 text-xl font-heading font-medium">
                                {product.name}
                              </div>
                            </div>
                            <div className="w-full xl:w-auto px-4 mb-6 xl:mb-0 mt-6 xl:mt-0">
                              <div className="flex items-center">
                                <h4 className="mr-4 font-heading font-medium">
                                  Qty:
                                </h4>
                                <div className="w-16 px-3 py-2 text-center placeholder-gray-400 text-gray-400 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl">
                                  {product.quantity}
                                </div>
                              </div>
                            </div>
                            <div className="w-full xl:w-auto px-4">
                              <span className="text-xl font-heading font-medium text-blue-500">
                                <span className="text-sm">£</span>
                                <span>{product.itemTotal}</span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <div className="mb-14">
                      <h2 className="mb-7 md:mt-6 text-3xl font-heading font-medium">
                        Order totals
                      </h2>
                      <div className="flex items-center justify-between py-4 px-10 mb-3 leading-8 bg-white bg-opacity-50 font-heading font-medium rounded-3xl">
                        <span>Subtotal: </span>
                        <span className="flex items-center text-xl">
                          <span className="mr-2 ml-5 text-lg">£</span>
                          <span>{order.payment.transaction.amount}</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-4 px-10 mb-3 leading-8 bg-white bg-opacity-50 font-heading font-medium rounded-3xl">
                        <span>Shipping</span>
                        <span className="flex items-center text-xl">
                          <span className="mr-2 ml-5 text-lg">£ </span>
                          <span>10</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-4 px-10 mb-6 leading-8 bg-white font-heading font-medium rounded-3xl">
                        <span>Total</span>
                        <span className="flex items-center text-xl text-blue-500">
                          <span className="mr-2 ml-5 text-lg">£ </span>
                          <span>
                            {parseFloat(order.payment.transaction.amount) + 10}
                          </span>
                        </span>
                      </div>
                    </div>

                    {order.status === "Cancelled" ? (
                      <div className="text-center font-2xl font-semibold mb-4 bg-orange-800 text-white rounded-full p-3">
                        <h2>Current Status : {order.status}</h2>
                      </div>
                    ) : (
                      <div className="text-center font-2xl font-semibold mb-4 bg-blue-gray-50 rounded-full p-3">
                        <h2>Current Status : {order.status}</h2>
                      </div>
                    )}

                    {order.status === "Deliverd" ? (
                      <>
                        {!getfeedback ? (
                          <form>
                            <div>
                              <label
                                for="message"
                                className="block m-4 text-2xl text-center border-b font-medium text-gray-900 dark:text-white"
                              >
                                Submit Your Feedback
                              </label>
                              <div className="flex flex-row m-4 items-center text-center gap-1">
                                <p>Star Rating : </p>
                                {stars.map((_, index) => (
                                  <div key={index} className="cursor-pointer">
                                    <FaStar
                                      size={25}
                                      color={
                                        (hoverValue || currentValue) > index
                                          ? colors.orange
                                          : colors.gray
                                      }
                                      onClick={() => handleStarClick(index + 1)}
                                      onMouseOver={() =>
                                        handleMouseOver(index + 1)
                                      }
                                      onMouseLeave={handleMouseLeave}
                                    />
                                  </div>
                                ))}
                              </div>
                              <div></div>
                              <textarea
                                id="message"
                                rows="6"
                                name="comment"
                                className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write your thoughts here..."
                                onChange={(e) =>
                                  setFeedback({
                                    ...feedback,
                                    [e.target.name]: e.target.value,
                                  })
                                }
                              ></textarea>
                              <div className="text-center font-2xl font-semibold mb-4 bg-dark_gray text-white rounded-2xl p-4 my-5">
                                <button onClick={submitFeedback}>
                                  Submit Feedback
                                </button>
                              </div>
                            </div>
                          </form>
                        ) : (
                          <>
                            <p className="m-3 text-lg font-semibold text-center">
                              Feedback Already submitted for this order
                            </p>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="text-center md:text-left">
                      <h4 className="mb-5 text-3xl font-heading font-medium">
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

export default UserOrderDetails;
