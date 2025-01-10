import {DrupalLink as Link} from "@/components/patterns/link"
import LockupLogo from "@/components/patterns/elements/lockup/lockup-logo"
import {FooterLockupProps} from "@components/config-pages/local-footer"

const LockupO = ({line4, siteName, logoUrl}: FooterLockupProps) => {
  return (
    <div className="py-10">
      <Link href="/" className="text-black no-underline">
        <LockupLogo logoUrl={logoUrl} siteName={siteName} />
        <div className="type-2 mt-1 font-semibold uppercase">{line4}</div>
      </Link>
    </div>
  )
}
export default LockupO
