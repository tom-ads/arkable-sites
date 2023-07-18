import { ReactNode } from "react";

type FormControlProps = {
  children: ReactNode;
};

export default function FormControl({ children }: FormControlProps) {
  return <div>{children}</div>;
}
