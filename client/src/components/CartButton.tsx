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
    <div className="flex h-full w-auto flex-[3] justify-center sm:flex-none lg:flex-[3]">
      {product ? (
        <Link to={"/cart"}>
          <Button className="w-full rounded-lg bg-dark-500 px-8 py-6 text-base font-light text-white sm:w-auto md:px-28">
            Go to Cart
          </Button>
        </Link>
      ) : (
        <Button
          onClick={handleProductAddToCart}
          className="w-full rounded-lg bg-dark-500 px-8 py-6 text-base font-light text-white sm:w-auto md:px-28"
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default CartButton;
