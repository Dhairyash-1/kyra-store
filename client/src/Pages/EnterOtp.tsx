import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import BrandLogo from "../assets/logo.png";
import OtpPageBanner from "../assets/otp-image.png";

import OtpSuccessModal from "@/components/OtpSuccessModal";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const EnterOtp = () => {
  const [otp, setOtp] = useState("");

  function handleSubmit() {}

  return (
    <>
      <div className="flex max-h-screen bg-white">
        {/* Left side - Image */}
        <div className="relative hidden lg:block lg:w-1/2">
          <div className="flex-center absolute left-6 top-6">
            <img src={BrandLogo} className="h-6 w-6" />
            <span className="ml-2 text-3xl font-bold">Kyra</span>
          </div>
          <img
            src={OtpPageBanner}
            alt="Man in tan jacket"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right side - Form */}
        <div className="lg:flex-start flex-center w-full  px-6  py-12 sm:ml-[50px] lg:w-1/2">
          <div className="w-full max-w-sm">
            <Link
              to="/forgot-password"
              className="mb-4  flex items-center font-normal text-dark-500"
            >
              <ChevronLeft width={20} className="inline" /> Back
            </Link>
            <h2 className="mb-2 text-3xl font-extrabold text-dark-500">
              Enter OTP
            </h2>
            <p className="mb-6 font-normal text-gray-500">
              We have shared a code to your registered email address.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="space-y-8 ">
                <InputOTP
                  maxLength={5}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  className="flex gap-8"
                >
                  {[0, 1, 2, 3, 4].map((index) => (
                    <InputOTPGroup key={index}>
                      <InputOTPSlot index={index} />
                    </InputOTPGroup>
                  ))}
                </InputOTP>

                <Button
                  type="submit"
                  className="w-full bg-dark-500 text-base font-light text-white hover:bg-gray-800"
                >
                  Verify
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <OtpSuccessModal />
    </>
  );
};

export default EnterOtp;
