import { cn } from "@/app/_helpers/styling";
import { useDebounce } from "@/hooks/use-debounce";
import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useMemo, useRef, useState } from "react";
import { useController } from "react-hook-form";
import { btnStyling } from "../multi-select";
import classNames from "classnames";
import { CrossIcon } from "@/components/icons";
import { cva } from "class-variance-authority";

const defaultOptionStyling = cva(
  [
    "text-grey-950 select-none transition-all cursor-pointer flex items-center group",
  ],
  {
    variants: {
      size: {
        sm: "px-2 py-1 text-[10px] leading-3 rounded-2xl gap-[6px]",
        md: "px-3 py-[0.375rem] text-xs rounded-2xl gap-2",
        lg: "px-3 py-2 text-sm rounded-3xl gap-2",
      },
      isSelected: {
        true: "bg-grey-950 text-grey-50",
        false: "hover:bg-grey-50 active:bg-grey-100",
      },
    },
    defaultVariants: {
      size: "md",
      isSelected: false,
    },
  }
);

const listStyling = cva(
  "p-3 space-y-1 shadow-sm rounded-2xl min-h-[50px] focus:outline-none",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type SelectedItem = {
  id: string | number;
  value: JSX.Element;
};

type Option = {
  isSelected: boolean;
  option: SelectedItem;
};

type FormComboBoxProps = {
  name: string;
  control: any;
  size?: "sm" | "md" | "lg";
  isError?: boolean;
  isAsync?: boolean;
  placeHolder?: string;
  btnClassName?: string;
  optionClassName?: string;
  optionListClassName?: string;
  renderBtn?: (item: SelectedItem[]) => JSX.Element;
  renderOption?: (option: Option) => JSX.Element;
  children: JSX.Element[];
};

export function FormComboBox({
  name,
  control,
  size = "md",
  isError,
  isAsync,
  btnClassName,
  renderBtn,
  optionClassName,
  optionListClassName,
  renderOption,
  children,
}: FormComboBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 500, { pause: !isAsync });

  const {
    field: { value: selectedItems, onChange },
  } = useController({ name, control });

  //   const validOptions = useMemo(() => {
  //     if (!searchTerm) return options;

  //     return options?.filter((option) =>
  //       option?.value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }, [options, searchTerm]);

  const handleRemove = (id: string | number) => {
    const filteredItems = selectedItems.filter(
      (selectedId: number | string) => selectedId !== id
    );

    onChange(filteredItems);
  };

  const validChildren = useMemo(
    () =>
      children
        ?.filter((child) => child?.props?.value && child?.props?.children)
        ?.filter((child) => {
          return searchTerm
            ? child?.props?.children?.props?.children
                ?.toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            : true;
        })
        ?.map((child) => ({
          id: child.props.value,
          value: child.props.children,
        })),
    [children, searchTerm]
  );

  const validSelectedItems = useMemo(
    () =>
      selectedItems
        ?.filter((selectedId: number | string) =>
          validChildren?.some((child) => child.id === selectedId)
        )
        ?.map((selectedId: number | string) =>
          validChildren?.find((child) => child.id === selectedId)
        ),
    [selectedItems, validChildren]
  );

  return (
    <Combobox
      value={selectedItems || []}
      onChange={onChange}
      className="relative w-full cursor-text"
      as="div"
      multiple
    >
      {({ open }) => (
        <>
          <div className="flex items-center w-full gap-2">
            {/* Input */}
            <Combobox.Button
              onClick={() => {
                if (isFocused) return;
                setIsFocused(true);
              }}
              className={cn([
                btnStyling({
                  size: "md",
                  isError,
                  isFocused: open || isFocused,
                }),
                "cursor-text flex items-center flex-wrap gap-1",
                btnClassName,
              ])}
            >
              <>
                {/* Selected Items */}
                {validSelectedItems?.map((selectedItem: SelectedItem) => (
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
                        handleRemove(selectedItem.id);
                      }}
                      className={classNames(
                        "transition-all outline-none hover:bg-grey-800 focus:bg-grey-800 rounded-full cursor-pointer",
                        {
                          "hover:text-grey-50 focus:text-grey-50 p-[1px]":
                            size === "sm",
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

                <Combobox.Input
                  ref={inputRef}
                  name={name}
                  value={searchTerm ?? ""}
                  onFocus={() => {
                    if (isFocused) return;
                    setIsFocused(true);
                  }}
                  onBlur={() => {
                    setSearchTerm("");
                    if (open) return;
                    setIsFocused(false);
                  }}
                  className="flex flex-grow min-w-0 outline-none"
                  onChange={(event) => setSearchTerm(event.target.value)}
                  autoComplete="off"
                />
              </>
            </Combobox.Button>
          </div>

          {/* Options */}
          <Transition
            as={Fragment}
            show={open}
            enter="transition duration-300 ease-out"
            enterFrom="transform translate-y-3 opacity-0"
            enterTo="transform translate-y-1 opacity-100"
            leave="transition duration-150 ease-out"
            leaveFrom="transform translate-y-1 opacity-100"
            leaveTo="transform translate-y-3 opacity-0"
            afterLeave={() => inputRef.current?.focus()}
          >
            <Combobox.Options
              className={cn([listStyling({ size }), optionListClassName])}
              static
            >
              {validChildren?.map((option) => (
                <Combobox.Option
                  key={option.id}
                  value={option.id}
                  as={Fragment}
                >
                  {({ selected: isSelected }) => {
                    // Render custom option if provided
                    if (!!renderOption) {
                      return renderOption({ isSelected, option });
                    }

                    return (
                      <li
                        className={cn([
                          defaultOptionStyling({ size, isSelected }),
                          optionClassName,
                        ])}
                      >
                        <div
                          className={classNames("rounded-full", {
                            "w-1 h-1": size === "sm",
                            "w-[6px] h-[6px]": size === "md",
                            "w-2 h-2": size === "lg",
                            "bg-grey-50": isSelected,
                          })}
                        ></div>
                        {option.value.props.children}
                      </li>
                    );
                  }}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </>
      )}
    </Combobox>
  );
}
