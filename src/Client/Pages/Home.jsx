import React from "react";
import Reviews from "../Components/Reviews";
import AutoSlider from "../Components/AutoSlider";
import ProductsAnim from "../Components/ProductsAnim";

// import ProductsSecond from "../Components/ProductsSecond";

function Home() {
  return (
    <div>
      <AutoSlider />
      <ProductsAnim />
      <Reviews />
    </div>
  );
}

export default Home;
