import Link from "next/link";
import Logo from "@/components/simple/logo";

export const Lockup = ({...props}) => {
  return (
    <div {...props}>
      <Link href="/" className="su-no-underline">
        <div className="su-flex md:su-flex-row su-basefont-19">
          <Logo/>
          <div className="lg:su-flex">
            <div
              className="lg:su-h-[45px] su-logo su-text-cardinal-red su-type-4 su-leading-[initial] su-pr-5 su-mr-5 lg:su-border-r su-border-solid su-border-black">
              Stanford
            </div>
            <div className="su-text-20 lg:su-text-m2 su-font-regular su-text-black su-flex su-items-end">
              {process.env.NEXT_PUBLIC_SITE_NAME}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}