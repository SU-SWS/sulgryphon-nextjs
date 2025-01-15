import Link from "next/link"
import LockupLogo from "@/components/patterns/elements/lockup/lockup-logo"
import {LockupProps} from "@/components/patterns/elements/lockup/lockup"

const LockupM = ({line1, line2, siteName, logoUrl}: LockupProps) => {
  return (
    <div className="py-10">
      <Link href="/" className="text-black no-underline">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="mt-auto">
            <LockupLogo logoUrl={logoUrl} siteName={siteName} />
          </div>

          <div className="w-[1px] shrink-0 bg-black" />
          <div className="type-2 font-normal">
            <div>{line1 || siteName}</div>
            <div>{line2}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}
export default LockupM
