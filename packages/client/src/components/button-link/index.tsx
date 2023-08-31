import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";
import { ButtonStyling, buttonStyles } from "../button";
import { twMerge } from "tailwind-merge";

interface ButtonLinkBaseProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
    ButtonStyling,
    LinkProps {
  disabled?: boolean;
}

type ButtonLinkProps = PropsWithChildren<ButtonLinkBaseProps>;

export function ButtonLink({
  children,
  className,
  size,
  intent,
  danger,
  disabled,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={twMerge(
        buttonStyles({ size, intent, danger, disabled }),
        className
      )}
    >
      {children}
    </Link>
  );
}
