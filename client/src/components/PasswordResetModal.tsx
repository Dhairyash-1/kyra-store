import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { resetPassword } from "@/services/authApi";

const PasswordResetModal = ({
  isModalOpen,
  onClose,
  showSuccessModal,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  showSuccessModal: (open: boolean) => void;
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle password reset logic
  const handlePasswordReset = async () => {
    if (newPassword === confirmPassword) {
      // Perform password reset logic here (e.g., API request)
      const email = localStorage.getItem("userEmail");
      if (!email) {
        return console.error("Email not found for password reset");
      }
      const response = await resetPassword({ email, password: newPassword });
      if (response.statusCode === 200) {
        showSuccessModal(true);
      }
      console.log("Password reset successful");
      onClose(); // Close modal after resetting password
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <div className={`${isModalOpen ? "fixed inset-0 backdrop-blur-sm" : ""}`}>
        <DialogContent className="flex-center max-w-sm p-4">
          <DialogHeader className="w-full">
            <DialogTitle className="dark-500 text-center text-xl font-bold">
              Reset Your Password
            </DialogTitle>
            <DialogDescription className="text-center text-sm font-normal text-dark-500">
              Please enter your new password.
            </DialogDescription>
            {/* Form fields */}
            <div className="flex flex-col space-y-4">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border-dark-300 rounded border px-4 py-2"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-dark-300 rounded border px-4 py-2"
              />
            </div>
            <DialogTrigger asChild>
              <button
                onClick={handlePasswordReset}
                className="!mt-6 inline-block cursor-pointer rounded bg-dark-500 px-6 py-2 text-center text-base font-normal text-white"
              >
                Reset Password
              </button>
            </DialogTrigger>
          </DialogHeader>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default PasswordResetModal;
