import {DrupalLink as Link} from "@/components/patterns/link"
import LockupLogo from "@/components/patterns/elements/lockup/lockup-logo"
import {FooterLockupProps} from "@components/config-pages/local-footer"

const LockupD = ({line1, line3, siteName, logoUrl}: FooterLockupProps) => {
  return (
    <div className="py-10">
      <Link href="/" className="text-black no-underline">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="mt-auto">
            <LockupLogo logoUrl={logoUrl} siteName={siteName} />
          </div>

          <div className="w-[1px] shrink-0 bg-black" />
          <div className="font-normal">
            <div className="type-2">{line1 || siteName}</div>
            <div className="type-0 italic">{line3}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}
export default LockupD
