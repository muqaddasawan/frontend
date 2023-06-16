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
} from "./pages";

import { Navbar, Footer, Sidebar, ThemeSettings, Navbar2 } from "./components";

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
              <Route path="/" element={<Ecommerce />} />
              <Route path="/ecommerce" element={<ProtectedAdminRoutes />}>
                <Route path="/ecommerce" element={<Ecommerce />} />
              </Route>
              <Route path="/ecommerce" element={<Ecommerce />} />
              <Route path="/all-orders" element={<AllOrders />} />
              <Route path="/add-products" element={<AddProducts />} />
              <Route path="/all-products" element={<AllProducts />} />
              <Route path="/singleproduct/:id" element={<ProductDetails />} />
              <Route path="/orders-details" element={<Orders />} />

              <Route path="/Subscribers" element={<Subscribers />} />

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
