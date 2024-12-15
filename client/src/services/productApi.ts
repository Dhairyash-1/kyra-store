import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  bestSellerProductsResponse,
  getAllProductsResponseType,
  singleProductRespose,
} from "@/types/productType";

interface colorResponse {
  statusCode: number;
  data: { id: number; name: string; hexCode: string; productCount: number }[];
  message: string;
}
interface sizeResponse {
  statusCode: number;
  data: { id: number; name: string; productCount: number }[];
  message: string;
}

export const productApi = createApi({
  reducerPath: "productApi",
  tagTypes: ["colors", "size", "allProducts", "bestseller", "Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      getAllProductsResponseType,
      {
        page: number;
        limit: number;
        category?: string;
        subcategory?: string;
        sortBy?: string;
        price?: string;
        color?: string;
        size?: string;
      }
    >({
      query: ({
        page,
        limit,
        category,
        subcategory,
        sortBy,
        price,
        color,
        size,
      }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());

        // Append optional fields if they are provided
        if (category) params.append("category", category);
        if (subcategory) params.append("subCategory", subcategory);
        if (sortBy) params.append("sortBy", sortBy);
        if (price) params.append("price", price);
        if (color) params.append("color", color);
        if (size) params.append("size", size);

        return `/product/?${params.toString()}`;
      },
      providesTags: ["allProducts"],
      keepUnusedDataFor: 3600,
    }),

    getProductBySlug: builder.query<singleProductRespose, { slug: string }>({
      query: ({ slug }) => `/product/slug?slug=${slug}`,
      providesTags: (_, __, { slug }) => [{ type: "Product", id: slug }],
    }),

    getBestSellerProducts: builder.query<bestSellerProductsResponse, void>({
      query: () => `/product/bestseller`,
      providesTags: ["bestseller"],
    }),
    getProductColors: builder.query<colorResponse, void>({
      query: () => `/product/colors`,
      providesTags: ["colors"],
    }),
    getProductSizes: builder.query<sizeResponse, void>({
      query: () => `/product/sizes`,
      providesTags: ["size"],
    }),
    createColor: builder.mutation<void, { name: string; hexCode?: string }>({
      query: (data) => ({
        url: "/product/colors/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["colors"],
    }),
    createSize: builder.mutation<void, { name: string }>({
      query: (data) => ({
        url: "/product/size/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["size"],
    }),
    AddProduct: builder.mutation<void, any>({
      query: (data) => ({
        url: "/product/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["allProducts", "bestseller"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductBySlugQuery,
  useGetBestSellerProductsQuery,
  useGetProductColorsQuery,
  useGetProductSizesQuery,
  useCreateColorMutation,
  useCreateSizeMutation,
  useAddProductMutation,
} = productApi;
