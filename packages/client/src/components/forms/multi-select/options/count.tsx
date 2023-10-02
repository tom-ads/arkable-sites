import { ReactNode } from "react";

type RemovableProps = {
  items: { id: string | number; value: ReactNode }[];
};

export function CountItem({ items }: RemovableProps) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      <span className="text-sm font-medium select-none">
        {items?.length ?? 0} Selected Items
      </span>
    </div>
  );
}
