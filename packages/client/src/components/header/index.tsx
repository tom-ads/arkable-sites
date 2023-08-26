import Link from "next/link";
import Text from "../typography/text";
import { ArkoraIcon } from "../icons/arkora";

export function Header() {
  return (
    <header className="border-b border-grey-200">
      <div className="px-8 mx-auto max-w-[1440px]">
        <div className="flex items-center justify-between py-5 gap-x-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-x-2">
              <ArkoraIcon className="w-9" />
              <Text>Arkora</Text>
            </div>
          </Link>

          {/* Navigation */}
          <div></div>
        </div>
      </div>
    </header>
  );
}
