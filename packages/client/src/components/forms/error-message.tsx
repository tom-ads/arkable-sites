import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const styling = cva("text-red-900 mt-2 font-medium", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type FormErrorMessageProps = typeof styling & {
  className?: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
};

export default function FormErrorMessage({
  className,
  size,
  children,
}: FormErrorMessageProps) {
  return <p className={twMerge(styling({ size }), className)}>{children}</p>;
}
