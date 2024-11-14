import ProductToolBar from "./ProductToolBar";
import ProductCard from "../ProductCard";

import { bestSellerProducts } from "@/constants";

const ProductContainer = () => {
  return (
    <div className="col-span-3 flex flex-col ">
      <ProductToolBar />
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {bestSellerProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductContainer;
