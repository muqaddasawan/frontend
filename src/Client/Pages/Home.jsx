import React from "react";
import CountrySelect from "../Components/CountrySelect";
import ImageSlider from "../Components/ImageSlider";
import Products from "../Components/Products";
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
