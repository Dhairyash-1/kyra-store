import { useDispatch, useSelector } from "react-redux";

import { useToast } from "./use-toast";

import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "@/features/cart/cartSlice";
import { RootState } from "@/store/store";

const useCart = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleAddToCart(product: any) {
    console.log(product);
    dispatch(
      addToCart({
        id: product.id,
        productId: product.productId,
        size: product.size,
        color: product.color,
        image: product.image.url,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    );
    toast({ title: "Item Added to cart", variant: "success" });
  }

  function handleRemoveFromCart(id: number) {
    dispatch(removeFromCart(id));
  }

  const handleIncrement = (item: any) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item: any) => {
    if (item && item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return {
    handleIncrement,
    handleDecrement,
    handleAddToCart,
    handleRemoveFromCart,
    totalPrice,
    items,
  };
};

export default useCart;
