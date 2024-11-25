import { StarIcon } from "lucide-react";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart } from "@/features/cart/cartSlice";

interface ProductCardProp {
  id: number;
  brand: string;
  name: string;
  basePrice: number;
  salePrice: number;
  price?: number;
  slug: string;
  images: any[];
  topActionButton: ReactNode;
  bottomActionButton: ReactNode;
}

const ProductCard = ({
  id,
  name,
  brand,
  basePrice,
  salePrice,
  price,
  images,
  slug,
  topActionButton,
  bottomActionButton,
}: ProductCardProp) => {
  const imageUrl = images.filter((img) => img.isMainImage)[0].url;

  return (
    <div className="flex w-full flex-col items-start justify-center">
      <Link
        to={`/products/${slug}`}
        className="group relative block w-full overflow-hidden rounded bg-gray-5 p-4 hover:bg-gray-20 sm:p-6"
      >
        {/* Star Icon - Positioned without any movement */}
        <div className="absolute right-4 top-4 hidden group-hover:block">
          {/* <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white shadow-md">
            <StarIcon size={28} className="stroke-dark-90-500 stroke-[1.5]" />
          </div> */}
          {topActionButton && topActionButton}
        </div>

        {/* Product Image */}
        <div className="h-60 w-full sm:h-72 md:h-80 lg:h-96">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover" // Ensures image scaling without distortion
          />
        </div>

        {/* "Add to Cart" Button - Appear on Hover */}
        <div className="absolute bottom-4 left-1/2 hidden w-[80%] -translate-x-1/2 transition-all duration-300 group-hover:block">
          {/* <button
            onClick={(e) => handleAddToCart(e)}
            className="w-full rounded-lg bg-white px-[12px] py-4 text-center text-sm font-medium text-dark-500 shadow-sm"
          >
            Add to Cart
          </button> */}
          {bottomActionButton && bottomActionButton}
        </div>
      </Link>

      {/* Product Details */}
      <div className="mt-4 flex flex-col gap-2 sm:gap-3">
        <h4 className="text-lg font-semibold text-dark-500 sm:text-xl">
          {brand}
        </h4>
        <h5 className="text-sm font-normal text-dark-80 sm:text-base">
          {name}
        </h5>
        <div className="flex items-center">
          <span className="text-lg font-medium text-dark-500">
            ₹{salePrice}.00
          </span>
          <span className="ml-2 text-sm font-normal text-gray-80 line-through">
            ₹{basePrice || (price as number)}.00
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
