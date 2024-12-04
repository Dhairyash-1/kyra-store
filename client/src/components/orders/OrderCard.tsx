import { Package, Layers } from "lucide-react";

import { OrderActions } from "./OrderActions";
import { OrderStatusBadge } from "./OrderStatusBadge";

import { Order } from "@/types/order";

interface OrderCardProps {
  order: Order;
  onViewOrder: (orderId: number) => void;
  onCancelOrder?: (orderId: number) => void;
}

export function OrderCard({
  order,
  onViewOrder,
  onCancelOrder,
}: OrderCardProps) {
  const mainItem = order.items[0];
  const additionalItems = order.items.length - 1;

  return (
    <div className=" border-b  border-gray-200 bg-white p-6 transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md  border-gray-200 p-1">
            {mainItem.mainImage ? (
              <>
                <img
                  src={mainItem.mainImage}
                  alt={mainItem.name}
                  className="h-full w-full object-contain"
                />
                {additionalItems > 0 && (
                  <div className="absolute -right-1 -top-1 flex items-center gap-1 rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-white shadow-sm">
                    <Layers size={12} />+{additionalItems}
                  </div>
                )}
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="mb-2">
              <h3 className="text-lg font-medium text-gray-900">
                {mainItem.name}
              </h3>
              {additionalItems > 0 && (
                <p className="text-sm text-blue-600">
                  +{additionalItems} more{" "}
                  {additionalItems === 1 ? "item" : "items"}
                </p>
              )}
            </div>

            <div className="mt-1 flex items-center gap-4">
              <OrderStatusBadge status={order.orderStatus} />
              <span className="text-sm text-gray-500">
                Qty: {order.items.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>

            <p className="mt-4 text-sm text-gray-600">Order #{order.id}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          <span className="text-xl font-medium text-gray-900">
            ₹{order.totalAmount.toFixed(2)}
          </span>

          <OrderActions
            status={order.orderStatus}
            onViewOrder={() => onViewOrder(order.id)}
            onCancelOrder={
              onCancelOrder ? () => onCancelOrder(order.id) : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
