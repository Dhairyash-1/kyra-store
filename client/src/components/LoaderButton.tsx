import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { Button } from "./ui/button";

interface LoaderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  label: string;
  loaderSize?: number;
  loaderColor?: string;
  className?: string;
}

const LoaderButton: React.FC<LoaderButtonProps> = ({
  isLoading,
  label,
  loaderSize = 22,
  loaderColor = "#ffffff",
  className = "",
  disabled,
  ...props
}) => {
  return (
    <Button
      aria-label="loader"
      {...props}
      className={`w-full bg-dark-500 text-base font-light text-white hover:bg-gray-800 ${className}`}
      disabled={isLoading || disabled}
    >
      {isLoading ? <ClipLoader size={loaderSize} color={loaderColor} /> : label}
    </Button>
  );
};

export default LoaderButton;
