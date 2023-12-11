import Link from "@/components/patterns/elements/drupal-link";
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
        <div className="relative z-40 lg:z-10 identity-bar pt-5 pb-1 bg-cardinal-red">

          <div className="centered">
            <a className=" logo text-white hocus:text-white text-20 leading-none"
               href="https://www.stanford.edu">
              Stanford University
            </a>
          </div>
        </div>

        <GlobalMessage/>
      </div>

      <header className="relative top-0 shadow-lg bg-white z-20">
        <div
          className="pt-20 bg-white max-w-1500 w-full mx-auto px-30 md:px-40 3xl:px-0 lg:flex justify-between relative z-20 lg:z-10">
          <Lockup className="pb-20"/>

          <nav className="hidden lg:block" aria-label="User links">
            <ul className="list-unstyled flex gap-[40px] xl:gap-[55px]">
              <HeaderLink href="/library-accessibility" text="Library Accessibility"/>
              <HeaderLink href="https://mylibrary.stanford.edu/" text="My Account"/>
              <HeaderLink href="/contact-us" text="Contact Us"/>
            </ul>
          </nav>
        </div>
        <Suspense fallback={<FallbackMainMenu menuItems={tree}/>}>
          <MainMenu menuItems={tree}/>
        </Suspense>
      </header>
    </>
  )
}

const HeaderLink = ({href, text}:{href: string, text: string}) => {
  return <li><Link className="text-black text-18 font-normal" href={href}>{text}</Link></li>
}

export default Header;