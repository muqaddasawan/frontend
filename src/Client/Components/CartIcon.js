import { useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import SideOver from "./SideOver";
import Cart from "./Cart";

const CartIcon = () => {
  const [cartOpen, setcartOpen] = useState(false);
  const cartref = useRef(null);

  const showCart = () => {
    setcartOpen((current) => !current);
  };
  return (
    <button onClick={showCart} cartref={cartref}>
      <div className="">{cartOpen && <Cart showCart={showCart} />}</div>
      <div className="right-4 text-center bg-dark_gray h-22 w-18 overflow-hidden z-50 text-white shadow-md hover:shadow-black  shadow-blue-gray-500 cursor-pointer fixed top-1/2 md:top-1/3 -mr-3 flex-col items-center justify-center rounded-l-md p-2 pt-3.5 font-semibold text-light flex">
        <div className="pb-1 px-4">
          <FaShoppingCart size={25} />
        </div>
        <p className=" bg-gray_light p-1 text-md text-dark_gray rounded-md">
          88 items
        </p>
        <p className="text-center text-md">$2000</p>
      </div>
    </button>
  );
};

export default CartIcon;
