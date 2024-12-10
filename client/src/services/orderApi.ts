import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// interface wishlistType {
//   id: number;
//   name: string;
//   brand: string;
//   salePrice: number;
//   basePrice: number;
//   slug: string;
//   images: any[];
// }

interface createOrderResponse {
  statusCode: number;
  data: {
    sessionId: string;
  };
  message: string;
  success: boolean;
}
interface OrderResponse {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;
}

export const orderApi = createApi({
  reducerPath: "orderApi",
  tagTypes: ["orders", "orderItem"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,

    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      createOrderResponse,
      { addressId: number; cartItems: any[]; totalAmount: number }
    >({
      query: (data) => ({
        url: `/order/create-order`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),

    getOrderById: builder.query<OrderResponse, { id: number }>({
      query: (data) => `/order/details/${data.id}`,

      providesTags: ["orderItem"],
    }),
    getAllOrders: builder.query<OrderResponse, void>({
      query: () => "/order/",
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
} = orderApi;
