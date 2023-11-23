import { H1 } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { redirect } from "next/navigation";
import { useMemo } from "react";
import { AddressStep } from "./address";

const steps = {
  location: {
    title: "Where is your listing located?",
    description:
      "Only guests that have reservations will receive the exact location of your listing.",
    view: () => <AddressStep />,
  },
};

export default function Page({ params }: { params: { step: string } }) {
  const currentStep = steps?.[params.step as keyof typeof steps];

  const activeView = useMemo(() => currentStep?.view(), [currentStep]);

  if (!currentStep) {
    return redirect("/dashboard");
  }

  return (
    <div>
      <div className="pb-8 space-y-2">
        <H1>{currentStep?.title}</H1>
        <Text className="font-normal">{currentStep?.description}</Text>
      </div>

      {activeView}
    </div>
  );
}
