import { HeartIcon, MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import BreadCrumb from "@/components/BreadCrumb";
import FullPageLoader from "@/components/FullPageLoader";
import { Button } from "@/components/ui/button";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "@/features/cart/cartSlice";
import { useGetProductBySlugQuery } from "@/services/productApi";
import { RootState } from "@/store/store";

const ProductPage = () => {
  const { slug } = useParams();
  const [imgIndex, setImgIndex] = useState(0);

  const { data, isLoading } = useGetProductBySlugQuery({ slug: slug || "" });
  const product = data?.data;
  const dispatch = useDispatch();

  const { items } = useSelector((state: RootState) => state.cart);

  if (isLoading || !product) {
    return <FullPageLoader />;
  }

  const {
    id,
    name,
    images,
    salePrice,
    inStock,
    longDescription,
    description,
    basePrice,
    brand,
  } = product;

  const currentImage = images[imgIndex];
  const currentProduct = items.find((item) => item.id === id);

  const handleIncrement = () => {
    dispatch(
      updateQuantity({
        id,
        quantity: currentProduct ? currentProduct.quantity + 1 : 1,
      })
    );
  };

  const handleDecrement = () => {
    if (currentProduct && currentProduct.quantity > 1) {
      dispatch(
        updateQuantity({
          id,
          quantity: currentProduct.quantity - 1,
        })
      );
    } else {
      dispatch(removeFromCart(id));
    }
  };
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        name,
        image: images[0]?.url,
        price: salePrice,
        quantity: 1,
      })
    );
  };

  return (
    <div className="mt-8 px-4 sm:px-8 md:px-20 lg:px-28">
      <BreadCrumb path={name} />

      {/* Main Product Layout */}
      <div className="mt-8 flex flex-col gap-6 md:flex-row">
        {/* Left Section: Main Image */}
        <div className="w-full md:w-1/2">
          <div className="flex items-center justify-center bg-gray-5">
            <img
              src={currentImage.url}
              alt={`Product ${name}`}
              className="h-auto max-h-[500px] w-full max-w-full object-contain"
            />
          </div>
          <div className="mt-8 flex gap-4">
            {images.map((img, i) => (
              <div
                key={img.url}
                onClick={() => setImgIndex(i)}
                className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md bg-gray-5 sm:h-24 sm:w-24 md:h-28 md:w-28"
              >
                <img
                  src={img.url}
                  alt={`Thumbnail ${i + 1}`}
                  className="h-auto w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="flex-1 md:w-[50%]">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold sm:text-3xl">{brand}</h1>
            <div
              className={`rounded-sm p-2 text-sm font-normal ${
                inStock
                  ? "bg-green-100 text-green-400"
                  : "bg-red-100 text-red-400"
              }`}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </div>
          </div>

          <h5 className="mt-2 text-lg font-normal sm:text-xl">{name}</h5>

          <div className="mt-2 flex gap-4">
            <span className="text-xl font-semibold sm:text-2xl">
              ₹{salePrice}
            </span>
            <span className="text-gray-400 line-through sm:text-xl">
              ₹{basePrice}
            </span>
          </div>

          <p className="mt-4 text-gray-700 sm:text-base md:text-lg">
            {longDescription.slice(0, 220)}...
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 md:gap-8">
            {/* Quantity Controller */}
            <div className="flex items-center space-x-4 rounded-lg border-2 border-dark-500 px-4 py-3 sm:w-auto">
              <MinusIcon
                className="cursor-pointer text-dark-500"
                onClick={handleDecrement}
              />
              <span className="text-dark-500">
                {currentProduct ? currentProduct.quantity : 0}
              </span>
              <PlusIcon
                className="cursor-pointer text-dark-500"
                onClick={handleIncrement}
              />
            </div>

            {/* Add to Cart Button */}
            <div className="flex justify-center sm:w-auto sm:justify-center">
              <Button
                onClick={handleAddToCart}
                className="w-full rounded-lg bg-dark-500 px-8 py-6 text-base font-light text-white sm:w-auto md:px-28"
              >
                Add to Cart
              </Button>
            </div>

            {/* Wishlist Button */}
            <div className="flex items-center justify-center rounded-lg border-2 border-dark-500 px-2 py-3 sm:w-auto sm:px-4">
              <HeartIcon strokeWidth={1.8} className="text-dark-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
