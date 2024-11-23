import { HeartIcon, MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import BreadCrumb from "@/components/BreadCrumb";
import FullPageLoader from "@/components/FullPageLoader";
import { Button } from "@/components/ui/button";
import { useGetProductBySlugQuery } from "@/services/productApi";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";

const ProductPage = () => {
  const { slug } = useParams();
  const [imgIndex, setImgIndex] = useState(0);
  const response = useGetProductBySlugQuery({ slug: slug || "" });
  const product = response?.data?.data;
  const currentImage = product?.images[imgIndex];
  const dispatch = useDispatch();

  if (!product) {
    return <FullPageLoader />;
  }

  function handleAddToCart() {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        image: product.images[0].url,
        price: product.salePrice,
        quantity: 1,
      })
    );
  }

  return (
    <div className="mt-8 px-4 sm:px-8 md:px-20 lg:px-28">
      <BreadCrumb path={product?.name} />

      {/* Main Product Layout */}
      <div className="mt-8 flex flex-col gap-6 md:flex-row">
        {/* Left Section: Main Image */}
        <div className="w-full md:w-1/2">
          <div className="flex items-center justify-center bg-gray-5">
            <img
              src={currentImage.url}
              alt={currentImage.url}
              className="h-auto max-h-[500px] w-full max-w-full object-contain"
            />
          </div>
          <div className="mt-8 flex gap-4 ">
            {product?.images?.map((img, i) => (
              <div
                key={img.url}
                onClick={() => setImgIndex(i)}
                className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md bg-gray-5 sm:h-24 sm:w-24 md:h-28 md:w-28"
              >
                <img
                  src={img.url}
                  alt={`Product image ${img.id}`}
                  className="h-auto w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Right Section: Product Details */}
        <div className="flex-1 md:w-[50%]">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold sm:text-3xl ">
              {product?.brand}
            </h1>
            <div
              className={`rounded-sm p-2 text-sm font-normal ${
                product?.inStock
                  ? "bg-green-100 text-green-400"
                  : "bg-red-100 text-red-400"
              }`}
            >
              {product?.inStock ? "In Stock" : "Out of Stock"}
            </div>
          </div>

          <h5 className="mt-2 text-lg font-normal sm:text-xl ">
            {product?.name}
          </h5>

          <div className="mt-2 flex gap-4">
            <span className="text-xl font-semibold sm:text-2xl ">
              ₹{product.salePrice}
            </span>
            <span className="text-gray-400 line-through sm:text-xl ">
              ₹{product.basePrice}
            </span>
          </div>

          <p className="mt-4 text-gray-700 sm:text-base md:text-lg">
            {product.longDescription.slice(0, 220)}...
          </p>

          {/* Add to Cart and Buy Now Buttons */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 md:gap-8">
            {/* Quantity Controller */}
            <div className="flex items-center space-x-4 rounded-lg border-2 border-dark-500 px-4 py-3 sm:w-auto">
              <MinusIcon className="text-dark-500" />
              <span className="text-dark-500">1</span>
              <PlusIcon className="text-dark-500" />
            </div>

            {/* Add to Cart Button (Center on larger screens) */}
            <div className="flex justify-center sm:w-auto sm:justify-center">
              <Button
                onClick={handleAddToCart}
                className="w-full rounded-lg bg-dark-500 px-8 py-6 text-base font-light text-white sm:w-auto md:px-28"
              >
                Add to Cart
              </Button>
            </div>

            {/* Wishlist Icon */}
            <div className="flex items-center justify-center rounded-lg border-2 border-dark-500 px-2 py-3 sm:w-auto sm:px-4">
              <HeartIcon strokeWidth={1.8} className="text-dark-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Images Below Main Image */}
    </div>
  );
};

export default ProductPage;
