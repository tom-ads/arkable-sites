import { Button } from "@/components/button";
import { NarrowArrowIcon } from "@/components/icons";

export default function NewListingFooter() {
  return (
    <div className="fixed inset-x-0 bottom-0 border-t bg-grey-50 border-grey-200">
      <div className="max-w-[1440px] mx-auto px-8 flex items-center justify-between py-6 gap-4 sm:gap-9">
        <Button intent="outlined" className="justify-between">
          <NarrowArrowIcon className="w-4 rotate-180 shrink-0" />
          <span>Back</span>
        </Button>

        <Button type="submit" className="justify-between">
          <span>Continue</span>
          <NarrowArrowIcon className="w-4 shrink-0" />
        </Button>
      </div>
    </div>
  );
}
