import { ShoppingBagIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import Modal from "../Modal";

const OrderSuccessModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isModalOpen = searchParams.get("status") === "success";

  const handleClose = () => {
    searchParams.delete("status");
    setSearchParams(searchParams);
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      title="Your order has been placed"
      description="Thank you for shopping with us! You can track your order status in the My Orders section."
      actionText="View Orders"
      actionLink={"/orders"}
      icon={<ShoppingBagIcon color="#ffffff" />}
      onClose={handleClose}
      variant="success"
    />
  );
};

export default OrderSuccessModal;
