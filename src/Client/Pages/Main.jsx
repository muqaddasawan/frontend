import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Contact from "../Pages/Contact";
import About from "../Pages/About";
import Faq from "../Pages/Faq";
import Privacy from "../Pages/Privacy";
import NotFound from "../Pages/NotFound";
import Checkout from "../Pages/Checkout";
import Footer from "../Components/Footer";
import Newsletter from "../Components/Newsletter";
import NavbarMenu from "../Components/NavbarMenu";
import CountryModal from "../Components/CountryModal";
import Profile from "./Profile";
import UserOrders from "../Components/UserOrders";
import UserOrderDetails from "./UserOrderDetails";
import UserShipping from "../Components/UserShipping";
import { CartProvider } from "react-use-cart";
import ProtectedclientRoutes from "../../Services/protectedRoutes";

const Main = () => {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <CartProvider>
        <NavbarMenu />
        {/* <button>
        <CartIcon />
      </button> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/checkout" element={<Checkout />} /> */}
          <Route path="/faq" element={<Faq />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="" element={<ProtectedclientRoutes />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Profile/userorders" element={<UserOrders />} />
            <Route path="/profile/shipping" element={<UserShipping />} />
            <Route
              path="/profile/order-details/:orderId"
              element={<UserOrderDetails />}
            />
          </Route>
        </Routes>
        <Newsletter />
        <Footer />
      </CartProvider>
    </div>
  );
};

export default Main;
