import { TrashIcon } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "./ProductCard";

import { addToCart } from "@/features/cart/cartSlice";
import { RootState } from "@/store/store";

const Wishlist = () => {
  const wishlists = useSelector((state: RootState) => state.wishlist.wishlist);
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
  }
  return (
    <div className="grid grid-cols-2 gap-8 py-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {wishlists.map((item) => (
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
            <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white shadow-md">
              <TrashIcon
                size={28}
                className="stroke-dark-90-500 stroke-[1.5]"
              />
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
      ))}
    </div>
  );
};

export default Wishlist;
