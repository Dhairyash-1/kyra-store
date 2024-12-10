import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ProductCardProp {
  id: number;
  brand: string;
  name: string;
  listPrice: number;
  price: number;
  slug: string;
  image: string;
  topActionButton: ReactNode;
  bottomActionButton: ReactNode;
}

const ProductCard = ({
  id,
  name,
  brand,
  listPrice,
  price,
  image,
  slug,
  topActionButton,
  bottomActionButton,
}: ProductCardProp) => {
  return (
    <div className="flex min-w-[150px] flex-col rounded-lg bg-white ">
      {/* Product Image Section */}
      <Link
        to={`/products/${slug}`}
        className="group relative block overflow-hidden rounded-t-lg bg-gray-5"
      >
        {/* Top Action Button */}
        <div className="absolute right-4 top-4 z-10 hidden group-hover:block">
          {topActionButton && topActionButton}
        </div>

        {/* Product Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-10">
          <img
            src={image}
            alt={name}
            className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </div>

        {/* Bottom Action Button */}
        <div className="absolute bottom-4 left-1/2 z-10 hidden w-[80%] -translate-x-1/2 group-hover:block">
          {bottomActionButton && bottomActionButton}
        </div>
      </Link>

      {/* Product Details Section */}
      <div className="flex flex-grow flex-col gap-2 p-4">
        <h4 className="text-base font-semibold text-gray-800">{brand}</h4>
        <h5 className="text-sm font-normal text-gray-600">{name}</h5>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-medium text-gray-800">₹{price}.00</span>
          <span className="text-sm font-normal text-gray-400 line-through">
            ₹{listPrice}.00
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
