import React from "react";
import { Link } from "react-router-dom";
import axios from "../../Services/axiosInterceptor";
import mainaxios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientRegister = () => {
  const navigate = useNavigate();
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
    clientname: "",
    email: "",
    city: "Luton",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const response = await axios.post("/api/auth/client/register", input);
      alert(response.data.message);
      if (response.status === 201) {
        localStorage.setItem("City", input.city);
        navigate("/user/login");
      }
    } catch (error) {
      document.getElementById("alertdiv").classList.remove("hidden");
      const message = error.response.data.message;
      document.getElementById("alert").innerHTML = message;
    }
  };

  function closeAlert() {
    document.getElementById("alertdiv").classList.add("hidden");
  }

  return (
    <div className="mt-4 mb-4 mx-1">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="text-center text-3xl font-bold">Welcome</p>
          <p className="mt-2 text-center text-sm mb-2">Create New account.</p>
          <div id="alertdiv" className="hidden">
            <div className="flex p-3 justify-between rounded-md bg-red-400 text-white">
              <p id="alert" className="text-base"></p>
              <button className="font-bold text-2xl" onClick={closeAlert}>
                X
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border p-3 rounded-lg">
          <form
            onSubmit={handleRegister}
            className="flex flex-col pt-3 md:pt-8"
          >
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition focus-within:ring-blue-600">
                <input
                  type="text"
                  id="client-name"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400  focus:outline-none"
                  placeholder="Name"
                  name="clientname"
                  value={input.clientname}
                  onChange={(e) =>
                    setinput({
                      ...input,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex flex-col pt-4">
              <p className="m-4">* Please Choose Your Location</p>
              <div className="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition text-gray-700">
                <select
                  id="city"
                  name="city"
                  className=" border-gray-300 text-sm rounded-lg block w-full p-2.5"
                  value={input.city}
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
            </div>

            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-lg border focus-within:border-transparent focus-within:ring-2 transition focus-within:ring-blue-600">
                <span className="inline-flex items-center border-r border-gray-300 bg-white px-3 text-sm text-gray-500 shadow-sm">
                  <svg
                    width="15"
                    height="15"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                  </svg>
                </span>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400  focus:outline-none"
                  placeholder="Email"
                  value={input.email}
                  onChange={(e) =>
                    setinput({
                      ...input,
                      [e.target.name]: e.target.value.toLowerCase(),
                    })
                  }
                />
              </div>
            </div>
            <div className="mb-12 flex flex-col pt-4">
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
                  id="login-password"
                  name="password"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400  focus:outline-none"
                  placeholder="Password"
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
              <span className="w-full"> Register </span>
            </button>
          </form>
          <div className="pt-12 pb-12 text-center">
            <p className="whitespace-nowrap">
              Already have an account?
              <Link to="/user/login" className="font-semibold underline">
                Login here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientRegister;
