import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import BrandLogo from "../assets/logo.png";
import OtpPageBanner from "../assets/otp-image.png";

import ForgotPasswordFlow from "@/components/ForgotPasswordFlow";
import LoaderButton from "@/components/LoaderButton";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyOtpMutation } from "@/services/authApi";

const EnterOtp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [apiError, setApiError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object({ otp: yup.string().required("OTP is requied") })
    ),
  });

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      return navigate("/");
    }
    setEmail(userEmail);
  }, [navigate]);

  async function handleOtpVerification(data: { otp: string }) {
    if (!email) {
      return console.error("Email is not found");
    }
    try {
      await verifyOtp({ email, OTP: data.otp }).unwrap();
      setIsModalOpen(true);
    } catch (error: any) {
      console.log("Error in verify otp", error);
      if (error?.data?.message) {
        setApiError(error.data.message);
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <>
      <div className="flex min-h-screen bg-white lg:max-h-screen">
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

            {apiError && <span className="text-red-500">{apiError}</span>}

            <form onSubmit={handleSubmit(handleOtpVerification)}>
              <div className="space-y-8 ">
                <Controller
                  name="otp"
                  control={control}
                  rules={{ required: "OTP is required" }}
                  render={({ field }) => (
                    <InputOTP {...field} maxLength={5} className="flex gap-8">
                      {[0, 1, 2, 3, 4].map((index) => (
                        <InputOTPGroup key={index}>
                          <InputOTPSlot index={index} />
                        </InputOTPGroup>
                      ))}
                    </InputOTP>
                  )}
                />
                {errors.otp && (
                  <p className="mt-1 font-normal text-red-500">
                    {errors.otp.message}
                  </p>
                )}

                <LoaderButton
                  type="submit"
                  isLoading={isLoading}
                  label="Verify OTP"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ForgotPasswordFlow otpModalOpen={isModalOpen} />
    </>
  );
};

export default EnterOtp;
