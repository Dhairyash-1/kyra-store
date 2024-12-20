import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import ForgotPageBanner from "../assets/forgotpassword-image.png";
import BrandLogo from "../assets/logo.png";

import LoaderButton from "@/components/LoaderButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPasswordMutation } from "@/services/authApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [apiError, setApiError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object({
        email: yup
          .string()
          .email("Email is Invaild")
          .required("Email is requied"),
      })
    ),
  });

  const handleForgotPass = async (data: { email: string }) => {
    try {
      await forgotPassword({ email: data.email }).unwrap();
      navigate("/enter-otp");
    } catch (error: any) {
      console.log("Error in forgot password request", error);
      if (error?.data?.message) {
        setApiError(error.data.message);
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    }
    // save email to localstorage for forgotpassword flow
    localStorage.setItem("userEmail", data.email);
  };

  return (
    <div className="flex min-h-screen bg-white lg:max-h-screen">
      {/* Left side - Image */}
      <div className="relative hidden lg:block lg:w-1/2">
        <div className="flex-center absolute left-6 top-6">
          <img src={BrandLogo} className="h-6 w-6" />
          <span className="ml-2 text-3xl font-bold">Kyra</span>
        </div>
        <img
          src={ForgotPageBanner}
          alt="Man in tan jacket"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right side - Form */}
      <div className="lg:flex-start flex-center w-full  px-6  py-12 sm:ml-[50px] lg:w-1/2">
        <div className="w-full max-w-sm">
          <Link
            to="/login"
            className="mb-4  flex items-center font-normal text-dark-500"
          >
            <ChevronLeft width={20} className="inline" /> Back
          </Link>
          <h2 className="mb-2 text-3xl font-extrabold text-dark-500">
            Forgot Password
          </h2>
          <p className="mb-6 font-normal text-gray-500">
            Enter your registered email address. we'll send you a code to reset
            your password.
          </p>
          {apiError && <span className="text-red-500">{apiError}</span>}

          <form onSubmit={handleSubmit(handleForgotPass)}>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-normal" htmlFor="email">
                  Email Address
                </Label>
                <Input
                  id="email"
                  {...register("email")}
                  className="mt-1 border-2  border-dark-500 p-4 outline-none focus:border-none focus:bg-none "
                />
              </div>
              {errors.email && (
                <p className="mt-1 font-normal text-red-500">
                  {errors.email.message}
                </p>
              )}

              <LoaderButton
                type="submit"
                isLoading={isLoading}
                label="Send OTP"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
