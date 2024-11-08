import ProductCard from "./ProductCard";

import { bestSellerProducts } from "@/constants";

const BestSeller = () => {
  return (
    <section className="mt-24 px-8 sm:px-12 md:px-16 lg:px-24">
      <h1 className=" text-center text-3xl font-medium text-dark-90 md:text-4xl ">
        Our BestSeller
      </h1>
      <div className="grid grid-cols-2 gap-8 py-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {bestSellerProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
