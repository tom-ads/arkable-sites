import {
  AppRouterContext,
  AppRouterInstance,
} from "next/dist/shared/lib/app-router-context";

// credits: https://github.com/cypress-io/cypress/discussions/22715
const createRouter = (params: Partial<AppRouterInstance>) => ({
  back: cy.spy().as("back"),
  forward: cy.spy().as("forward"),
  prefetch: cy.stub().as("prefetch").resolves(),
  push: cy.spy().as("push"),
  replace: cy.spy().as("replace"),
  refresh: cy.spy().as("refresh"),
  ...params,
});

interface MockNextRouterProps extends Partial<AppRouterInstance> {
  children: React.ReactNode;
}

export function MockNextRouter({ children, ...props }: MockNextRouterProps) {
  const router = createRouter(props as AppRouterInstance);

  return (
    <AppRouterContext.Provider value={router}>
      {children}
    </AppRouterContext.Provider>
  );
}
