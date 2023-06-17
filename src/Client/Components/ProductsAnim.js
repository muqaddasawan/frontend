import { Button } from "@material-tailwind/react";
import React from "react";
import ProductView from "./ProductView";
import { useRef, useState, useEffect } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import "./productanim.css";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import axios from "../../Services/axiosInterceptor";
import CountrySelect from "../Components/CountrySelect";
import { CartProvider, useCart } from "react-use-cart";

const Animate = (e) => {
  e.preventDefault();

  const shopping_cart = document.querySelector(".shopping-cart");
  shopping_cart.classList.add("active");

  let product_count =
    Number(shopping_cart.getAttribute("data-product-count")) || 0;
  shopping_cart.setAttribute("data-product-count", product_count + 1);

  // finding first grand parent of target button
  let target_parent = e.target.parentNode.parentNode.parentNode;
  target_parent.style.zIndex = "220";
  // Creating separate Image
  let img = target_parent.querySelector("img");
  let flying_img = img.cloneNode();
  flying_img.classList.add("flying-img");

  target_parent.appendChild(flying_img);

  // Finding position of flying image

  const flying_img_pos = flying_img.getBoundingClientRect();
  const shopping_cart_pos = shopping_cart.getBoundingClientRect();

  let data = {
    left:
      shopping_cart_pos.left -
      (shopping_cart_pos.width / 2 +
        flying_img_pos.left +
        flying_img_pos.width / 2),
    top: shopping_cart_pos.bottom - flying_img_pos.bottom + 25,
  };

  console.log(data.top);

  flying_img.style.cssText = `
      --left : ${data.left.toFixed(5)}px;
      --top : ${data.top.toFixed(5)}px;
                                `;

  setTimeout(() => {
    target_parent.style.zIndex = "";
    target_parent.removeChild(flying_img);
    shopping_cart.classList.remove("active");
  }, 1000);
};

const ProductsAnim = () => {
  const [cartOpen, setcartOpen] = useState(false);
  const { addItem, totalUniqueItems } = useCart();

  const showCart = () => {
    setcartOpen((current) => !current);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("api/products/city-products/All Country")
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const countryProduct = (cityName) => {
    // alert(data);
    axios
      .get("api/products/city-products/" + cityName)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <CountrySelect countryProduct={countryProduct} />
      <div className="">{cartOpen && <Cart showCart={showCart} />}</div>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {products.map((item, i) => (
          <div className="card" key={i}>
            <div className="card-content ">
              <img
                src={`http://localhost:8000/${item.thumbnail}`}
                alt="Not Found"
                className="card-img"
              />
              <h1 className="card-title text-black font-semibold">
                {item.name}
              </h1>
              <div className="card-body">
                {/* <div className="card-star">
                <span className="rating-value text-black">4.5</span>
                <span className="star">&#9733;</span>
              </div> */}
                <p className="card-price text-black">£ {item.price}</p>
              </div>
              <div className="flex flex-row card-footer gap-2">
                <button className="text-lg hover:shadow-lg shadow-gray_light font-semibold bg-dark_gray rounded-2xl p-2">
                  Buy Now
                </button>
                <button
                  onClick={(e) => {
                    const product = [
                      {
                        id: item._id,
                        name: item.name,
                        image: item.thumbnail,
                        price: item.price,
                        city: item.city,
                        quantity: 1,
                      },
                    ];
                    addItem(product[0]);
                    Animate(e);
                    console.log(product);
                  }}
                  className="bg-gray text-lg shadow-lg text-white font-semibold rounded-2xl p-2"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="card">
          <div className="card-content ">
            <img
              src="https://www.pngmart.com/files/17/Bakery-Food-Transparent-PNG.png"
              alt=""
              className="card-img"
            />
            <h1 className="card-title p-2 text-black font-semibold">
              Cup Cakes
            </h1>
            <div className="card-body">
              {/* <div className="card-star">
                <span className="rating-value text-black">4.5</span>
                <span className="star">&#9733;</span>
              </div> */}
              <p className="card-price text-black">£ 15.99</p>
            </div>
            <div className="flex flex-row card-footer gap-2">
              <button className="text-lg font-semibold bg-dark_gray rounded-2xl p-2">
                Buy Now
              </button>
              <button
                onClick={Animate}
                className="bg-gray flex flex-row text-lg shadow-lg text-white font-semibold rounded-2xl p-2"
              >
                <AiOutlinePlusSquare size={20} /> Add To Cart
              </button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-content ">
            <img
              src="https://www.pngall.com/wp-content/uploads/7/Bakery-PNG.png"
              alt=""
              className="card-img"
            />
            <h1 className="card-title p-2 text-black font-semibold">
              Special Doughnut
            </h1>
            <div className="card-body">
              {/* <div className="card-star">
                <span className="rating-value text-black">4.5</span>
                <span className="star">&#9733;</span>
              </div> */}
              <p className="card-price text-black">£ 14.9</p>
            </div>
            <div className="flex flex-row card-footer gap-2">
              <button className="text-lg font-semibold bg-dark_gray rounded-2xl p-2">
                Buy Now
              </button>
              <button
                onClick={Animate}
                className="bg-gray text-lg shadow-lg text-white font-semibold rounded-2xl p-2"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-content ">
            <img
              src="https://www.pngall.com/wp-content/uploads/7/Bakery-PNG-High-Quality-Image.png"
              alt=""
              className="card-img"
            />
            <h1 className="card-title p-2 text-black font-semibold">
              Fruit Cakes and chocolates
            </h1>
            <div className="card-body">
              {/* <div className="card-star">
                <span className="rating-value text-black">4.5</span>
                <span className="star">&#9733;</span>
              </div> */}
              <p className="card-price text-black">£ 17.0</p>
            </div>
            <div className="flex flex-row card-footer gap-2">
              <button className="text-lg font-semibold bg-dark_gray rounded-2xl p-2">
                Buy Now
              </button>
              <button
                onClick={Animate}
                className="bg-gray text-lg shadow-lg text-white font-semibold rounded-2xl p-2"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <button onClick={showCart}>
        <div className="fixed md:top-1/4 bottom-8 right-0 z-50 bg-dark_gray">
          <div
            className="shopping-cart"
            data-product-count={`${totalUniqueItems}`}
          >
            <span className="cart-icon">&#128722;</span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ProductsAnim;
