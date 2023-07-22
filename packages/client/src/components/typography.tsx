import { twMerge } from "tailwind-merge";

type BaseHeadingProps = {
  as: React.ElementType;
  children: React.ReactNode;
};

const size = {
  h1: "text-xl md:text-2xl font-semibold",
  h2: "text-lg font-semibold md:text-xl",
  h3: "text-sm font-medium md:text-base",
  h4: "md:text-sm text-x font-normal",
  h5: "text-xs font-normal",
};

function RootHeading({ as, children }: BaseHeadingProps) {
  const Heading = as;

  return <Heading className={twMerge("")}>{children}</Heading>;
}

type HeadingProps = {};

export function H1() {
  return <div className="text-xs"></div>;
}
