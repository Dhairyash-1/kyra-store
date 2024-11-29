import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

import { Separator } from "@/components/ui/separator";
import useCart from "@/hooks/useCart";

const CartPage = () => {
  const {
    handleIncrement,
    totalPrice,
    handleDecrement,
    handleRemoveFromCart,
    items,
  } = useCart();

  return (
    <div className="mt-8 md:px-20">
      <h1 className="text-4xl font-normal text-dark-500">Shopping Cart</h1>

      <div className="mt-8 flex flex-col md:flex-row md:justify-between">
        {/* Cart Items Section */}
        <div className="flex-grow">
          {/* Column Headers */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_50px] gap-4 border-b pb-4">
            <div className="text-lg font-normal text-dark-500">Product</div>
            <div className="text-lg font-normal text-dark-500">Price</div>
            <div className="text-lg font-normal text-dark-500">Quantity</div>
            <div className="text-lg font-normal text-dark-500">Subtotal</div>
            <div></div> {/* Empty for Delete Icon */}
          </div>

          {/* Cart Items */}
          <div className="mt-4 space-y-4">
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_50px] items-center gap-4">
                  {/* Product Column */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-24 rounded-md bg-gray-5 object-contain p-1"
                    />
                    <h4 className="font-medium text-dark-500">{item.name}</h4>
                  </div>

                  {/* Price Column */}
                  <div className="font-medium text-dark-500">
                    ₹{item.price.toFixed(2)}
                  </div>

                  {/* Quantity Column */}
                  <div className="flex items-center justify-between  rounded-lg border-2 border-dark-500 px-3 py-3 sm:w-auto">
                    <MinusIcon
                      className="hover:text-dark-700 cursor-pointer text-dark-500"
                      onClick={() => handleDecrement(item)}
                    />
                    <span className="font-medium">{item.quantity}</span>
                    <PlusIcon
                      className="hover:text-dark-700 cursor-pointer text-dark-500"
                      onClick={() => handleIncrement(item)}
                    />
                  </div>

                  {/* Subtotal Column */}
                  <div className="font-medium text-dark-500">
                    ₹{(item.quantity * item.price).toFixed(2)}
                  </div>

                  {/* Delete Column */}
                  <div>
                    <TrashIcon
                      className="cursor-pointer text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveFromCart(item.id)}
                    />
                  </div>
                </div>

                {/* Separator Line */}
                <Separator className="my-4" />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Subtotal Section */}
        <div className="mt-8 w-full rounded-md border border-gray-200 p-6 shadow-sm md:ml-8 md:mt-0 md:w-1/3">
          <div className="flex justify-between">
            <h2 className="text-lg font-bold text-dark-500">Subtotal</h2>
            <span className=" font-bold text-dark-500">
              ₹{totalPrice?.toFixed(2)}
            </span>
          </div>
          <Separator className="mt-4" />

          <div className="mt-4 space-y-2">
            <label htmlFor="coupon" className="font-normal text-dark-80">
              Enter Discount Code
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="coupon"
                placeholder="Enter coupon code"
                className="w-full rounded-l-md border border-gray-300 p-3 text-dark-500"
              />
              <button className="hover:bg-dark-600 rounded-r-md border border-dark-500 bg-dark-500 px-6  py-3 font-normal text-white">
                Apply
              </button>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-base font-normal text-dark-500">
              Delivery Charge:
            </span>
            <span className="text-base font-normal text-dark-500">₹{50.0}</span>
          </div>

          <div className="mt-4 flex justify-between border-t pt-4">
            <span className="text-lg font-bold text-dark-500">
              Grand Total:
            </span>
            <span className="text-lg font-semibold text-dark-500">
              ₹{(totalPrice + 50).toFixed(2)}
            </span>
          </div>
          <Link to="/shipping">
            <button
              disabled={items.length === 0}
              className="mt-4 w-full  rounded-lg bg-dark-500 py-4 text-lg font-normal text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-[#3A383F] disabled:text-gray-80"
            >
              Proceed
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
