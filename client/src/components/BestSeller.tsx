import ProductCard from "./ProductCard";

import { useGetBestSellerProductsQuery } from "@/services/productApi";

const BestSeller = () => {
  const { data } = useGetBestSellerProductsQuery();
  const bestSellerProducts = data?.data;
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
            />
          );
        })}
      </div>
    </section>
  );
};

export default BestSeller;
