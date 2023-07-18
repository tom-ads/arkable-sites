import { useState } from "react";
import FormInput, { FormInputProps } from "./input";
import { EyeClosedIcon, EyeOpenIcon } from "./icons";

export default function FormPasswordInput(props: FormInputProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <FormInput {...props} />

      <div className="absolute inset-y-0 right-[12px] flex items-center">
        <button
          type="button"
          tabIndex={-1} // Prevent icon from being tabbable
          onClick={() => setShowPassword(!showPassword)}
          className="w-4 h-4 outline-none focus-visible:text-purple-90 hover:text-purple-90"
        >
          {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
        </button>
      </div>
    </div>
  );
}
