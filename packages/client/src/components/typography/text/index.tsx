import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const styling = cva("text-grey-600 font-medium", {
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

type TextProps = VariantProps<typeof styling> & {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

export function Text({ as = "p", size, className, children }: TextProps) {
  const TextRoot = as;

  return (
    <TextRoot className={twMerge(styling({ size }), className)}>
      {children}
    </TextRoot>
  );
}
