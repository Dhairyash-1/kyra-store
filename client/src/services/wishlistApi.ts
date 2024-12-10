import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface wishlistType {
  id: number;
  name: string;
  brand: string;
  slug: string;
  variants: {
    id: number;
    price: number;
    listPrice: number;
    color: { id: number; name: string };
    size: { id: number; name: string };
    images: { url: string }[];
  }[];
}

interface allWishlistResponse {
  statusCode: number;
  data: wishlistType[];
  message: string;
  success: boolean;
}

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  tagTypes: ["wishlist"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,

    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    toggleProductWishlist: builder.mutation<void, { id: number }>({
      query: (data) => ({
        url: `/wishlist/toggle/${data.id}`,
        method: "POST",
      }),
      invalidatesTags: ["wishlist"],
    }),

    getAllUserWishlistItem: builder.query<allWishlistResponse, void>({
      query: () => `/wishlist/`,

      providesTags: ["wishlist"],
    }),
  }),
});

export const {
  useToggleProductWishlistMutation,
  useGetAllUserWishlistItemQuery,
} = wishlistApi;
