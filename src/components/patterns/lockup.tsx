import Link from "@/components/patterns/elements/drupal-link"
import {HTMLAttributes} from "react"

import Logo from "@/components/patterns/logo"
import StanfordWordMark from "@/components/patterns/icons/stanford-wordmark"

type LockupProps = HTMLAttributes<HTMLDivElement> & {
  whiteText?: boolean
}

const Lockup = ({whiteText, ...props}: LockupProps) => {
  return (
    <div {...props}>
      <Link href="/" className="no-underline">
        <div className="flex items-center basefont-19">
          <Logo />

          <div className="ml-10 flex flex-col items-baseline lg:flex-row">
            <div className="mr-10 mb-5 border-black pr-10 lg:border-r-3">
              <span className="sr-only">Stanford&nbsp;</span>
              <StanfordWordMark
                className={whiteText ? "text-white" : "text-cardinal-red-dark"}
                height={35}
                aria-hidden
              />
            </div>

            <div className={"semibold type-2 text-black uppercase " + (whiteText ? " text-white" : "")}>
              {process.env.NEXT_PUBLIC_SITE_NAME}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
export default Lockup
