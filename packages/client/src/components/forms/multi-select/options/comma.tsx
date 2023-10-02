import { ReactNode } from "react";

type RemovableProps = {
  items: { id: string | number; value: JSX.Element }[];
};

export function CommaItem({ items }: RemovableProps) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      <span className="text-sm font-medium select-none">
        {items?.map((v) => v.value.props.children).join(", ")}
      </span>
    </div>
  );
}
