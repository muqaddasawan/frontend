import { AiOutlineMenu } from "react-icons/ai";
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import DropDownAdminProfile from "./DropDownAdminProfile";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={customFunc}
    style={{ color }}
    content={title}
    position="BottomCenter"
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
    {icon}
  </button>
);

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setscreenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setscreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const [adminname, setadminname] = useState("");

  useEffect(() => {
    setadminname(localStorage.getItem("adminname"));
  });

  return (
    <div className="pt-3 flex relative justify-between md:overflow-hidden bg-white">
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((preActiveMenu) => !preActiveMenu)}
        color="blue"
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        {/* <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          color="blue"
          icon={<FiShoppingCart />}
        />
        <NavButton
          title="Chat"
          dotColor="#03C9D7"
          customFunc={() => handleClick("chat")}
          color="blue"
          icon={<BsChatLeft />}
        /> */}
        {/* <NavButton
          title="Notifications"
          dotColor="#03C9D7"
          customFunc={() => handleClick("notification")}
          color="blue"
          icon={<RiNotification3Line />}
        /> */}
        <div className="overflow-hidden lg:flex lg:flex-1 lg:justify-end mr-6">
          <div className="text-sm font-semibold leading-6 text-gray-900">
            {adminname ? (
              <DropDownAdminProfile adminname={adminname} />
            ) : (
              <Link
                to="/user/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </div>

        {/* {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />} */}
      </div>
    </div>
  );
};

export default Navbar;
