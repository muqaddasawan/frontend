import React from "react";
import { Link } from "react-router-dom";
import axios from "../../Services/axiosInterceptor";
import mainaxios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("clienttoken");
  let message = "";
  const [input, setinput] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/change-password", input, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        message = response.data.message;
        alert(message);
        localStorage.removeItem("token");
        localStorage.removeItem("clientname");
        navigate("/user/login");
      }
    } catch (error) {
      document.getElementById("alertdiv").classList.remove("hidden");
      message = error.response.data.message;
      document.getElementById("alert").innerHTML = message;
    }
  };

  function closeAlert() {
    document.getElementById("alertdiv").classList.add("hidden");
  }

  return (
    <div className="mt-4 mb-4 mx-1">
      <div className="flex w-full flex-wrap">
        <div className="flex w-full flex-col md:w-1/2 lg:w-1/2">
          <div className="my-auto flex flex-col justify-center px-6 pt-8 sm:px-24 md:justify-start md:px-8 md:pt-0 lg:px-12">
            <p className="text-center text-3xl font-bold">Change Password</p>
            <p className="mt-2 text-center mb-2">Please Enter New Password.</p>
            <div id="alertdiv" className="hidden">
              <div className="flex p-3 justify-between rounded-md bg-red-400 text-white">
                <p id="alert" className="text-base"></p>
                <button className="font-bold text-2xl" onClick={closeAlert}>
                  X
                </button>
              </div>
            </div>
            <form
              onSubmit={handleChangePassword}
              className="flex flex-col pt-3 md:pt-8"
            >
              <div className="mb-2 flex flex-col pt-4">
                <p>Enter New Password</p>
                <div className="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition focus-within:ring-blue-600">
                  <span className="inline-flex items-center border-r border-gray-300 bg-white px-3 text-sm text-gray-500 shadow-sm">
                    <svg
                      width="15"
                      height="15"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                    </svg>
                  </span>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="w-full flex-1 appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400  focus:outline-none"
                    placeholder="New Password"
                    value={input.password}
                    onChange={(e) =>
                      setinput({
                        ...input,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="mb-5 flex flex-col pt-2">
                <p className="m-2">Confirm Password</p>
                <div className="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition focus-within:ring-blue-600">
                  <span className="inline-flex items-center border-r border-gray-300 bg-white px-3 text-sm text-gray-500 shadow-sm">
                    <svg
                      width="15"
                      height="15"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                    </svg>
                  </span>

                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full flex-1 appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400  focus:outline-none"
                    placeholder="Confirm Password"
                    value={input.password}
                    onChange={(e) =>
                      setinput({
                        ...input,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-dark_gray px-4 py-2 text-center text-base font-semibold text-white shadow-md transition ease-in hover:bg-blue-gray-800 focus:outline-none focus:ring-2"
              >
                <span className="w-full"> Change Password </span>
              </button>
            </form>
          </div>
        </div>
        <div className="pointer-events-none hidden select-none bg-black shadow-2xl md:block md:w-1/2 lg:w-1/2">
          <img
            className="h-screen w-full object-cover opacity-90"
            src="https://st.depositphotos.com/2038145/1967/i/950/depositphotos_19678993-stock-photo-cakes-on-display-in-an.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
