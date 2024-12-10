import { StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

import useCart from "@/hooks/useCart";
import useWishlist from "@/hooks/useWishlist";
import { useGetBestSellerProductsQuery } from "@/services/productApi";

const BestSeller = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetBestSellerProductsQuery();
  const { handleAddToWishlist, wishlistProductIds } = useWishlist();
  const bestSellerProducts = data?.data;
  const { handleAddToCart, items } = useCart();

  if (!isLoading && !bestSellerProducts) return null;

  return (
    <section className="mt-24 lg:px-20">
      <h1 className=" text-center text-3xl font-medium text-dark-90 md:text-4xl ">
        Our BestSeller
      </h1>
      <div className="grid grid-cols-1 gap-6 py-14 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : bestSellerProducts?.map((product) => {
              const selectedProduct: any = {
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: product.variants[0].price,
                listPrice: product.variants[0].listPrice,
                image: product.variants[0].images[0].url,
                slug: product.slug,
              };
              const isWishlist = wishlistProductIds.includes(product.id);

              return (
                <ProductCard
                  key={product.id}
                  {...selectedProduct}
                  topActionButton={
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToWishlist(product.id);
                      }}
                      className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white shadow-md"
                    >
                      <StarIcon
                        size={28}
                        fill={isWishlist ? "#f8a137" : "none"}
                        color={`${isWishlist ? "#f8a137" : "#131118"}`}
                        className="stroke-dark-90-500 stroke-[1.5]"
                      />
                    </div>
                  }
                  bottomActionButton={
                    items.some((item) => item.id === product.id) ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate("/cart");
                        }}
                        className="w-full rounded-lg bg-white px-4 py-3 text-center text-sm font-medium text-dark-500 shadow-sm md:px-[12px] md:py-4"
                      >
                        Go to Cart
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(selectedProduct);
                        }}
                        className="w-full rounded-lg bg-white px-4 py-3  text-center text-sm font-medium text-dark-500 shadow-sm md:px-[12px] md:py-4"
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
