"use client";

import { ButtonLink } from "@/components/button-link";
import { H1 } from "@/components/typography/heading";

export function DashboardBackdrop() {
  return (
    <div className="max-w-[1129px] mx-auto px-8">
      <div className="flex items-center justify-between pt-8 pb-6">
        <H1>Afternoon</H1>
        <ButtonLink href="/new-listing">New Listing</ButtonLink>
      </div>
    </div>
  );
}
