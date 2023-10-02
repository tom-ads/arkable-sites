import { PropsWithChildren } from "react";

type OptionProps = PropsWithChildren<{ value: number | string }>;

export function Option({ children }: OptionProps) {
  return <>{children}</>;
}
