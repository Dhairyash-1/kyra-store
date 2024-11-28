import { CrossIcon, XIcon } from "lucide-react";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Separator } from "./ui/separator";

import { RootState } from "@/store/store";
import { Link } from "react-router-dom";

const MiniCart = ({ children }: { children: ReactNode }) => {
  const { items, totalPrice, totalQuantity } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      {/* Mini Cart Content */}
      <PopoverContent
        align="end"
        side="bottom"
        className="w-[400px] bg-white p-6 shadow-md"
      >
        <p className="mt-2 text-base text-dark-500">
          You have {totalQuantity} items in your cart
        </p>
        <div className="my-6 flex flex-col gap-6">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className=" flex gap-4">
                  <div className="h-[60px] w-[60px] bg-white-5 p-1">
                    <img src={item.image} className="h-full w-full" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>{item.name}</p>
                    <p className=" flex gap-1 font-bold">
                      {item.quantity} <XIcon width={14} strokeWidth={4} /> ₹
                      {item.price}
                    </p>
                  </div>
                </div>
                <Separator className="h-[1.5px]" />
              </div>
            ))
          ) : (
            <p className="text-center text-xl text-gray-80">Cart is Empty</p>
          )}
        </div>

        <div className="flex-between my-4 flex ">
          <span className="text-base font-bold">Subtotal</span>
          <span className="text-base font-bold">₹{totalPrice}</span>
        </div>

        <Link to={"/cart"}>
          <button className=" w-full rounded-lg border-2 border-dark-500 bg-white py-2 font-normal text-dark-500">
            View Cart
          </button>
        </Link>
        <button className="mt-4 w-full rounded-lg bg-dark-500 py-2 font-normal text-white">
          Checkout
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default MiniCart;
