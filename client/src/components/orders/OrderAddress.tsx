import { Address } from "@/types/order";
import { MapPin } from "lucide-react";

interface OrderAddressProps {
  address: Address;
}

export function OrderAddress({ address }: OrderAddressProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900">Delivery Address</h3>
      </div>

      <div className="mt-4 space-y-1 text-sm text-gray-600">
        <p className="font-medium text-gray-900">{address.fullName}</p>
        <p>{address.addressLine1}</p>
        <p>
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p>{address.country}</p>
        <p className="mt-2">Phone: {address.phone}</p>
      </div>
    </div>
  );
}
