import { VariantProps, cva } from "class-variance-authority";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type FormInputBaseProps = VariantProps<typeof inputStyling>;

export interface FormInputProps
  extends React.HTMLAttributes<HTMLInputElement>,
    FormInputBaseProps {
  name: string;
  disabled?: boolean;
}

export const inputStyling = cva(
  [
    "outline-none placeholder:text-grey-400 rounded-4xl text-grey-800 transition-all border border-grey-200 w-full",
    "focus:border-grey-950 focus:shadow-grey-200",
    "disabled:border-grey-300 disabled:bg-grey-100 disabled:text-grey-300 disabled:shadow-none",
  ],
  {
    variants: {
      size: {
        sm: "px-4 py-[0.375rem] text-xs focus:shadow-sm",
        md: "px-4 py-2 text-sm focus:shadow-md",
        lg: "px-5 py-[0.625rem] text-base leading-[1.375rem] focus:shadow-lg",
      },
      isError: {
        true: "border-red-900 focus:shadow-red-200 focus:border-red-900",
      },
    },
    defaultVariants: {
      size: "md",
      isError: false,
    },
  }
);

export default function FormInput({
  size,
  className,
  isError,
  name,
  disabled = false,
  ...props
}: FormInputProps): JSX.Element {
  const { register } = useFormContext();

  return (
    <input
      {...props}
      {...register(name)}
      disabled={disabled}
      className={twMerge(inputStyling({ size, isError }), className)}
    />
  );
}
