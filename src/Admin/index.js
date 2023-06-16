import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.css";
import { ContextProvider } from "./contexts/ContextProvider";
const index = () => {
  return (
    <ContextProvider>
      <App />
    </ContextProvider>
  );
};

export default index;
