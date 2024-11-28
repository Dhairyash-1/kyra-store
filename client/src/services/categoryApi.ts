import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  AllCategoryResponse,
  createCategoryRequest,
  createCategoryResponse,
  TrendingCategoriesResponse,
} from "@/types/categoryType";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCategory: builder.mutation<
      createCategoryResponse,
      createCategoryRequest
    >({
      query: (data) => ({
        url: "/category/create",
        method: "POST",
        body: data,
      }),
    }),

    getAllCategory: builder.query<AllCategoryResponse, void>({
      query: () => `/category/`,
    }),

    getTrendingCategories: builder.query<TrendingCategoriesResponse, void>({
      query: () => "/category/get/trending",
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useGetTrendingCategoriesQuery,
} = categoryApi;
