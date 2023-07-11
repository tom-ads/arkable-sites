import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

type FormInputBaseProps = VariantProps<typeof inputStyling>;

interface FormInputProps
  extends React.HTMLAttributes<HTMLInputElement>,
    FormInputBaseProps {
  disabled?: boolean;
}

export const inputStyling = cva(
  [
    "outline-none placeholder:text-grey-400 rounded-4xl text-grey-800 transition-all border border-grey-200",
    "focus:border-grey-950 focus:shadow-grey-200",
    "disabled:border-grey-300 disabled:bg-grey-100 disabled:text-grey-300 disabled:shadow-none",
  ],
  {
    variants: {
      size: {
        small: "px-4 py-[0.375rem] text-xs focus:shadow-sm",
        medium: "px-4 py-2 text-sm focus:shadow-md",
        large:
          "px-5 py-[0.625rem] text-base leading-[1.375rem] focus:shadow-lg",
      },
      danger: {
        true: "border-red-900 text-red-900 focus:shadow-red-200 focus:border-red-900 placeholder:text-red-800",
      },
    },
    defaultVariants: {
      size: "medium",
      danger: false,
    },
  }
);

export default function FormInput({
  size,
  className,
  danger,
  disabled = false,
  ...props
}: FormInputProps): JSX.Element {
  return (
    <input
      {...props}
      disabled={disabled}
      className={twMerge(inputStyling({ size, danger }), className)}
    />
  );
}
