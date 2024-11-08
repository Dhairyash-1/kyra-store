import { StarIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProp {
  brand: string;
  title: string;
  image: string;
  price: string;
  salePrice: string;
  href: string;
}

const ProductCard = ({
  brand,
  title,
  image,
  price,
  salePrice,
  href,
}: ProductCardProp) => {
  return (
    <div className="flex flex-col items-start justify-center ">
      <Link
        to={href}
        className="group relative block aspect-[3/4] w-full overflow-hidden rounded bg-gray-5 p-8 hover:bg-gray-20"
      >
        {/* Star Icon - Positioned without any movement */}
        <div className="absolute right-4 top-4 hidden group-hover:block">
          <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white shadow-md">
            <StarIcon size={28} className="stroke-dark-90-500 stroke-[1.5]" />
          </div>
        </div>

        {/* Product Image */}
        <div className="relative h-full w-full">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain"
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
      <div className="mt-[10px] flex flex-col gap-[6px]">
        <h4 className="text-xl font-bold text-dark-500">{brand}</h4>
        <h5 className="text-base font-normal text-dark-80">{title}</h5>
        <div>
          <span className="font-medium">${salePrice}.00</span>
          <span className="ml-2 font-normal text-gray-80 line-through">
            ${price}.00
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
