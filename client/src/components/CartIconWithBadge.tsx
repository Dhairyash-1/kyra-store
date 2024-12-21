import { ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";

import { RootState } from "@/store/store";

const CartIconWithBadge = () => {
  const cartItemCount = useSelector(
    (state: RootState) => state.cart.items.length
  );

  return (
    <button
      aria-label="cart item count"
      className="relative bg-transparent p-0 focus:outline-none"
    >
      <ShoppingBag
        className="h-6 w-6  text-dark-500"
        aria-label="Add to Cart"
      />

      {cartItemCount > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-dark-500 text-xs font-bold text-white">
          {cartItemCount}
        </span>
      )}
    </button>
  );
};

export default CartIconWithBadge;
