import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

import CouponInput from "@/components/CouponInput";
import { Separator } from "@/components/ui/separator";
import useCart from "@/hooks/useCart";

const CartPage = () => {
  const {
    handleIncrement,
    totalPrice,
    handleDecrement,
    handleRemoveFromCart,
    shippingCharge,
    items,
  } = useCart();

  const discount = 0;

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-normal text-dark-500 sm:text-3xl md:text-4xl">
        Shopping Cart
      </h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Cart Items Section */}
        <div className="flex-grow">
          {/* Mobile View - Compact List */}
          <div className="space-y-6 lg:hidden">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col rounded-lg border bg-white p-4 shadow-sm"
              >
                <div className="mb-4 flex items-center space-x-4">
                  <Link to={`/products/${item.slug}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-28 rounded-md bg-gray-50 object-contain"
                    />
                  </Link>
                  <div className="flex-grow">
                    <h4 className="font-medium text-dark-500">{item.name}</h4>
                    {item.size && (
                      <span className="text-sm text-gray-600">
                        Size: {item.size.name}
                      </span>
                    )}
                    <div className="mt-1 font-medium text-dark-500">
                      ₹{item.price.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity Control */}
                  <div className="flex items-center space-x-3 rounded-lg border border-dark-500 p-1">
                    <MinusIcon
                      className="h-6 w-6 cursor-pointer text-dark-500"
                      onClick={() => handleDecrement(item)}
                    />
                    <span className="font-medium">{item.quantity}</span>
                    <PlusIcon
                      className="h-6 w-6 cursor-pointer text-dark-500"
                      onClick={() => handleIncrement(item)}
                    />
                  </div>

                  {/* Subtotal and Delete */}
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">
                      ₹{(item.quantity * item.price).toFixed(2)}
                    </span>
                    <TrashIcon
                      className="h-5 w-5 cursor-pointer text-red-500"
                      onClick={() => handleRemoveFromCart(item.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Grid Layout */}
          <div className="hidden lg:block">
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
                    <Link
                      to={`/products/${item.slug}`}
                      className="flex items-center space-x-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-24 rounded-md bg-gray-50 object-contain p-1"
                      />
                      <div className="flex flex-col">
                        <h4 className="font-medium text-dark-500">
                          {item.name}
                        </h4>
                        {item.size && (
                          <span className="text-sm text-gray-600">
                            Size: {item.size.name}
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* Price Column */}
                    <div className="font-medium text-dark-500">
                      ₹{item.price.toFixed(2)}
                    </div>

                    {/* Quantity Column */}
                    <div className="flex items-center justify-between rounded-lg border-2 border-dark-500 px-3 py-3">
                      <MinusIcon
                        className="hover:text-dark-700 h-5 w-5 cursor-pointer text-dark-500"
                        onClick={() => handleDecrement(item)}
                      />
                      <span className="font-medium">{item.quantity}</span>
                      <PlusIcon
                        className="hover:text-dark-700 h-5 w-5 cursor-pointer text-dark-500"
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

                  <Separator className="my-4" />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="w-full rounded-lg border bg-white p-4 shadow-sm sm:p-6 lg:w-[350px] xl:w-[400px]">
          {/* Subtotal Section */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-dark-500 sm:text-lg">
              Subtotal
            </h2>
            <span className="text-base font-bold text-dark-500 sm:text-lg">
              ₹{totalPrice?.toFixed(2)}
            </span>
          </div>

          <Separator className="mb-4" />

          {/* Coupon Input */}
          <CouponInput />
          {/* Price Breakdown */}
          <div className="mb-4 space-y-2 text-sm sm:text-base">
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-dark-500">Discount</span>
                <span className="font-medium text-green-600">
                  -₹{(0).toFixed(2)}
                </span>
              </div>
            )}
            {shippingCharge > 0 && (
              <div className="flex justify-between">
                <span className="text-dark-500">Shipping</span>
                <span className="font-medium text-dark-500">
                  ₹{(0).toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* Grand Total */}
          <div className="mb-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-dark-500 sm:text-lg">
                Grand Total:
              </span>
              <span className="text-base font-semibold text-dark-500 sm:text-lg">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Proceed Button */}
          <Link to="/shipping" className="block">
            <button
              disabled={items.length === 0}
              className="hover:bg-dark-600 w-full rounded-lg 
                 bg-dark-500 py-3 
                 text-sm font-normal text-white 
                 transition-colors 
                 duration-300 
                 focus:outline-none focus:ring-2
                 focus:ring-dark-500 
                 disabled:cursor-not-allowed 
                 disabled:bg-gray-400
                 disabled:text-gray-200 sm:py-4 sm:text-base"
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
