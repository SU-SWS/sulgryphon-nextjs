import Link from "next/link";
import Lockup from "@/components/patterns/lockup";
import MainMenu from "@/components/menu/main-menu";
import GlobalMessage from "@/components/layout/global-message";
import {DrupalMenuLinkContent} from "next-drupal";
import {getMenu} from "@/lib/drupal/get-menu";
import FallbackMainMenu from "@/components/menu/fallback-main-menu";
import {Suspense} from "react";

const Header = async () => {

  let tree: DrupalMenuLinkContent[] = [];
  try {
    ({tree} = await getMenu('main'));
  } catch (e) {
  }

  return (
    <>
      <div role="region" aria-label="Site Messages">
        <div className="su-relative su-z-40 lg:su-z-10 su-identity-bar su-pt-5 su-pb-1 su-bg-cardinal-red">

          <div className="su-cc">
            <a className=" su-logo su-text-white hocus:su-text-white su-text-20 su-leading-none"
               href="https://www.stanford.edu">
              Stanford University
            </a>
          </div>
        </div>

        {/* @ts-expect-error Async Server Component */}
        <GlobalMessage/>
      </div>

      <header className="su-sticky lg:su-relative su-top-0 su-shadow-lg su-bg-white su-z-20">
        <div
          className="su-pt-20 su-bg-white su-max-w-1500 su-w-full su-mx-auto su-px-40 3xl:su-px-0 lg:su-flex su-justify-between su-relative su-z-20 lg:su-z-10">
          <Lockup className="su-pb-20"/>

          <div className="su-hidden lg:su-grid su-grid-cols-3 su-gap-[40px] xl:su-gap-[55px]">
            <HeaderLink href="https://mylibrary.stanford.edu/" text="Accessibility"/>
            <HeaderLink href="https://mylibrary.stanford.edu/" text="My Account"/>
            <HeaderLink href="https://mylibrary.stanford.edu/" text="Contact Us"/>
          </div>
        </div>
        <Suspense fallback={<FallbackMainMenu menuItems={tree}/>}>
          <MainMenu menuItems={tree}/>
        </Suspense>
      </header>
    </>
  )
}

const HeaderLink = ({href, text}) => {
  return <Link className="su-text-black su-text-18 su-font-normal" href={href}>{text}</Link>
}

export default Header;