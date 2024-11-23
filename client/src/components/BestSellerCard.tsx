import { StarIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProp {
  brand: string;
  title: string;
  image: string;
  price: string;
  basePrice: string;
  salePrice: string;
  href: string;
}

const BestSellerCard = ({
  title,
  brand,
  price,
  salePrice,
  image,
  href,
}: ProductCardProp) => {
  return (
    <div className="flex w-full flex-col items-start justify-center">
      <Link
        to={`/products/${href}`}
        className="group relative block w-full overflow-hidden rounded bg-gray-5 p-4 hover:bg-gray-20 sm:p-6"
      >
        {/* Star Icon - Positioned without any movement */}
        <div className="absolute right-4 top-4 hidden group-hover:block">
          <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white shadow-md">
            <StarIcon size={28} className="stroke-dark-90-500 stroke-[1.5]" />
          </div>
        </div>

        {/* Product Image */}
        <div className="h-60 w-full sm:h-72 md:h-80 lg:h-96">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover" // Ensures image scaling without distortion
          />
        </div>

        {/* "Add to Cart" Button - Appear on Hover */}
        <div className="absolute bottom-4 left-1/2 hidden w-[80%] -translate-x-1/2 transition-all duration-300 group-hover:block">
          <div className="rounded-lg bg-white px-[12px] py-4 text-center shadow-sm">
            <h3 className="text-sm font-medium text-dark-500">Add to Cart</h3>
          </div>
        </div>
      </Link>

      {/* Product Details */}
      <div className="mt-4 flex flex-col gap-2 sm:gap-3">
        <h4 className="text-lg font-semibold text-dark-500 sm:text-xl">
          {brand}
        </h4>
        <h5 className="text-sm font-normal text-dark-80 sm:text-base">
          {title}
        </h5>
        <div className="flex items-center">
          <span className="text-lg font-medium text-dark-500">
            ₹{salePrice}.00
          </span>
          <span className="ml-2 text-sm font-normal text-gray-80 line-through">
            ₹{price}.00
          </span>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCard;
