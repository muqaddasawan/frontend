import React from "react";
import { useState, useEffect } from "react";
import axios from "../../Services/axiosInterceptor";
import mainaxios from "axios";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    message: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleContact = async (e) => {
    e.preventDefault();
    try {
      if (contact.email) {
        const data = await axios.post("/api/contact/submit-contact", contact);
        alert("Message submitted");
        navigate("/");
      } else {
        alert("Email is Required");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="m-5">
        <h1 className="text-center text-3xl font-bold underline">Contact Us</h1>
        <p className="text-lg m-5">
          Please contact us by entering your information in the fields below. We
          are frequently active on Instagram, so you can also DM us there.
          Alternatively give us a call on Telephone -01582 206885 Instagram -
          @thebaklavaboxx
        </p>
      </div>
      <div className="m-10">
        <h2 className="text-2xl text-gray-500 font-semibold mb-2">
          Contact Us
        </h2>
        <form id="contact_form" onSubmit={handleContact}>
          <div className="flex mb-5">
            <div className="w-1/2 mr-2">
              <label
                htmlFor="name_field"
                className="block text-base text-gray-500"
              >
                Name
              </label>
              <input
                className="mt-4 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                type="text"
                name="name"
                placeholder="Name"
                id="name_field"
                onChange={(e) =>
                  setContact({
                    ...contact,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="email_field"
                className="block text-base text-gray-500"
              >
                Email *
              </label>
              <input
                className="mt-4 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                type="email"
                name="email"
                placeholder="Email"
                id="email_field"
                onChange={(e) =>
                  setContact({
                    ...contact,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex mb-5">
            <div className="w-full">
              <label
                htmlFor="phone_field"
                className="block text-base text-gray-500"
              >
                Phone Number
              </label>
              <input
                className="mt-4 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                type="text"
                name="phone"
                placeholder="Contact Number"
                id="phone_field"
                onChange={(e) =>
                  setContact({
                    ...contact,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="message_field"
              className="block text-base text-gray-500"
            >
              Message
            </label>
            <textarea
              className="mt-4 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
              name="message"
              placeholder="Message"
              id="message_field"
              rows="6"
              onChange={(e) =>
                setContact({
                  ...contact,
                  [e.target.name]: e.target.value,
                })
              }
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-dark_gray py-2 px-4 rounded border-gray-400 shadow-sm text-gray-200 text-white hover:bg-gray"
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
