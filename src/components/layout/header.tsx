import Link from "@/components/patterns/elements/drupal-link"
import Lockup from "@/components/patterns/elements/lockup/lockup"
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
        <div className="lg:centered">
          <div className="relative z-20 mx-auto w-full max-w-1500 justify-between bg-white px-40 pt-20 lg:z-10 lg:flex lg:gap-24 lg:px-0">
            <div className="pb-20">
              <Lockup />
            </div>
            <nav className="hidden lg:block" aria-label="User links">
              <ul className="list-unstyled flex items-baseline gap-24">
                <li className="flex shrink-0 items-start">
                  <Link className="text-16 font-normal text-black" href="https://searchworks.stanford.edu/">
                    SearchWorks Catalog
                  </Link>
                  <Link
                    className="ml-10 border-l border-black pl-10 text-16 font-normal text-black"
                    href="https://searchworks.stanford.edu/articles"
                  >
                    Articles+
                  </Link>
                </li>
                <HeaderLink href="/contact-us" text="Contact Us" />
                <HeaderLink href="https://mylibrary.stanford.edu/" text="My Account" />
                <li>
                  <Link
                    href="https://give.stanford.edu/?kwoDCPreselect=KDC-29V9KK0&olc=10734"
                    className="cta-button group rs-mt-neg1 mt-0 block w-fit whitespace-nowrap rounded-full bg-digital-red px-16 py-6 text-16 font-normal leading text-white no-underline transition-colors hover:bg-cardinal-red-dark focus:bg-black-true active:bg-black-true hocus:text-white hocus:underline"
                  >
                    Donate now
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
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
      <Link className="text-nowrap text-16 font-normal text-black" href={href}>
        {text}
      </Link>
    </li>
  )
}

export default Header
