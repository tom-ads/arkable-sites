import { twMerge } from "tailwind-merge";
import { type VariantProps, cva } from "class-variance-authority";

type ButtonBaseProps = VariantProps<typeof buttonStyles>;

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonBaseProps {}

const buttonStyles = cva("outline-none font-semibold transition-all", {
  variants: {
    intent: {
      primary: [
        "bg-grey-950 text-grey-50",
        "hover:bg-grey-800",
        "active:bg-grey-950 active:shadow-grey-200",
      ],
      secondary: [
        "bg-grey-800 text-grey-50",
        "hover:bg-grey-600",
        "active:bg-grey-800 active:shadow-grey-200",
      ],
      outlined: ["border border-grey-950"],
    },
    size: {
      small: ["text-xs py-[0.375rem] px-5 active:shadow-sm rounded-2xl"],
      medium: ["text-sm py-2 px-6 min-h-[36px] active:shadow-md rounded-3xl"],
      large: ["text-base py-[0.625rem] px-8 active:shadow-lg rounded-3xl"],
    },
    danger: {},
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

export default function Button({
  className,
  size,
  intent,
  children,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      {...props}
      type="button"
      className={twMerge(buttonStyles({ size, intent }), className)}
    >
      {children}
    </button>
  );
}
