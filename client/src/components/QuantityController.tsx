import { MinusIcon, PlusIcon } from "lucide-react";

import useCart from "@/hooks/useCart";

const QuantityController = ({ product }: { product: any }) => {
  const { handleDecrement, handleIncrement } = useCart();
  return (
    <div className="hidden  h-full  items-center justify-between gap-1 rounded-lg border-2 border-dark-500 px-4 py-3 sm:flex md:gap-4">
      <MinusIcon
        className="cursor-pointer text-dark-500"
        onClick={() => handleDecrement(product)}
      />
      <span className="text-dark-500">{product ? product.quantity : 0}</span>
      <PlusIcon
        className="cursor-pointer text-dark-500"
        onClick={() => handleIncrement(product)}
      />
    </div>
  );
};

export default QuantityController;
