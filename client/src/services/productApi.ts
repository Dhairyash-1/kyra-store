import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import {
//   AllCategoryResponse,
//   createCategoryRequest,
//   createCategoryResponse,
// } from "@/types/categoryType";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      void,
      {
        page: number;
        limit: number;
        category?: string;
        subcategory?: string;
        sortBy?: string;
        price?: string;
      }
    >({
      query: ({ page, limit, category, subcategory, sortBy, price }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());

        // Append optional fields if they are provided
        if (category) params.append("category", category);
        if (subcategory) params.append("subCategory", subcategory);
        if (sortBy) params.append("sortBy", sortBy);
        if (price) params.append("price", price);

        return `/product/?${params.toString()}`;
      },
    }),

    getProductBySlug: builder.query<void, { slug: string }>({
      query: ({ slug }) => `/product/slug?slug=${slug}`,
    }),

    getBestSellerProducts: builder.query<void, void>({
      query: () => `/product/bestseller`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductBySlugQuery,
  useGetBestSellerProductsQuery,
} = productApi;
