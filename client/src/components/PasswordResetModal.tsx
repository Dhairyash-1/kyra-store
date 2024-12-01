import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import LoaderButton from "./LoaderButton";
import PasswordInput from "./PasswordInput";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useResetPasswordMutation } from "@/services/authApi";
import { resetPasswordSchema } from "@/utils/validations";

const PasswordResetModal = ({
  isModalOpen,
  onClose,
  showSuccessModal,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  showSuccessModal: (open: boolean) => void;
}) => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  // Handle password reset logic
  const handlePasswordReset = async (data: {
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      return console.error("Email not found for password reset");
    }
    try {
      await resetPassword({ email, password: data.newPassword }).unwrap();
      showSuccessModal(true);
      onClose();
    } catch (error) {
      console.log("Error in password reset", error);
    } finally {
      localStorage.removeItem("userEmail");
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
            <form
              onSubmit={handleSubmit(handlePasswordReset)}
              className="flex flex-col space-y-4 "
            >
              <div>
                <PasswordInput
                  register={register}
                  error={errors.newPassword}
                  name="newPassword"
                  label="New Password"
                  showLabel={false}
                />
              </div>
              <div>
                <PasswordInput
                  register={register}
                  error={errors.confirmNewPassword}
                  name="confirmNewPassword"
                  label="Confirm New Password"
                  showLabel={false}
                />
              </div>
              <LoaderButton
                isLoading={isLoading}
                label="Reset Password"
                className="!mt-6 inline-block cursor-pointer rounded "
                type="submit"
              />
            </form>
          </DialogHeader>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default PasswordResetModal;
