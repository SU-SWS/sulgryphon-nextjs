import Link from "next/link";
import Lockup from "../patterns/lockup";
import MainMenu from "../menu/main-menu";
import {getMenu} from "../../lib/drupal/get-menu";
import IdentityBar from "./identity-bar";

const Header = async () => {
  const {tree} = await getMenu('main');

  return (
    <>
      <IdentityBar/>
      <header className="su-shadow-lg su-relative">
        <div className="su-pt-20 su-bg-white su-cc lg:su-flex su-justify-between su-relative su-z-40">
          <Lockup className="su-pb-20"/>
          <div className="su-hidden lg:su-grid su-grid-cols-3 su-gap-[40px] xl:su-gap-[55px]">
            <HeaderLink href="https://mylibrary.stanford.edu/" text="Accessibility"/>
            <HeaderLink href="https://mylibrary.stanford.edu/" text="My Account"/>
            <HeaderLink href="https://mylibrary.stanford.edu/" text="Contact Us"/>
          </div>
        </div>
        <MainMenu menuItems={tree}/>
      </header>
    </>
  )
}

const HeaderLink = ({href, text}) => {
  return <Link className="su-text-black su-text-18 su-font-normal" href={href}>{text}</Link>
}

export default Header;