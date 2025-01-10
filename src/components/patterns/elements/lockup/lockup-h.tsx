import {DrupalLink as Link} from "@/components/patterns/link"
import LockupLogo from "@/components/patterns/elements/lockup/lockup-logo"
import {FooterLockupProps} from "@components/config-pages/local-footer"

const LockupH = ({line1, line3, line4, siteName, logoUrl}: FooterLockupProps) => {
  return (
    <div className="py-10">
      <Link href="/" className="text-black no-underline">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div>
            <LockupLogo logoUrl={logoUrl} siteName={siteName} />
            <div className="type-2 mt-1 font-semibold uppercase">{line4}</div>
          </div>

          <div className="w-[1px] shrink-0 bg-black" />
          <div className="type-2 font-normal">
            <div>{line1 || siteName}</div>
            <div>{line3}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}
export default LockupH
