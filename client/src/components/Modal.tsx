import React from "react";
import { Link } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon?: string; // Optional icon for success modals
  actionText: string;
  onActionClick?: () => void;
  actionLink?: string; // Optional link for reset success modal
}

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  onClose,
  title,
  description,
  icon,
  actionText,
  onActionClick,
  actionLink,
}) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <div className={`${isModalOpen ? "fixed inset-0 backdrop-blur-sm" : ""}`}>
        <DialogContent className="flex-center max-w-sm p-4">
          <DialogHeader className="w-full">
            <div className="flex-center">
              {icon && (
                <div className="flex-center h-[108px] w-[108px] rounded-full bg-dark-5">
                  <div className="flex-center h-[86px] w-[86px] rounded-full bg-dark-20">
                    <div className="flex-center h-16 w-16 rounded-full bg-dark-500">
                      <img src={icon} className="h-5 w-5" alt="check" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DialogTitle className="dark-500 text-center text-xl font-bold">
              {title}
            </DialogTitle>
            <DialogDescription className="text-center text-sm font-normal text-dark-500">
              {description}
            </DialogDescription>
            <DialogTrigger asChild>
              {actionLink ? (
                <Link
                  to={actionLink} // Link to login page on success
                  className="!mt-6 inline-block cursor-pointer rounded bg-dark-500 px-6 py-2 text-center text-base font-normal text-white"
                >
                  {actionText}
                </Link>
              ) : (
                <button
                  onClick={onActionClick} // Action for OTP success, reset password, etc.
                  className="!mt-6 inline-block cursor-pointer rounded bg-dark-500 px-6 py-2 text-center text-base font-normal text-white"
                >
                  {actionText}
                </button>
              )}
            </DialogTrigger>
          </DialogHeader>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default Modal;
