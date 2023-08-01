import { twMerge } from "tailwind-merge";

const headingSize = {
  h1: "text-xl md:text-2xl font-semibold",
  h2: "text-lg font-semibold md:text-xl",
  h3: "text-sm font-medium md:text-base",
  h4: "md:text-sm text-x font-normal",
  h5: "text-xs font-normal",
};

type BaseHeadingProps = {
  as: React.ElementType;
  size: keyof typeof headingSize;
  className?: string;
  children: React.ReactNode;
};

function RootHeading({ as, size, className, children }: BaseHeadingProps) {
  const Heading = as;

  return (
    <Heading className={twMerge(headingSize[size], className)}>
      {children}
    </Heading>
  );
}

type HeadingProps = { className?: string; children: React.ReactNode };

export function H1({ className, children }: HeadingProps) {
  return (
    <RootHeading as="h1" size="h1" className={className}>
      {children}
    </RootHeading>
  );
}

export function H2({ className, children }: HeadingProps) {
  return (
    <RootHeading as="h2" size="h2" className={className}>
      {children}
    </RootHeading>
  );
}

export function H3({ className, children }: HeadingProps) {
  return (
    <RootHeading as="h3" size="h3" className={className}>
      {children}
    </RootHeading>
  );
}

export function H4({ className, children }: HeadingProps) {
  return (
    <RootHeading as="h4" size="h4" className={className}>
      {children}
    </RootHeading>
  );
}

export function H5({ className, children }: HeadingProps) {
  return (
    <RootHeading as="h5" size="h5" className={className}>
      {children}
    </RootHeading>
  );
}
