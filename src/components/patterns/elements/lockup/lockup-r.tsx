import Link from "next/link"
import LockupLogo from "@/components/patterns/elements/lockup/lockup-logo"
import {LockupProps} from "@/components/patterns/elements/lockup/lockup"

const LockupR = ({line5, siteName, logoUrl}: LockupProps) => {
  return (
    <div className="py-10">
      <Link href="/" className="text-black no-underline">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div>
            <LockupLogo logoUrl={logoUrl} siteName={siteName} />
            <div className="mt-4 font-normal uppercase">{line5}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}
export default LockupR
