import { Eye, XCircle } from "lucide-react";

import { OrderStatus } from "@/types/order";

interface OrderActionsProps {
  status: OrderStatus;
  onViewOrder: () => void;
  onCancelOrder?: () => void;
}

export function OrderActions({
  status,
  onViewOrder,
  onCancelOrder,
}: OrderActionsProps) {
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={onViewOrder}
        className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Eye size={16} />
        View Details
      </button>

      {status === "CONFIRMED" && onCancelOrder && (
        <button
          onClick={onCancelOrder}
          className="flex items-center justify-center gap-2 rounded-md border border-red-500 bg-white px-4 py-2 text-sm font-medium text-red-500 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <XCircle size={16} />
          Cancel Order
        </button>
      )}
    </div>
  );
}
