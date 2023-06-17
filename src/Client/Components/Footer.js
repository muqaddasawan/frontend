import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="flex flex-col space-y-10 justify-center pb-4">
        <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
          <Link className="hover:text-gray-900" to="/">
            Home
          </Link>
          <Link className="hover:text-gray-900" to="/about">
            About Us
          </Link>
          <Link className="hover:text-gray-900" to="/contact">
            Contact Us
          </Link>
          <Link className="hover:text-gray-900" to="/privacy">
            Privacy Policy
          </Link>
          <Link className="hover:text-gray-900" to="/faq">
            FAQ
          </Link>
          <Link className="hover:text-gray-900" to="/checkout">
            CheckOut
          </Link>
        </nav>

        <div className="flex justify-center space-x-5">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-blue-600 text-3xl">
              <FaFacebook />
            </div>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-blue-600 text-3xl">
              <FaTwitter />
            </div>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-3xl">
              <FaInstagram />
            </div>
          </a>
          <a
            href="https://messenger.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-red-600 text-3xl">
              <FaYoutube />
            </div>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-blue-600 text-3xl">
              <FaLinkedin />
            </div>
          </a>
        </div>
        <p className="text-center text-gray-700 font-medium">
          &copy; 2023 The Baklava Box. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
