import { PropsWithChildren } from "react";
import { PageBackdrop } from "./backdrop";
import { PageContent } from "./content";

export function Page({ children }: PropsWithChildren) {
  return children;
}

Page.Backdrop = PageBackdrop;
Page.Content = PageContent;
