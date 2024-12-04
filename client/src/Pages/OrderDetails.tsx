import { ArrowLeft, Calendar, Hash } from "lucide-react";
import { useParams } from "react-router-dom";

import Loader from "@/components/Loader";
import { OrderAddress } from "@/components/orders/OrderAddress";
import { OrderDetailsItem } from "@/components/orders/OrderDetailsItem";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { OrderSummary } from "@/components/orders/OrderSummary";
import { OrderTimeline } from "@/components/orders/OrderTimeline";
import { useGetOrderByIdQuery } from "@/services/orderApi";

// This would typically come from your API
const mockOrder = {
  id: 123456,
  orderStatus: "SHIPPED",
  orderDate: "2024-03-15T10:30:00Z",
  expectedDelivery: "2024-03-20",
  trackingNumber: "IW3475453455",
  totalAmount: 200.0,
  items: [
    {
      id: 1,
      name: "Girls Pink Moana Printed Dress",
      mainImage: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03",
      salePrice: 80.0,
      quantity: 1,
      size: "S",
    },
    {
      id: 2,
      name: "Women Textured Handheld Bag",
      mainImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
      salePrice: 80.0,
      quantity: 1,
      size: "Regular",
    },
  ],
  shippingAddress: {
    fullName: "John Doe",
    streetAddress: "123 Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400001",
    country: "India",
    phone: "+91 9876543210",
  },
};

export default function OrderDetails() {
  const { orderId } = useParams();
  console.log(orderId);
  const { data, isLoading } = useGetOrderByIdQuery(
    { id: Number(orderId) },
    { skip: !orderId }
  );
  if (isLoading) {
    return <Loader />;
  }
  const order = data?.data;
  console.log(order); // In real app, fetch using orderId
  return (
    <div className="container mx-auto max-w-6xl px-4 py-2">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => window.history.back()}
          className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </button>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Order Details
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Hash className="h-4 w-4" />
                <span>Order {order.id}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(order.orderDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <OrderStatusBadge status={order.orderStatus} />
            </div>
          </div>

          {order.orderStatus === "CONFIRMED" && (
            <button
              onClick={() => console.log("Cancel order")}
              className="rounded-md border border-orange-500 px-4 py-2 text-sm font-medium text-orange-500 hover:bg-red-50"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      {/* Order Timeline */}
      <OrderTimeline status={order.orderStatus} />

      {/* Order Content */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Items and Address */}
        <div className="lg:col-span-2">
          {/* Items */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-medium text-gray-900">Order Items</h3>
            <div className="mt-4">
              {order.items.map((item) => (
                <OrderDetailsItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Tracking Info */}
          {order.trackingNumber && (
            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Tracking Information
              </h3>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Tracking Number:{" "}
                  <span className="font-medium">{order.trackingNumber}</span>
                </p>
                {order.expectedDelivery && (
                  <p className="mt-2 text-sm text-gray-600">
                    Expected Delivery:{" "}
                    <span className="font-medium">
                      {new Date(order.expectedDelivery).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Shipping Address */}
          <div className="mt-8">
            <OrderAddress address={order.shippingAddress} />
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <OrderSummary order={order} />
        </div>
      </div>
    </div>
  );
}
