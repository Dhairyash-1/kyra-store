import { useState, useEffect } from "react";

import { useToast } from "./use-toast";

import {
  useGetAllUserWishlistItemQuery,
  useToggleProductWishlistMutation,
} from "@/services/wishlistApi";

const useWishlist = () => {
  const { toast } = useToast();
  const [wishlistProductIds, setWishlistProductIds] = useState<number[]>([]);
  const { data: wishlistData } = useGetAllUserWishlistItemQuery();

  const [toggleWishlist] = useToggleProductWishlistMutation();

  useEffect(() => {
    if (wishlistData?.data) {
      const ids = wishlistData.data.map((item: { id: number }) => item?.id);
      setWishlistProductIds(ids);
    }
  }, [wishlistData]);

  const handleAddToWishlist = (id: number) => {
    // Optimistically update wishlist in the UI
    setWishlistProductIds((prevWishlist) =>
      prevWishlist.includes(id)
        ? prevWishlist.filter((wishlistId) => wishlistId !== id)
        : [...prevWishlist, id]
    );

    // Toggle the wishlist state with the server
    toggleWishlist({ id })
      .unwrap()
      .then(() => {
        toast({
          title: `Item has been ${
            wishlistProductIds.includes(id) ? "removed from" : "added to"
          } wishlist`,
          variant: "success",
        });
      })
      .catch(() => {
        setWishlistProductIds((prevWishlist) =>
          prevWishlist.includes(id)
            ? prevWishlist.filter((wishlistId) => wishlistId !== id)
            : [...prevWishlist, id]
        );
        toast({
          title: "Failed to update wishlist. Please try again.",
          variant: "destructive",
        });
      });
  };

  function handleWishlistDelete(id: number) {
    toggleWishlist({ id });
  }

  return {
    wishlistProductIds,
    handleAddToWishlist,
    handleWishlistDelete,
  };
};

export default useWishlist;
