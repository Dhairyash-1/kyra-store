import { XIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import Modal from "../Modal";

const OrderFailedModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isModalOpen = searchParams.get("status") === "failed";

  const handleClose = () => {
    searchParams.delete("status");
    setSearchParams(searchParams);
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      title="Order Failed"
      description="Something went wrong with your order. Please try again or contact support for help."
      actionText="View Orders"
      actionLink={"/orders"}
      icon={<XIcon color="white" size={48} />}
      variant="failed"
      onClose={handleClose}
    />
  );
};

export default OrderFailedModal;
