import { CheckCircle2, Clock, Package, Truck } from "lucide-react";

import { OrderStatus } from "@/types/order";

interface OrderTimelineProps {
  status: OrderStatus;
}

const timelineSteps = [
  { status: "INPROCESS", icon: Clock, label: "Processing" },
  { status: "CONFIRMED", icon: CheckCircle2, label: "Order Confirmed" },
  { status: "SHIPPED", icon: Truck, label: "Shipped" },
  { status: "DELIVERED", icon: Package, label: "Delivered" },
];

const statusIndex = {
  INPROCESS: 0,
  CONFIRMED: 1,
  SHIPPED: 2,
  DELIVERED: 3,
  FAILED: -1,
};

export function OrderTimeline({ status }: OrderTimelineProps) {
  const currentStep = statusIndex[status];

  return (
    <div className="py-6">
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 transform bg-gray-200">
          <div
            className="h-full bg-orange-500 transition-all duration-500"
            style={{
              width: `${(currentStep / (timelineSteps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {timelineSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index <= currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={step.label} className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    isActive
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  } ${isCurrent ? "ring-4 ring-orange-100" : ""}`}
                >
                  <StepIcon className="h-5 w-5" />
                </div>
                <p
                  className={`mt-2 text-sm font-medium ${
                    isActive ? "text-orange-500" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
