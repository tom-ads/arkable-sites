import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type FormControlProps = {
  className?: string;
  children: ReactNode;
};

export function FormControl({ className, children }: FormControlProps) {
  return (
    <div className={twMerge("w-full min-w-0 mt-4", className)}>{children}</div>
  );
}
