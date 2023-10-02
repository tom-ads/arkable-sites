import { twMerge } from "tailwind-merge";
import { type VariantProps, cva } from "class-variance-authority";

export type ButtonStyling = VariantProps<typeof buttonStyles>;

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStyling {
  block?: boolean;
  disabled?: boolean;
}

export const buttonStyles = cva("outline-none font-semibold transition-all", {
  variants: {
    intent: {
      primary: [
        "bg-grey-950 text-grey-50",
        "hover:bg-grey-800",
        "active:bg-grey-950 active:!shadow-grey-200",
      ],
      secondary: [
        "bg-grey-800 text-grey-50",
        "hover:bg-grey-600",
        "active:bg-grey-800 active:!shadow-grey-200",
      ],
      outlined: [
        "border border-grey-950",
        "hover:border-grey-800 hover:text-grey-800",
        "active:border-grey-950 active:text-grey-950 active:!shadow-grey-200",
      ],
    },
    size: {
      small: "text-xs py-2 px-5 active:shadow-focus-sm rounded-2xl",
      medium:
        "text-sm py-2 px-6 min-h-[36px] active:shadow-focus-md rounded-3xl",
      large: "text-base py-[0.625rem] px-8 active:shadow-focus-lg rounded-3xl",
    },
    danger: {
      true: "text-white",
    },
    disabled: {
      true: "pointer-events-none cursor-not-allowed select-none",
    },
    block: {
      true: "w-full",
    },
  },
  compoundVariants: [
    // Danger
    {
      intent: "primary",
      danger: true,
      className: [
        "bg-red-900 !shadow-red-200",
        "hover:bg-red-800",
        "active:bg-red-900 active:!shadow-red-200",
      ],
    },
    {
      intent: "outlined",
      danger: true,
      className: [
        "border-red-900 text-red-900",
        "hover:border-red-800 hover:text-red-800",
        "active:border-red-900 active:!shadow-red-200 active:text-red-900",
      ],
    },
    // Disabled
    {
      intent: ["primary", "secondary"],
      disabled: true,
      className: [
        "bg-grey-300 text-white",
        "hover:bg-grey-300",
        "active:bg-grey-300",
      ],
    },
    {
      intent: "outlined",
      disabled: true,
      className: [
        "border-grey-300 text-grey-300",
        "hover:border-grey-300",
        "active:border-grey-300",
      ],
    },
  ],
  defaultVariants: {
    intent: "primary",
    size: "medium",
    danger: false,
    disabled: false,
    block: false,
  },
});

export function Button({
  className,
  size,
  intent,
  danger,
  disabled,
  block,
  type = "button",
  children,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      className={twMerge(
        buttonStyles({ size, intent, danger, disabled, block }),
        className
      )}
    >
      {children}
    </button>
  );
}
