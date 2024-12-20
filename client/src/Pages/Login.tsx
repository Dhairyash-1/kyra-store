import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import LoginPageBanner from "../assets/create-banner.png";
import BrandLogo from "../assets/logo.png";

import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateAuthStatus } from "@/features/auth/authSlice";
import { useLoginMutation } from "@/services/authApi";
import { loginFormSchema } from "@/utils/validations";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    console.log(data);
    try {
      const res = await login(data).unwrap();
      dispatch(
        updateAuthStatus({
          isAuthenticated: true,
          userId: res.data.id,
          role: res.data.role,
          name: `${res.data.firstName} ${res.data.lastName}`,
          profileImage: res.data.img,
          isLoading: false,
        })
      );
      console.log(res);
      const queryRedirect = new URLSearchParams(location.search).get(
        "redirect"
      );
      let redirectPath;
      if (res.data.role === "admin") {
        redirectPath = queryRedirect || "/admin";
      } else {
        redirectPath = queryRedirect || "/";
      }
      console.log("Redirecting to:", redirectPath);
      return navigate(redirectPath, { replace: true });
    } catch (error: any) {
      console.log("Error in login", error);
      if (error?.data?.message) {
        setApiError(error.data.message);
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    }
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
          src={LoginPageBanner}
          alt="Man in tan jacket"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right side - Form */}
      <div className="lg:flex-start flex-center w-full  px-6  py-12 sm:ml-[50px] lg:w-1/2">
        <div className="w-full max-w-sm">
          <h2 className="mb-2 text-3xl font-extrabold text-dark-500">
            Welcome 👋
          </h2>
          <p className="mb-6 font-normal text-gray-500">Please login here</p>

          {apiError && <span className="text-red-500">{apiError}</span>}
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-normal" htmlFor="email">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1 border-2  border-dark-500 p-4 outline-none focus:border-none focus:bg-none "
                  {...register("email")}
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
                  id="rememberMe"
                  checked={watch("rememberMe")}
                  onCheckedChange={(checked) => {
                    setValue("rememberMe", checked as boolean);
                  }}
                />
                <div className="flex w-full items-center justify-between ">
                  <Label htmlFor="rememberMe" className="text-base font-normal">
                    Remember Me
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="block text-base font-normal"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-dark-500 text-base font-light text-white hover:bg-gray-800"
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader size={22} color="#ffffff" /> : "Login"}
              </Button>
              <div className="mt-4 text-center">
                <p className="text-sm text-dark-500">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className=" text-base font-normal text-gray-500 hover:underline"
                  >
                    Signup
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
