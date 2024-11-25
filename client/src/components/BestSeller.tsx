import { StarIcon } from "lucide-react";
import { useDispatch } from "react-redux";

import ProductCard from "./ProductCard";

import { addToCart } from "@/features/cart/cartSlice";
import { useGetBestSellerProductsQuery } from "@/services/productApi";

const BestSeller = () => {
  const { data } = useGetBestSellerProductsQuery();
  const bestSellerProducts = data?.data;
  const dispatch = useDispatch();

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
                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white shadow-md">
                  <StarIcon
                    size={28}
                    className="stroke-dark-90-500 stroke-[1.5]"
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
