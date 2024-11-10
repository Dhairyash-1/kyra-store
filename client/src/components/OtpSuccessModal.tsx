import Modal from "./Modal";

const OtpSuccessModal = ({
  isModalOpen,
  onClose,
  onActionClick,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  onActionClick: () => void;
}) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      onClose={onClose}
      title="OTP Verified Successfully"
      description="Your OTP has been verified successfully."
      actionText="Go to Password Reset"
      onActionClick={onActionClick}
    />
  );
};

export default OtpSuccessModal;
