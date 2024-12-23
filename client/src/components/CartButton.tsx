import { Link } from "react-router-dom";

import { Button } from "./ui/button";

const CartButton = ({
  product,
  handleProductAddToCart,
}: {
  product: any;
  handleProductAddToCart: () => void;
}) => {
  return (
    <div className="flex h-full max-w-xs flex-[3] justify-center ">
      {product ? (
        <Link to={"/cart"} className="w-full">
          <Button className="w-full rounded-lg bg-dark-500 px-8 py-6 text-base font-light text-white sm:w-auto sm:px-28">
            Go to Cart
          </Button>
        </Link>
      ) : (
        <Button
          onClick={handleProductAddToCart}
          className="w-full rounded-lg bg-dark-500 px-8 py-6 text-base font-light text-white sm:w-auto sm:px-28"
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default CartButton;
