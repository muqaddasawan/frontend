import React from "react";
import axios from "../../Services/axiosInterceptor";
import { useEffect, useState } from "react";

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/subscriber/all-subscribers")
      .then(({ data }) => {
        setSubscribers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [subscribers]);
  return (
    <div className="mt-12">
      <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="font-semibold text-gray-700">Subscribers</h2>
            <span className="text-xs text-gray-500">Emails of subscribers</span>
          </div>
        </div>
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">#</th>
                  <th className="px-5 py-3">Email</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {subscribers.map((subscriber, i) => (
                  <tr key={i}>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{i + 1}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="whitespace-no-wrap">
                            {subscriber.email}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribers;
