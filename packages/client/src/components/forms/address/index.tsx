"use client";

import { cn } from "@/app/_helpers/styling";
import { useDebounce } from "@/hooks/use-debounce";
import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { btnStyling } from "../multi-select";
import classNames from "classnames";
import { cva } from "class-variance-authority";
import { useSearchPostcodeQuery } from "@/app/_features/services/api/queries/address.generated";
import { Address } from "@/graphql/types";

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
  "p-3 space-y-1 shadow-sm rounded-2xl min-h-[50px] focus:outline-none absolute inset-x-0 z-999 bg-white",
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

type FormAddressProps = {
  onChange: (address: Address) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  isError?: boolean;
  placeHolder?: string;
};

export function FormAddress({
  size,
  placeHolder,
  className,
  onChange,
}: FormAddressProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedValue = useDebounce(searchTerm, 500);

  const [result, refetch] = useSearchPostcodeQuery({
    pause: true, // Don't run on initial render, manually trigger it with refetch()
    variables: {
      postcode: debouncedValue,
    },
  });

  useEffect(() => {
    if (debouncedValue) {
      refetch();
    }
  }, [debouncedValue, refetch]);

  const addresses = useMemo(() => {
    return result.data?.searchPostcode?.map((address) => ({
      id: address?.id,
      line_1: address?.line_1,
      line_2: address?.line_2,
      town_or_city: address?.town_or_city,
      country: address?.country,
      postcode: address?.postcode,
      combined: Object?.keys(address ?? {})
        ?.filter((key) => !["id", "__typename"].includes(key))
        ?.map((key) => address[key as keyof typeof address])
        ?.join(", "),
    }));
  }, [result.data?.searchPostcode]);

  return (
    <Combobox
      as="div"
      onChange={(v) => onChange(v as Address)}
      className={cn("relative w-full cursor-text", className)}
    >
      {({ open }) => (
        <>
          <Combobox.Input
            ref={inputRef}
            placeholder={placeHolder}
            className={cn([
              btnStyling({
                size: "md",
                isFocused: open || isFocused,
              }),
              "cursor-text flex items-center flex-wrap gap-1",
            ])}
            onFocus={() => {
              if (isFocused) return;
              setIsFocused(true);
            }}
            onBlur={() => {
              if (open) return;
              setIsFocused(false);
            }}
            onChange={(event) => setSearchTerm(event.target.value)}
            autoComplete="off"
          />

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
            <Combobox.Options className={cn([listStyling({ size })])} static>
              {addresses?.map((address) => (
                <Combobox.Option key={address.id} value={address} as={Fragment}>
                  {({ selected: isSelected }) => {
                    return (
                      <li
                        className={cn([
                          defaultOptionStyling({ size, isSelected }),
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
                        {address.combined}
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
