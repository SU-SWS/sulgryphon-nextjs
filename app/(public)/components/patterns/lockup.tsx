import Link from "next/link";
import {ComponentProps} from "react";

import Logo from "@/components/patterns/logo";
import StanfordWordMark from "@/components/patterns/icons/stanford-wordmark";

interface LockupProps extends ComponentProps<any> {
  whiteText?: boolean
}

const Lockup = ({whiteText, ...props}: LockupProps) => {
  return (
    <div {...props}>
      <Link href="/" className="su-no-underline">
        <div className="su-flex su-items-center su-basefont-19">
          <Logo/>

          <div className="su-flex su-flex-col lg:su-flex-row su-items-baseline su-ml-10">
            <div className="lg:su-border-r-3 su-border-black su-pr-10 su-mr-10 su-mb-5">
              <span className="su-sr-only">Stanford</span>
              <StanfordWordMark className="su-text-cardinal-red-dark" height={35} aria-hidden/>
            </div>

            <div className={"su-text-m2 su-semibold lg:su-font-regular su-text-black su-uppercase" + (whiteText ? " su-text-white" : "")}>
              {process.env.NEXT_PUBLIC_SITE_NAME}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
export default Lockup;