import { StarIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import ProductToolBar from "./ProductToolBar";
import ProductCard from "../ProductCard";
import { ProductPagination } from "./ProductPagination";

import useCart from "@/hooks/useCart";
import useWishlist from "@/hooks/useWishlist";
import { PAGE_SIZE } from "@/lib/utils";
import { useGetAllProductsQuery } from "@/services/productApi";
import { ProductType } from "@/types/productType";

type SelectedProduct = ProductType & { price?: number };

const ProductContainer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const categories = searchParams.get("categories") || "";
  const subCategories = searchParams.get("subcategories") || "";
  const lowPrice = searchParams.get("low") || 0;
  const highPrice = searchParams.get("high") || 3000;
  const { data, isFetching } = useGetAllProductsQuery({
    page: currentPage,
    limit: PAGE_SIZE,
    category: categories,
    subcategory: subCategories,
    sortBy: searchParams.get("sortBy") || "newest",
    price: `${lowPrice}-${highPrice}`,
  });

  const AllProducts = data?.data?.products;
  const productCount = data?.data?.totalProducts || 0;

  const { handleAddToCart, items } = useCart();
  const { handleAddToWishlist, wishlistProductIds } = useWishlist();

  return (
    <div className="col-span-4 flex flex-col lg:col-span-3">
      <ProductToolBar />

      {/* Loader */}
      {isFetching ? (
        <div className="flex h-full w-full items-center justify-center">
          <ClipLoader size={50} color="#131118" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-3  2xl:grid-cols-4">
          {!AllProducts || AllProducts.length === 0 ? (
            <div className="col-span-full flex h-[300px] items-center justify-center">
              No Products Found
            </div>
          ) : (
            AllProducts?.map((product) => {
              const selectedProduct: any = {
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: product.variants[0].price,
                listPrice: product.variants[0].listPrice,
                image: product.variants[0].images[0].url,
                slug: product.slug,
              };

              const isWishlist = wishlistProductIds.includes(product.id);
              return (
                <ProductCard
                  key={selectedProduct.id}
                  {...selectedProduct}
                  topActionButton={
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        handleAddToWishlist(product.id);
                      }}
                      className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white shadow-md"
                    >
                      <StarIcon
                        size={28}
                        fill={isWishlist ? "#f8a137" : "none"}
                        color={`${isWishlist ? "#f8a137" : "#131118"}`}
                        className="stroke-dark-90-500 stroke-[1.5] "
                      />
                    </div>
                  }
                  bottomActionButton={
                    items.some((item) => item.id === product.id) ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate("/cart");
                        }}
                        className="w-full rounded-lg bg-white px-[12px] py-4 text-center text-sm font-medium text-dark-500 shadow-sm"
                      >
                        Go to Cart
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(selectedProduct);
                        }}
                        className="w-full rounded-lg bg-white px-[12px] py-4 text-center text-sm font-medium text-dark-500 shadow-sm"
                      >
                        Add to Cart
                      </button>
                    )
                  }
                />
              );
            })
          )}
        </div>
      )}

      {/* Pagination */}
      {!isFetching && AllProducts && <ProductPagination count={productCount} />}
    </div>
  );
};

export default ProductContainer;
