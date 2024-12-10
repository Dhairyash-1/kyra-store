import { Package } from "lucide-react";

import { OrderItem } from "@/types/order";

interface OrderDetailsItemProps {
  item: OrderItem;
}

export function OrderDetailsItem({ item }: OrderDetailsItemProps) {
  console.log(item);
  return (
    <div className="flex items-start gap-4 border-b border-gray-200 py-4">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        {item.mainImage ? (
          <img
            src={item.mainImage}
            alt={item.name}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <Package className="h-8 w-8 text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium text-gray-900">{item.name}</h4>
            {item.size && (
              <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Quantity: {item.quantity}
            </p>
          </div>
          <p className="text-right font-medium text-gray-900">
            ₹{(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
