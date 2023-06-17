import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";

const Cart = ({ showCart }) => {
  const [open, setOpen] = useState(true);
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    cartTotal,
    removeItem,
  } = useCart();

  function closeCart() {
    showCart();
    setOpen(false);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => closeCart()}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {isEmpty ? (
                        <div className="mt-5">
                          <hr />
                          <p className="text-center mt-5 font-semibold">
                            Your shopping cart is is empty, Select box for
                            shopping
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div className="mt-3">
                            <div className="flow-root">
                              <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200"
                              >
                                {items.map((item) => (
                                  <li key={item.id} className="flex py-6 mb-3">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={`http://localhost:8000/${item.image}`}
                                        alt={item.imageAlt}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <a href={item.href}>{item.name}</a>
                                          </h3>
                                          <p className="ml-4">£ {item.price}</p>
                                        </div>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <button
                                          onClick={() =>
                                            updateItemQuantity(
                                              item.id,
                                              item.quantity - 1
                                            )
                                          }
                                        >
                                          -
                                        </button>
                                        <p className="text-gray-500">
                                          Qty {item.quantity}
                                        </p>
                                        <button
                                          onClick={() =>
                                            updateItemQuantity(
                                              item.id,
                                              item.quantity + 1
                                            )
                                          }
                                        >
                                          +
                                        </button>
                                        <div className="flex">
                                          <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                            onClick={() => {
                                              removeItem(item.id);
                                            }}
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <p>Subtotal</p>
                              <p>£ {cartTotal}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">
                              Total products price
                            </p>
                            <div className="mt-6">
                              <Link
                                to="/checkout"
                                className="flex items-center justify-center rounded-md border border-transparent bg-dark_gray px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray_light"
                              >
                                <button onClick={() => closeCart()}>
                                  {" "}
                                  Checkout
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cart;
