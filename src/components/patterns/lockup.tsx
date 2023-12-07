import Link from "@/components/patterns/elements/drupal-link";
import {ComponentProps} from "react";

import Logo from "@/components/patterns/logo";
import StanfordWordMark from "@/components/patterns/icons/stanford-wordmark";

interface LockupProps extends ComponentProps<any> {
  whiteText?: boolean
}

const Lockup = ({whiteText, ...props}: LockupProps) => {
  return (
    <div {...props}>
      <Link href="/" className="no-underline">
        <div className="flex items-center basefont-19">
          <Logo/>

          <div className="flex flex-col lg:flex-row items-baseline ml-10">
            <div className="lg:border-r-3 border-black pr-10 mr-10 mb-5">
              <span className="sr-only">Stanford</span>
              <StanfordWordMark className={whiteText ? " text-white" : "text-cardinal-red-dark"} height={35} aria-hidden/>
            </div>

            <div className={"text-m2 semibold lg:font-regular text-black uppercase" + (whiteText ? " text-white" : "")}>
              {process.env.NEXT_PUBLIC_SITE_NAME}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
export default Lockup;