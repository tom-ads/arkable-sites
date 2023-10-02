import { Listbox, Transition } from "@headlessui/react";
import { cva } from "class-variance-authority";
import { Fragment, useMemo, useState } from "react";
import { useController } from "react-hook-form";
import classNames from "classnames";
import { RemovableItem } from "../select/buttons/removable";
import { cn } from "@/app/_helpers/styling";

export const btnStyling = cva(
  [
    "relative rounded-4xl transition-all border w-full outline-none flex items-center border-grey-200",
    "focus:border-grey-950 focus:shadow-grey-200/50",
    "disabled:border-grey-300 disabled:bg-grey-100 disabled:text-grey-300 disabled:shadow-none",
  ],
  {
    variants: {
      size: {
        sm: "px-3 py-[0.375rem] text-xs focus:shadow-focus-sm",
        md: "px-4 py-2 text-sm focus:shadow-focus-md",
        lg: "px-4 py-2 text-base leading-[1.375rem] focus:shadow-focus-lg",
      },
      isFocused: {
        true: "border-grey-950 shadow-focus-md shadow-grey-200/50 focus:shadow-grey-200/50",
      },
      isError: {
        true: "shadow-red-200/50 border-red-800 focus:border-red-800 focus:shadow-red-200/50",
      },
    },
    defaultVariants: {
      size: "md",
      isError: false,
      isFocused: false,
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

type SelectedItem = {
  id: string | number;
  value: JSX.Element;
};

type Option = {
  isSelected: boolean;
  option: SelectedItem;
};

type FormMultiSelectProps = {
  name: string;
  control: any;
  size?: "sm" | "md" | "lg";
  placeHolder: string;
  isDisabled?: boolean;
  isError?: boolean;
  btnClassName?: string;
  optionClassName?: string;
  optionListClassName?: string;
  renderBtn?: (item: SelectedItem[]) => JSX.Element;
  renderOption?: (option: Option) => JSX.Element;
  children: JSX.Element[];
};

export const FormMultiSelect = ({
  name,
  control,
  size = "md",
  placeHolder,
  isError = false,
  isDisabled = false,
  renderBtn,
  renderOption,
  btnClassName,
  optionClassName,
  optionListClassName,
  children,
}: FormMultiSelectProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const {
    field: { value: selectedItems, onChange },
  } = useController({ name, control });

  const validChildren = useMemo(
    () =>
      children
        ?.filter((child) => child?.props?.value && child?.props?.children)
        ?.map((child) => ({
          id: child.props.value,
          value: child.props.children,
        })),
    [children]
  );

  const handleRemove = (id: string | number) => {
    const newValue = selectedItems.filter(
      (selectedId: number | string) => selectedId !== id
    );

    onChange(newValue);
  };

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
    <div className="relative w-full">
      <Listbox
        onChange={onChange}
        value={selectedItems}
        disabled={isDisabled}
        multiple
      >
        {({ open }) => (
          <>
            <Listbox.Button
              className={cn([
                btnStyling({
                  size,
                  isError,
                  isFocused,
                }),
                btnClassName,
              ])}
            >
              {/* Placeholder */}
              {!validSelectedItems?.length && (
                <span className="select-none text-grey-400">{placeHolder}</span>
              )}

              {/* Selected Item(s) */}
              {validSelectedItems?.length > 0 && (
                <>
                  {renderBtn ? (
                    renderBtn(validSelectedItems)
                  ) : (
                    <RemovableItem
                      size={size}
                      items={validSelectedItems}
                      onRemove={handleRemove}
                    />
                  )}
                </>
              )}
            </Listbox.Button>

            <Transition
              as={Fragment}
              show={open}
              enter="transition duration-150 ease-out"
              enterFrom="transform translate-y-3 opacity-0"
              enterTo="transform translate-y-1 opacity-100"
              leave="transition duration-300 ease-out"
              leaveFrom="transform translate-y-1 opacity-100"
              leaveTo="transform translate-y-3 opacity-0"
            >
              <Listbox.Options
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={cn([listStyling({ size }), optionListClassName])}
                static
              >
                {validChildren?.map((option) => (
                  <Listbox.Option
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
                            className={classNames(" rounded-full", {
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
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
};
