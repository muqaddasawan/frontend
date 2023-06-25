import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminname");
    navigate("/admin-user/login");
  };

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "font-bold flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text:gray-200 dark:hover:text-black hover:bg-light-gray m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text:gray-200 dark:hover:text-black hover:bg-light-gray m-2";
  return (
    <div className="bg-white z-50 pt-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center md:overflow-hidden z-50 relative">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-7 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <h2>The Baklava Box</h2>
            </Link>
            <button
              type="button"
              onClick={() => setActiveMenu((preActiveMenu) => !preActiveMenu)}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 mb-16 block md:hidden"
            >
              {/* <MdOutlineCancel /> */}
            </button>
          </div>
          <div className="mt-10  overflow-hidden">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={`${link.link}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
            <button
              onClick={handleLogout}
              className="bg-dark_gray items-center w-full -mr-1 -ml-1 p-4"
            >
              <p className="text-white uppercase text-base font-semibold">
                Logout
              </p>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
