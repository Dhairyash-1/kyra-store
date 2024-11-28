import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import ProductCard from "./ProductCard";

import { addToCart } from "@/features/cart/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { useGetBestSellerProductsQuery } from "@/services/productApi";
import {
  useGetAllUserWishlistItemQuery,
  useToggleProductWishlistMutation,
} from "@/services/wishlistApi";

const BestSeller = () => {
  const { toast } = useToast();
  const { data } = useGetBestSellerProductsQuery();
  const { data: wishlistData } = useGetAllUserWishlistItemQuery();
  const [wishlistProductIds, setWishlistProductIds] = useState<number[]>([]);
  const bestSellerProducts = data?.data;
  const [toggleWishlist] = useToggleProductWishlistMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlistData?.data) {
      console.log(wishlistData);
      const ids = wishlistData.data.map((item: { id: number }) => item?.id);
      setWishlistProductIds(ids);
    }
  }, [wishlistData]);

  function handleAddToCart(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    product: any
  ) {
    e.stopPropagation();
    e.preventDefault();
    dispatch(
      addToCart({
        id: product.id,
        image: product.images[0].url,
        name: product.name,
        price: product.salePrice,
        quantity: 1,
      })
    );
  }
  function handleAddToWishlist(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) {
    e.preventDefault();
    e.stopPropagation();

    setWishlistProductIds((prevWishlist) =>
      prevWishlist.includes(id)
        ? prevWishlist.filter((wishlistId) => wishlistId !== id)
        : [...prevWishlist, id]
    );

    toggleWishlist({ id })
      .unwrap()
      .catch(() => {
        setWishlistProductIds((prevWishlist) =>
          !prevWishlist.includes(id)
            ? [...prevWishlist, id]
            : prevWishlist.filter((wishlistId) => wishlistId !== id)
        );

        return toast({
          title: "Failed to update wishlist. Please try again.",
          variant: "destructive",
        });
      });
  }

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
                  onClick={(e) => handleAddToWishlist(e, id)}
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
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full rounded-lg bg-white px-[12px] py-4 text-center text-sm font-medium text-dark-500 shadow-sm"
                >
                  Add to Cart
                </button>
              }
            />
          );
        })}
      </div>
    </section>
  );
};

export default BestSeller;
