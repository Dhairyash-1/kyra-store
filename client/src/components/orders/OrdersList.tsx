import { Order } from "@/types/order";
import { OrderCard } from "./OrderCard";

interface OrdersListProps {
  orders: Order[];
  onViewOrder: (orderId: number) => void;
  onCancelOrder: (orderId: number) => void;
}

export type OrderStatus =
  | "INPROCESS"
  | "FAILED"
  | "DELIVERED"
  | "CONFIRMED"
  | "SHIPPED";

export interface OrderItem {
  id: number;
  name: string;
  mainImage: string;
  price: number;
  quantity: number;
}

// export interface Order {
//   id: number;
//   items: OrderItem[];
//   orderStatus: OrderStatus;
//   totalAmount: number;
// }

export interface OrdersResponse {
  data: Order[];
}

export function OrdersList({
  orders,
  onViewOrder,
  onCancelOrder,
}: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg   ">
        <div className="text-center">
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No orders found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Your orders will appear here once you make a purchase.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onViewOrder={onViewOrder}
          onCancelOrder={onCancelOrder}
        />
      ))}
    </div>
  );
}
