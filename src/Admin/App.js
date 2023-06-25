import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import ProtectedAdminRoutes from "../Services/protectedAdminRoutes";

import {
  Ecommerce,
  Orders,
  Editor,
  AddProducts,
  Subscribers,
  AllOrders,
  AllProducts,
  ProductDetails,
  OrderDetails,
  UpdateProduct,
  ContactMessage,
} from "./pages";

import { Navbar, Footer, Sidebar } from "./components";

import { useStateContext } from "./contexts/ContextProvider";

import "./index.css";
const Index = () => {
  const { activeMenu } = useStateContext();
  return (
    <div>
      <div className="flex relative dark:bg-main-dark-bg">
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
            activeMenu ? "md:ml-72" : "flex-2"
          }`}
        >
          <div className="fixed md:static dark:bg-main-dark-bg bg-main-bg navbar w-full">
            <Navbar />
          </div>
          <div>
            <Routes>
              {/* Dashboard */}
              {/* <Route path="/" element={<Ecommerce />} /> */}
              <Route path="/" element={<AllOrders />} />
              <Route path="/ecommerce" element={<ProtectedAdminRoutes />}>
                <Route path="/ecommerce" element={<Ecommerce />} />
              </Route>
              <Route path="/ecommerce" element={<AllOrders />} />
              <Route path="/all-orders" element={<AllOrders />} />
              <Route path="/add-products" element={<AddProducts />} />
              <Route path="/all-products" element={<AllProducts />} />
              <Route path="/singleproduct/:id" element={<ProductDetails />} />
              <Route path="/update-product/:id" element={<UpdateProduct />} />
              <Route path="/orders-details" element={<Orders />} />
              <Route
                path="/order-summary/:orderId"
                element={<OrderDetails />}
              />

              <Route path="/Subscribers" element={<Subscribers />} />
              <Route path="/contact-message" element={<ContactMessage />} />

              {/* Pages */}

              {/* Apps */}
              <Route path="/editor" element={<Editor />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
