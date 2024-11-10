import { useEffect, useState } from "react";

import OtpSuccessModal from "./OtpSuccessModal";
import PasswordResetModal from "./PasswordResetModal";
import PasswordResetSuccessModal from "./PasswordResetSuccessModal";

const ForgotPasswordFlow = ({ otpModalOpen }: { otpModalOpen: boolean }) => {
  const [isOtpSuccessModalOpen, setIsOtpSuccessModalOpen] =
    useState(otpModalOpen);
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] =
    useState(false);
  const [isPasswordResetSuccessModalOpen, setIsPasswordSuccessModalOpen] =
    useState(false);

  useEffect(() => {
    setIsOtpSuccessModalOpen(otpModalOpen);
  }, [otpModalOpen]);

  // Toggle the OTP success modal
  const handleOtpSuccessModalClose = () => {
    setIsOtpSuccessModalOpen(false);
  };

  // Toggle the password reset modal
  const handlePasswordResetModalOpen = () => {
    setIsOtpSuccessModalOpen(false); // Close OTP modal
    setIsPasswordResetModalOpen(true); // Open password reset modal
  };

  return (
    <div>
      {/* OTP Success Modal */}
      <OtpSuccessModal
        isModalOpen={isOtpSuccessModalOpen}
        onActionClick={handlePasswordResetModalOpen}
        onClose={handleOtpSuccessModalClose}
      />

      {/* Password Reset Success Modal */}
      <PasswordResetSuccessModal
        isModalOpen={isPasswordResetSuccessModalOpen}
        onClose={() => setIsPasswordSuccessModalOpen(false)}
        actionLink="/login"
      />
      <PasswordResetModal
        isModalOpen={isPasswordResetModalOpen}
        onClose={() => setIsPasswordResetModalOpen(false)}
        showSuccessModal={(open) => setIsPasswordSuccessModalOpen(open)}
      />
    </div>
  );
};

export default ForgotPasswordFlow;
