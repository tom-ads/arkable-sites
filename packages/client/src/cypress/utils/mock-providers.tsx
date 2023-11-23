import { MockNextRouter } from "./next-router";
import { MockUrql } from "./urql-provider";

export function MockProviders({ children }: { children: React.ReactNode }) {
  return (
    <MockNextRouter>
      <MockUrql>{children}</MockUrql>
    </MockNextRouter>
  );
}
