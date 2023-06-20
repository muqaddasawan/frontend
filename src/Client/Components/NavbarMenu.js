import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ProfileDropDown from "./ProfileDropDown";
import { useRef, useState, useEffect } from "react";

import React from "react";
import { Link } from "react-router-dom";

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";

import {
  EnvelopeIcon,
  UserCircleIcon,
  HomeIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  PowerIcon,
  Bars2Icon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { TfiLocationPin } from "react-icons/tfi";
import CountryModal from "./CountryModal";

const navigation = [
  { id: "1", name: "Home", href: "/", icon: HomeIcon },
  { id: "2", name: "Contact", href: "/contact", icon: EnvelopeIcon },
  { id: "3", name: "Faq", href: "/faq", icon: InformationCircleIcon },
  { id: "4", name: "About", href: "/about", icon: Bars2Icon },
];

const NavbarMenu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clientname, setclientname] = useState("");

  useEffect(() => {
    setclientname(localStorage.getItem("clientname"));
  });

  return (
    <>
      <div className="z-40 bg-white sticky inset-x-0 top-0 px-5 shadow-2xl shadow-slate-900">
        {/* <CountryModal /> */}
        <header>
          <nav
            className="flex  items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <h2 className="font-bold">The Baklava Box</h2>
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <>
                  <Link
                    key={item.id}
                    to={item.href}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    <MenuItem className=" text-base flex items-center gap-2 lg:rounded-full">
                      {React.createElement(item.icon, {
                        className: "h-[18px] w-[18px]",
                      })}
                      {item.name}
                    </MenuItem>
                  </Link>
                </>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <div className="text-sm font-semibold leading-6 text-gray-900">
                {clientname ? (
                  <ProfileDropDown clientname={clientname} />
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
          </nav>
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <h2 className="font-bold">The Baklava Box</h2>
                  <hr />
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="py-6">
                    <div className="text-sm font-semibold leading-6 text-gray-900">
                      {clientname ? (
                        <ProfileDropDown clientname={clientname} />
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
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <div key={item.id}>
                        <Link
                          key={item.id}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </header>
      </div>
    </>
  );
};
export default NavbarMenu;
