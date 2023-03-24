import Link from "next/link";
import Lockup from "@/components/patterns/lockup";
import MainMenu from "@/components/menu/main-menu";
import IdentityBar from "@/components/layout/identity-bar";
import {getResource} from "@/lib/drupal/get-resource";
import GlobalMessage from "@/components/patterns/global-message";
import {DrupalMenuLinkContent} from "next-drupal";
import {getMenu} from "@/lib/drupal/get-menu";

const Header = async () => {
  let globalMessage;
  try {
    globalMessage = await getResource('config_pages--stanford_global_message', '');
  } catch (e) {
  }

  let tree: DrupalMenuLinkContent[] = [];
  try {
    ({tree} = await getMenu('main'));
  } catch (e) {
  }

  return (
    <>
      <IdentityBar/>

      {globalMessage?.[0]?.su_global_msg_enabled && <GlobalMessage configPage={globalMessage[0]}/>}

      <header className="su-shadow-lg su-relative su-sticky su-top-0 su-bg-white su-z-20">
        <div className="su-pt-20 su-bg-white su-cc lg:su-flex su-justify-between su-relative su-z-20 lg:su-z-10">
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