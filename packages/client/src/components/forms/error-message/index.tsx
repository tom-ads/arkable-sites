import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const styling = cva("text-red-900 mt-2 font-medium", {
  variants: {
    size: {
      sm: "text-[0.625rem]",
      md: "text-xs",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type FormErrorMessageProps = VariantProps<typeof styling> & {
  className?: string;
  children: React.ReactNode;
};

export function FormErrorMessage({
  className,
  size,
  children,
}: FormErrorMessageProps) {
  if (!children) {
    return;
  }

  return <p className={twMerge(styling({ size }), className)}>{children}</p>;
}
