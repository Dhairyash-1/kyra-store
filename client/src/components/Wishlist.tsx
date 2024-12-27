import { TrashIcon } from "lucide-react";

import Loader from "./Loader";
import ProductCard from "./ProductCard";

import useCart from "@/hooks/useCart";
import useWishlist from "@/hooks/useWishlist";
import {
  useGetAllUserWishlistItemQuery,
  useToggleProductWishlistMutation,
} from "@/services/wishlistApi";

const Wishlist = () => {
  const { data, isLoading } = useGetAllUserWishlistItemQuery();
  const [toggleWishlist] = useToggleProductWishlistMutation();
  const wishlists = data?.data;
  const { handleAddToCart } = useCart();
  const { handleWishlistDelete } = useWishlist();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="grid h-full grid-cols-1 gap-8 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3">
      {wishlists?.length === 0 ? (
        <div className="flex-center col-span-full text-xl font-semibold">
          You have no wishlist item
        </div>
      ) : (
        wishlists?.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            brand={item.brand}
            listPrice={item.listPrice}
            price={item.price}
            image={item.mainImage}
            slug={item.slug}
            variantId={item.variantId}
            topActionButton={
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleWishlistDelete(item.id);
                }}
                className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white shadow-md"
              >
                <TrashIcon size={28} className="stroke-[1.5] text-red-600" />
              </div>
            }
            bottomActionButton={
              <button
                aria-label="move to cart"
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart({
                    id: item.variantId,
                    name: item.name,
                    price: item.price,
                    color: item.color,
                    size: item.size,
                    image: item.mainImage,
                    productId: item.id,
                    slug: item.slug,
                    quantity: 1,
                  });
                  await toggleWishlist({ id: item.id });
                }}
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
