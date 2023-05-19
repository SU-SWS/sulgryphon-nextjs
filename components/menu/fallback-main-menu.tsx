import Link from "next/link";
import SearchModal from "@/components/search/search-modal";

const FallbackMainMenu = ({menuItems}) => {
  return (
    <nav className="su-centered">
      <ul className="su-m-0 su-p-0 su-list-unstyled lg:su-flex lg:su-justify-end">
        {menuItems.map(item =>
          <MenuItem key={item.id} {...item}/>
        )}

        <li className="su-hidden lg:su-flex su-items-center su-ml-20">
          <SearchModal/>
        </li>
      </ul>
    </nav>
  )
}

const MenuItem = ({url, title}) => {
  const linkUrl = url.length >= 1 ? url : '#';

  return (
    <li className="su-p-0 su-m-0 su-relative lg:su-flex lg:su-flex-wrap">
      <Link
        href={linkUrl}
        className="su-flex su-items-center su-text-white lg:su-text-black-true hover:su-text-white focus:su-text-white lg:focus:su-text-black-true hover:su-bg-black focus:su-bg-black lg:focus:su-bg-transparent lg:hover:su-text-black-true lg:hover:su-bg-transparent su-no-underline hover:su-underline lg:focus:su-underline su-w-full su-p-20"
      >
        <div className="su-pl-30 lg:su-pl-0">
          {title}
        </div>
      </Link>
    </li>
  )
}
export default FallbackMainMenu;