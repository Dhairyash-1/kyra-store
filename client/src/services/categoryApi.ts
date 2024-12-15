import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  AllCategoryResponse,
  createCategoryRequest,
  createCategoryResponse,
  TrendingCategoriesResponse,
} from "@/types/categoryType";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  tagTypes: ["categories"],
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
      invalidatesTags: ["categories"],
    }),

    getAllCategory: builder.query<AllCategoryResponse, void>({
      query: () => `/category/`,
      providesTags: ["categories"],
    }),
    getFilterCategory: builder.query<AllCategoryResponse, void>({
      query: () => `/category/filter`,
      providesTags: ["categories"],
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
  useGetFilterCategoryQuery,
} = categoryApi;
