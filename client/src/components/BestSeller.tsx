import { StarIcon } from "lucide-react";
import { Link } from "react-router-dom";

import ProductCard from "./ProductCard";

import useCart from "@/hooks/useCart";
import useWishlist from "@/hooks/useWishlist";
import { useGetBestSellerProductsQuery } from "@/services/productApi";

const BestSeller = () => {
  const { data } = useGetBestSellerProductsQuery();
  const { handleAddToWishlist, wishlistProductIds } = useWishlist();
  const bestSellerProducts = data?.data;
  const { handleAddToCart, items } = useCart();

  if (!bestSellerProducts) return null;

  return (
    <section className="mt-24 lg:px-20">
      <h1 className=" text-center text-3xl font-medium text-dark-90 md:text-4xl ">
        Our BestSeller
      </h1>
      <div className="grid grid-cols-2 gap-8 py-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {bestSellerProducts?.map((product) => {
          const { id, name, salePrice, basePrice, brand, images, slug } =
            product;
          const isWishlist = wishlistProductIds.includes(id);

          return (
            <ProductCard
              key={id}
              id={id}
              name={name}
              brand={brand}
              basePrice={basePrice}
              salePrice={salePrice}
              images={images}
              slug={slug}
              topActionButton={
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToWishlist(id);
                  }}
                  className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white shadow-md"
                >
                  <StarIcon
                    size={28}
                    fill={isWishlist ? "#f8a137" : "none"}
                    color={`${isWishlist ? "#f8a137" : "#131118"}`}
                    className="stroke-dark-90-500 stroke-[1.5] "
                  />
                </div>
              }
              bottomActionButton={
                items.some((item) => item.id === product.id) ? (
                  <Link to="/cart">
                    <button className="w-full rounded-lg bg-white px-[12px] py-4 text-center text-sm font-medium text-dark-500 shadow-sm">
                      Go to Cart
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="w-full rounded-lg bg-white px-[12px] py-4 text-center text-sm font-medium text-dark-500 shadow-sm"
                  >
                    Add to Cart
                  </button>
                )
              }
            />
          );
        })}
      </div>
    </section>
  );
};

export default BestSeller;
