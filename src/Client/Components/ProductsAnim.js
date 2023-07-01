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
import { useCart } from "react-use-cart";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TfiLocationPin } from "react-icons/tfi";

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

  const [cityname, setcityname] = useState("");
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    const city = localStorage.getItem("City");
    setcityname(city);
    if (!city) {
      console.log("not found");
      setOpen(true);
      countryProduct(city);
    } else {
      // console.log(city);
      countryProduct(city);
    }
  });

  // localStorage.removeItem("City");

  function handleupdate() {
    setOpen(true);
  }

  const showCart = () => {
    setcartOpen((current) => !current);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const city = localStorage.getItem("City");
    axios
      .get("/api/products/city-products/" + city)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const countryProduct = (cityname) => {
    // alert(data);
    axios
      .get("/api/products/city-products/" + cityname)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <div className="text-center p-10">
          <h1 className="font-bold text-2xl mb-4">Baklava Box Order now</h1>
          <div className="inline-flex gap-3">
            <button
              className="text-base font-semibold rounded-lg p-2 bg-dark_gray text-white hover:shadow-xl"
              onClick={() => {
                handleupdate();
              }}
            >
              Change City
            </button>
            <TfiLocationPin size={25} color="blue" />
            <h2 className="inline-flex text-xl">
              <span>{cityname}</span>
            </h2>
          </div>
        </div>
        {/* <CountrySelect countryProduct={countryProduct} /> */}
        <div className="">{cartOpen && <Cart showCart={showCart} />}</div>
        <section
          id="Projects"
          className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
        >
          {products.map((item, i) => (
            <div className="card" key={i}>
              <div className="card-content ">
                <img
                  src={`https://api.thebaklavaboxx.co.uk/${item.thumbnail}`}
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
                  {/* <button className="text-lg hover:shadow-lg shadow-gray_light font-semibold bg-dark_gray rounded-2xl p-2">
                    Buy Now
                  </button> */}
                  <button
                    onClick={(e) => {
                      const product = [
                        {
                          id: item._id,
                          _id: item._id,
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
                    className="bg-dark_gray text-lg shadow-lg text-white font-semibold rounded-2xl p-2"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* <div className="card">
            <div className="card-content ">
              <img
                src="https://www.pngmart.com/files/17/Bakery-Food-Transparent-PNG.png"
                alt="Image Not Found"
                className="card-img"
              />
              <h1 className="card-title p-2 text-black font-semibold">
                Cup Cakes
              </h1>
              <div className="card-body">
                <div className="card-star">
                <span className="rating-value text-black">4.5</span>
                <span className="star">&#9733;</span>
              </div>
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
          </div> */}
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

      <div className="absolute top-0 ">
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray text-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="flex flex-col gap-4">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Please choose your location:
                          </Dialog.Title>
                          <p className="text-center">
                            Baklavabox provides location base products to
                            maintain quality
                          </p>
                          <select
                            name="cities"
                            id="cities"
                            className=" rounded-md bg-dark_gray text-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                            onChange={(e) => {
                              localStorage.setItem("City", e.target.value);
                              setcityname(e.target.value);
                              setOpen(false);
                            }}
                          >
                            <option>Select Your City</option>
                            <option value="Luton">Luton</option>
                            <option value="Dunstable">Dunstable</option>
                            <option value="Hitchin">Hitchin</option>
                            <option value="Hemel Hempstead">
                              Hemel Hempstead
                            </option>
                            <option value="Watford">Watford</option>
                            <option value="St Albans">St Albans</option>
                            <option value="Bedford">Bedford</option>
                            <option value="Milton Keynes">Milton Keynes</option>
                            <option value="Other City">Other City</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-dark_gray text-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => {
                          setOpen(false);
                        }}
                        ref={cancelButtonRef}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
};

export default ProductsAnim;
