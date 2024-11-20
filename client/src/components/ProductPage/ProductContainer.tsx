import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import ProductToolBar from "./ProductToolBar";
import ProductCard from "../ProductCard";
import { ProductPagination } from "./ProductPagination";

import { PAGE_SIZE } from "@/lib/utils";
import { useGetAllProductsQuery } from "@/services/productApi";

const ProductContainer = () => {
  const [searchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const categories = searchParams.get("categories") || "";
  const subCategories = searchParams.get("subcategories") || "";
  const lowPrice = searchParams.get("low") || 0;
  const highPrice = searchParams.get("high") || 3000;
  const { data, isFetching, error } = useGetAllProductsQuery({
    page: currentPage,
    limit: PAGE_SIZE,
    category: categories,
    subcategory: subCategories,
    sortBy: searchParams.get("sortBy") || "newest",
    price: `${lowPrice}-${highPrice}`,
  });
  // @ts-expect-error
  const AllProducts = data?.data?.products;
  // @ts-expect-error
  const productCount = data?.data?.totalProducts;
  // console.log(data, AllProducts, error);

  return (
    <div className="col-span-4 flex flex-col lg:col-span-3">
      <ProductToolBar />

      {/* Loader */}
      {isFetching ? (
        <div className="flex h-full w-full items-center justify-center">
          <ClipLoader size={50} color="#131118" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {error?.status === 404 ? (
            <div className="col-span-full flex h-[300px] items-center justify-center">
              No Products Found
            </div>
          ) : (
            AllProducts?.map((product: any) => {
              let selectedProduct = product;

              if (product.isVariant && product.variants.length > 0) {
                const { name, brand } = product;
                selectedProduct = { name, brand, ...product.variants[0] };
              }
              return (
                <ProductCard key={selectedProduct.id} {...selectedProduct} />
              );
            })
          )}
        </div>
      )}

      {/* Pagination */}
      {!isFetching && !error?.status && (
        <ProductPagination count={productCount} />
      )}
    </div>
  );
};

export default ProductContainer;
