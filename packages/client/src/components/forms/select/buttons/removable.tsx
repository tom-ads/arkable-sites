import { CrossIcon } from "@/components/icons";
import classNames from "classnames";
import { ReactNode } from "react";

type RemovableItemProps = {
  size: "sm" | "md" | "lg";
  items: { id: string | number; value: ReactNode }[];
  onRemove: (id: string | number) => void;
};

export function RemovableItem({ items, size, onRemove }: RemovableItemProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 cursor-default">
      {items?.map((selectedItem) => (
        <div
          key={selectedItem.id}
          className={classNames(
            "flex items-center gap-2 text-white bg-grey-950",
            {
              "pl-2 pr-1 text-[0.5rem] leading-[0.5rem] rounded-lg h-4":
                size === "sm",
              "pl-3 pr-2 text-[0.625rem] leading-[0.875rem] rounded-xl h-5":
                size === "md",
              "pl-3 pr-2 py-2 text-xs rounded-[14px] gap-2 h-[22px]":
                size === "lg",
            }
          )}
        >
          <span>{selectedItem.value}</span>
          <div
            aria-label="Remove Selected Item"
            onClick={(e) => {
              e.stopPropagation(); // Prevents Listbox from opening
              onRemove(selectedItem.id);
            }}
            className={classNames(
              "transition-all outline-none hover:bg-grey-800 focus:bg-grey-800 rounded-full cursor-pointer",
              {
                "hover:text-grey-50 focus:text-grey-50 p-[1px]": size === "sm",
                "p-[2px]": size === "md" || size === "lg",
              }
            )}
          >
            <CrossIcon
              className={classNames("shrink-0 text-grey-50", {
                "w-[10px] h-[10px]": size === "sm",
                "w-3 h-3": size === "md",
                "w-4 h-4": size === "lg",
              })}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
