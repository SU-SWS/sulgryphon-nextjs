import Link from "next/link";
import {ComponentProps} from "react";

import Logo from "@/components/patterns/logo";

interface LockupProps extends ComponentProps<any> {
  whiteText?: boolean
}

const Lockup = ({whiteText, ...props}: LockupProps) => {
  return (
    <div {...props}>
      <Link href="/" className="su-no-underline">
        <div className="su-flex md:su-flex-row su-basefont-19">
          <Logo/>

          <div className="su-flex su-flex-wrap lg:su-items-center su-ml-10">
            <div
              className={"lg:su-flex su-items-baseline su-leading-none su-w-full lg:su-w-auto su-mt-15 lg:su-mt-0 su-logo su-type-4 su-mr-5 su-pr-5 lg:su-border-r su-border-solid" + (whiteText ? " su-border-white su-text-white hocus:su-text-white" : " su-text-cardinal-red su-border-black")}>
              Stanford
            </div>
            <div
              className={"su-w-full lg:su-w-auto su-text-20 lg:su-text-m2 su-font-regular su-text-black su-uppercase" + (whiteText ? " su-text-white" : "")}>
              {process.env.NEXT_PUBLIC_SITE_NAME}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
export default Lockup;