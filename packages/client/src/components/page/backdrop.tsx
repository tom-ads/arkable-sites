import { PropsWithChildren } from "react";

export function PageBackdrop({ children }: PropsWithChildren) {
  return (
    <div className="border-b bg-grey-50 border-grey-200 w-full0">
      {children}
    </div>
  );
}
