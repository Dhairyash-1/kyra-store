import { Order } from "@/types/order";

interface OrderSummaryProps {
  order: Order;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 40; // Example shipping cost

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>

      <div className="mt-4 space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <p>Subtotal</p>
          <p>₹{subtotal.toFixed(2)}</p>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <p>Shipping</p>
          <p>₹{shipping.toFixed(2)}</p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between">
            <p className="text-base font-medium text-gray-900">Total</p>
            <p className="text-base font-medium text-gray-900">
              ₹{shipping && (shipping + order.totalAmount).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
