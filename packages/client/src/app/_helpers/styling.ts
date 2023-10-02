import classNames from "classnames";
import { ClassNameValue } from "tailwind-merge";
import { twMergeExtended } from "../layout";

export function cn(...args: ClassNameValue[]) {
  return twMergeExtended(classNames(args));
}
