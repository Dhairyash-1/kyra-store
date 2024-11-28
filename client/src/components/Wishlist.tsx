import { TrashIcon } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";

import ProductCard from "./ProductCard";

import { addToCart } from "@/features/cart/cartSlice";
import {
  useGetAllUserWishlistItemQuery,
  useToggleProductWishlistMutation,
} from "@/services/wishlistApi";

const Wishlist = () => {
  const { data } = useGetAllUserWishlistItemQuery();
  const [toggleWishlist] = useToggleProductWishlistMutation();
  console.log(data);
  const wishlists = data?.data;
  const dispatch = useDispatch();

  function handleAddToCart(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: any
  ) {
    e.stopPropagation();
    e.preventDefault();

    dispatch(
      addToCart({
        id: item.id,
        image: item.images[0].url,
        name: item.name,
        price: item.salePrice,
        quantity: 1,
      })
    );

    toggleWishlist({ id: item.id });
  }

  function handleWishlistDelete(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist({ id });
  }

  return (
    <div className="grid h-full grid-cols-2 gap-8   sm:grid-cols-2 md:grid-cols-3 ">
      {wishlists?.length === 0 ? (
        <div className="flex-center col-span-full  text-xl font-semibold">
          You have no wishlist item
        </div>
      ) : (
        wishlists?.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            brand={item.brand}
            basePrice={item.basePrice}
            salePrice={item.salePrice}
            images={item.images}
            slug={item.slug}
            topActionButton={
              <div
                onClick={(e) => handleWishlistDelete(e, item.id)}
                className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white shadow-md"
              >
                <TrashIcon size={28} className="stroke-[1.5] text-red-600" />
              </div>
            }
            bottomActionButton={
              <button
                onClick={(e) => handleAddToCart(e, item)}
                className="w-full rounded-lg bg-white px-[12px] py-4 text-center text-sm font-medium text-dark-500 shadow-sm"
              >
                Move to Cart
              </button>
            }
          />
        ))
      )}
    </div>
  );
};

export default Wishlist;
