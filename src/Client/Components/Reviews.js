import React from "react";
import axios from "../../Services/axiosInterceptor";
import { useEffect, useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("api/feedback/get-all")
      .then(({ data }) => {
        setReviews(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reviews]);
  return (
    <div className="pb-5">
      <div className="container flex flex-col items-center justify-center w-full p-6 mx-auto mt-4 text-center xl:px-0">
        <div className="text-sm font-bold tracking-wider text-indigo-600 uppercase">
          Testimonials
        </div>
        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
          Here&#x27;s what our customers said
        </h2>
        <p className="max-w-2xl py-4 text-xl leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          Customer satisfaction is very important to us. Peek into our latest
          survey and see what our customers are saying about us.
        </p>
      </div>
      <div className="container p-6 mx-auto mb-10 xl:px-0">
        <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
          {reviews.slice(0, 6).map((review, i) => (
            <div key={i}>
              <div className="lg:col-span-2 xl:col-auto">
                <div className="flex flex-col justify-between w-full h-full px-6 py-6 bg-gray-100 dark:bg-gray-800 md:px-14 rounded-2xl md:py-14 dark:bg-trueGray-800">
                  <p className="text-lg leading-normal">{review.comment}</p>
                  <div className="flex items-center mt-8 space-x-3">
                    <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
                      <img
                        alt="Avatar"
                        src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div className="text-lg font-medium">
                        {review.buyer.clientname}
                      </div>
                      {/* <div className="text-gray-600 dark:text-gray-400">
                    VP Sales at Google
                  </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="">
            <div className="flex flex-col justify-between w-full h-full px-6 py-6 bg-gray-100 dark:bg-gray-800 md:px-14 rounded-2xl md:py-14 dark:bg-trueGray-800">
              <p className="text-lg leading-normal">
                A product review is an evaluation of a product that shares the
                reviewer's opinion about its features, performance, quality
              </p>
              <div className="flex items-center mt-8 space-x-3">
                <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
                  <img
                    alt="Avatar"
                    src="https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_person_people_avatar_icon_159366.png"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="text-lg font-medium">Maria</div>
                  {/* <div className="text-gray-600 dark:text-gray-400">
                    Lead marketer at Netflix{" "}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col justify-between w-full h-full px-6 py-6 bg-gray-100 dark:bg-gray-800 md:px-14 rounded-2xl md:py-14 dark:bg-trueGray-800">
              <p className="text-lg leading-normal">
                A product review is an evaluation of a product that shares the
                reviewer's opinion about its features, performance, quality
              </p>
              <div className="flex items-center mt-8 space-x-3">
                <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
                  <img
                    alt="Avatar"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRASacy7DHTTowQ2oNf180d3wev9Sr_u0DzMQ&usqp=CAU"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="text-lg font-medium">M Farhan</div>
                  {/* <div className="text-gray-600 dark:text-gray-400">
                    Co-founder of Acme Inc
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
