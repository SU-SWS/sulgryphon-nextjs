import Link from "@/components/patterns/elements/drupal-link"
import Lockup from "@/components/patterns/lockup"
import MainMenu from "@/components/menu/main-menu"
import GlobalMessage from "@/components/layout/global-message"
import FallbackMainMenu from "@/components/menu/fallback-main-menu"
import {Suspense} from "react"
import {getMenu} from "@/lib/gql/fetcher"

const Header = async () => {
  const menuItems = await getMenu()

  return (
    <>
      <div role="region" aria-label="Site Messages">
        <div className="identity-bar relative z-40 bg-cardinal-red pb-1 pt-5 lg:z-10">
          <div className="centered">
            <a className="logo text-20 leading-none text-white hocus:text-white" href="https://www.stanford.edu">
              Stanford University
            </a>
          </div>
        </div>

        <GlobalMessage />
      </div>

      <header className="relative top-0 z-20 bg-white shadow-lg">
        <div className="relative z-20 mx-auto w-full max-w-1500 justify-between bg-white px-30 pt-20 md:px-40 lg:z-10 lg:flex 3xl:px-0">
          <Lockup className="pb-20" />

          <nav className="hidden lg:block" aria-label="User links">
            <ul className="list-unstyled flex gap-[40px] xl:gap-[55px]">
              <HeaderLink href="/library-accessibility" text="Library Accessibility" />
              <HeaderLink href="https://mylibrary.stanford.edu/" text="My Account" />
              <HeaderLink href="/contact-us" text="Contact Us" />
            </ul>
          </nav>
        </div>
        <Suspense fallback={<FallbackMainMenu menuItems={menuItems} />}>
          <MainMenu menuItems={menuItems} />
        </Suspense>
      </header>
    </>
  )
}

const HeaderLink = ({href, text}: {href: string; text: string}) => {
  return (
    <li>
      <Link className="text-18 font-normal text-black" href={href}>
        {text}
      </Link>
    </li>
  )
}

export default Header
