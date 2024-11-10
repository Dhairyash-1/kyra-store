import Modal from "./Modal";

interface ModalProp {
  isModalOpen: boolean;
  onClose: () => void;
  actionLink: string;
}

const PasswordResetSuccessModal = ({
  isModalOpen,
  onClose,
  actionLink,
}: ModalProp) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      title="Password Changed Successfully"
      description="Your password has been updated successfully."
      actionText="Back to Login"
      actionLink={actionLink}
      onClose={onClose}
    />
  );
};

export default PasswordResetSuccessModal;
