import { useState } from "react";
import { Link } from "react-router-dom";

import LoginPageBanner from "../assets/login-image.png";
import BrandLogo from "../assets/logo.png";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-normal" htmlFor="firstName">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 border-2  border-dark-500 p-4 outline-none focus:border-none focus:bg-none "
                />
              </div>
              <div>
                <Label className="text-sm font-normal" htmlFor="lastName">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 border-2  border-dark-500 p-4 outline-none focus:border-none focus:bg-none "
                />
              </div>
              <div>
                <Label className="text-sm font-normal" htmlFor="email">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 border-2  border-dark-500 p-4 outline-none focus:border-none focus:bg-none "
                />
              </div>
              <div>
                <Label className="text-sm font-normal" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="mt-1 border-2  border-dark-500 p-4 outline-none focus:border-none focus:bg-none "
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      agreeTerms: checked as boolean,
                    }))
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
              <Button
                type="submit"
                className="w-full bg-dark-500 text-base font-light text-white hover:bg-gray-800"
              >
                Signup
              </Button>
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
