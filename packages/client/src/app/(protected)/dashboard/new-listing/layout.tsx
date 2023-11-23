import { PropsWithChildren } from "react";

export default function NewListingLayout({ children }: PropsWithChildren) {
  return (
    <div className="max-w-[654px] mx-auto px-8 my-[61px]">
      <div className="py-8">{children}</div>
    </div>
  );
}
