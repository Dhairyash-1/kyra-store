import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import LoginPageBanner from "../assets/login-image.webp";
import BrandLogo from "../assets/logo.png";

import LoaderButton from "@/components/LoaderButton";
import PasswordInput from "@/components/PasswordInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterMutation } from "@/services/authApi";
import { signupFormSchema } from "@/utils/validations";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

export default function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupFormSchema),
  });
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSignUp = async (data: SignupFormData) => {
    try {
      await registerUser(data).unwrap();
      navigate("/login");
    } catch (error: any) {
      console.error("Failed to register user", error);
      if (error?.data?.message) {
        setApiError(error.data.message);
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex max-h-screen bg-white">
      {/* Left side - Image */}

      <div className="relative hidden lg:block lg:w-1/2">
        <div className="flex-center absolute left-6 top-6">
          <img src={BrandLogo} className="h-6 w-6" />
          <span className="ml-2 text-3xl font-bold">Kyra</span>
        </div>
        <img
          src={LoginPageBanner}
          alt="Man in tan jacket"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right side - Form */}
      <div className="lg:flex-start flex-center w-full  px-6  py-12 sm:ml-[50px] lg:w-1/2">
        <div className="w-full max-w-sm">
          <h2 className="mb-2 text-3xl font-extrabold text-dark-500">
            Create New Account
          </h2>
          <p className="mb-6 font-normal text-gray-500">Please enter details</p>
          {apiError && <span className="text-red-500">{apiError}</span>}
          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-normal" htmlFor="firstName">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  className="mt-1 border-2  border-dark-500 p-4 outline-none focus:border-none focus:bg-none "
                />
                {errors.firstName && (
                  <p className="mt-1 font-normal text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="text-sm font-normal" htmlFor="lastName">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  className="mt-1 border-2  border-dark-500 p-4 outline-none focus:border-none focus:bg-none "
                />
                {errors.lastName && (
                  <p className="mt-1 font-normal text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="text-sm font-normal" htmlFor="email">
                  Email Address
                </Label>
                <Input
                  id="email"
                  {...register("email")}
                  className="mt-1 border-2  border-dark-500 p-4 outline-none focus:border-none focus:bg-none "
                />
                {errors.email && (
                  <p className="mt-1 font-normal text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <PasswordInput
                  register={register}
                  error={errors.password}
                  name="password"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  name="agreeTerms"
                  checked={watch("agreeTerms")}
                  onCheckedChange={(checked) =>
                    setValue("agreeTerms", checked as boolean)
                  }
                />
                <Label htmlFor="terms" className="text-base">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="font-bold text-dark-500 hover:underline"
                  >
                    Terms & Conditions
                  </a>
                </Label>
              </div>

              <LoaderButton
                type="submit"
                isLoading={isLoading}
                label="Signup"
                disabled={!getValues("agreeTerms") === true}
              />
              <div className="mt-4 text-center">
                <p className=" text-base font-normal text-dark-500">
                  Already have an account?{" "}
                  <Link to="/login" className="text-gray-500 hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
