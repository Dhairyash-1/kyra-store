import { useNavigate } from "react-router-dom";

import Loader from "@/components/Loader";
import OrderFailedModal from "@/components/orders/OrderFailedModal";
import { OrdersList } from "@/components/orders/OrdersList";
import OrderSuccessModal from "@/components/orders/OrderSuccessModal";
import { useGetAllOrdersQuery } from "@/services/orderApi";

export default function MyOrders() {
  const { isLoading, data } = useGetAllOrdersQuery();
  const navigate = useNavigate();
  const orders = data?.data ?? [];

  const handleViewOrder = (orderId: number) => {
    navigate(`/orders/${orderId}`);
  };

  const handleCancelOrder = (orderId: number) => {
    console.log("Cancel order:", orderId);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mx-auto max-w-4xl ">
        <OrdersList
          orders={orders}
          onViewOrder={handleViewOrder}
          onCancelOrder={handleCancelOrder}
        />
      </div>
      <OrderSuccessModal />
      <OrderFailedModal />
    </>
  );
}
