import { useState } from "react";
import { FormInputProps, inputStyling } from "../input";
import { EyeClosedIcon, EyeOpenIcon } from "../../icons";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function FormPasswordInput({
  name,
  disabled,
  size,
  isError,
  className,
  ...props
}: FormInputProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useFormContext();

  return (
    <div className="relative w-full">
      <input
        {...props}
        {...register(name)}
        type={showPassword ? "text" : "password"}
        disabled={disabled}
        className={twMerge(inputStyling({ size, isError }), "pr-8", className)}
      />

      <div className="absolute inset-y-0 right-[12px] flex items-center">
        <button
          type="button"
          tabIndex={-1} // Prevent icon from being tabbable
          onClick={() => setShowPassword(!showPassword)}
          className="w-4 h-4 transition-all outline-none focus-visible:text-purple-90 hover:text-purple-90"
        >
          {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
        </button>
      </div>
    </div>
  );
}
