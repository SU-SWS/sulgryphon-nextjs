import Link from "next/link"
import LockupLogo from "@/components/patterns/elements/lockup/lockup-logo"
import {LockupProps} from "@/components/patterns/elements/lockup/lockup"

const LockupI = ({line1, line3, line4, siteName, logoUrl}: LockupProps) => {
  return (
    <div className="py-10">
      <Link href="/" className="text-black no-underline">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div>
            <LockupLogo logoUrl={logoUrl} siteName={siteName} />
            <div className="type-2 mt-1 font-semibold uppercase">{line4}</div>
          </div>

          <div className="w-[1px] shrink-0 bg-black" />
          <div className="mt-auto font-normal">
            <div className="type-2">{line1 || siteName}</div>
            <div className="type-0 italic">{line3}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}
export default LockupI
