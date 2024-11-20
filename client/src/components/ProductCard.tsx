import { StarIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProp {
  brand: string;
  name: string;
  image: string;
  price: string;
  basePrice: string;
  salePrice: string;
  images: any[];
}

const ProductCard = ({
  name,
  brand,
  basePrice,
  price,
  salePrice,
  images,
}: ProductCardProp) => {
  const imageUrl = images.filter((img) => img.isMainImage)[0].url;

  return (
    <div className="flex flex-col items-start justify-center w-full">
      <Link
        to={"/"}
        className="group relative block w-full overflow-hidden rounded bg-gray-5 p-4 sm:p-6 hover:bg-gray-20"
      >
        {/* Star Icon - Positioned without any movement */}
        <div className="absolute right-4 top-4 hidden group-hover:block">
          <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white shadow-md">
            <StarIcon size={28} className="stroke-dark-90-500 stroke-[1.5]" />
          </div>
        </div>

        {/* Product Image */}
        <div className="w-full h-60 sm:h-72 md:h-80 lg:h-96">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover" // Ensures image scaling without distortion
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
        <h4 className="text-lg sm:text-xl font-semibold text-dark-500">
          {brand}
        </h4>
        <h5 className="text-sm sm:text-base font-normal text-dark-80">
          {name}
        </h5>
        <div className="flex items-center">
          <span className="font-medium text-lg text-dark-500">
            ₹{salePrice}.00
          </span>
          <span className="ml-2 text-sm font-normal text-gray-80 line-through">
            ₹{basePrice || price}.00
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
