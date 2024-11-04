import { Link } from "react-router-dom";

import checkIcon from "../assets/check.png";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const OtpSuccessModal = () => {
  const isModalActive = false;
  return (
    <Dialog open={isModalActive}>
      <div
        className={`${isModalActive ? " fixed inset-0 backdrop-blur-sm " : ""}`}
      >
        <DialogContent className="flex-center max-w-sm p-4 ">
          <DialogHeader className="w-full">
            <div className="flex-center">
              <div className="flex-center h-[108px] w-[108px] rounded-full bg-dark-5">
                <div className="flex-center h-[86px] w-[86px] rounded-full bg-dark-20">
                  <div className="flex-center h-16 w-16 rounded-full bg-dark-500">
                    <img src={checkIcon} className="h-5 w-5" alt="check" />
                  </div>
                </div>
              </div>
            </div>
            <DialogTitle className="dark-500 text-center text-xl font-bold">
              Password Changed Successfully
            </DialogTitle>
            <DialogDescription className="text-center text-sm font-normal text-dark-500">
              Your password has been updated successfully
            </DialogDescription>
            <DialogTrigger asChild>
              <Link
                to="/login"
                className="!mt-6 inline-block cursor-pointer rounded bg-dark-500 px-6 py-2  text-center text-base font-normal text-white"
              >
                Back to Login
              </Link>
            </DialogTrigger>
          </DialogHeader>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default OtpSuccessModal;
