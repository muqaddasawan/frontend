import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Contact from "../Pages/Contact";
import About from "../Pages/About";
import Cart from "../Pages/Cart";
import Faq from "../Pages/Faq";
import Privacy from "../Pages/Privacy";
import NotFound from "../Pages/NotFound";
import Checkout from "../Pages/Checkout";
import Footer from "../Components/Footer";
import Newsletter from "../Components/Newsletter";
import NavbarMenu from "../Components/NavbarMenu";
import CartIcon from "../Components/CartIcon";

const Main = () => {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <NavbarMenu />
      {/* <button>
        <CartIcon />
      </button> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Main;
