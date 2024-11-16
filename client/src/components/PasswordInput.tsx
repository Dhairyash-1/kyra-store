import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PasswordInputProps = {
  register: any;
  error?: any;
  name: string;
  label?: string;
  showLabel?: boolean;
};

export default function PasswordInput({
  register,
  error,
  name,
  label = "Password",
  showLabel = true,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative mt-1">
      {showLabel && (
        <Label className="text-sm font-normal" htmlFor={name}>
          {label}
        </Label>
      )}
      <div className="relative">
        <Input
          id={name}
          type={showPassword ? "text" : "password"}
          {...register(name)}
          className="w-full border-2 border-dark-500 p-4 pr-10 outline-none focus:border-none focus:bg-none"
        />

        <button
          type="button"
          className="absolute inset-y-0 right-3 flex items-center"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-dark-500" />
          ) : (
            <Eye className="h-5 w-5 text-dark-500" />
          )}
        </button>
      </div>

      {error && (
        <p className="mt-1 font-normal text-red-500">{error.message}</p>
      )}
    </div>
  );
}
