import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import ForgotPageBanner from "../assets/forgotpassword-image.png";
import BrandLogo from "../assets/logo.png";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", email);
    // Here you would typically send the data to your backend
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

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-normal" htmlFor="email">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 border-2  border-dark-500 p-4 outline-none focus:border-none focus:bg-none "
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-dark-500 text-base font-light text-white hover:bg-gray-800"
              >
                Send OTP
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
