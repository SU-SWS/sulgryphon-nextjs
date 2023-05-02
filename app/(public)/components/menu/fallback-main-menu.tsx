import Link from "next/link";
import Conditional from "@/components/utils/conditional";

const FallbackMainMenu = ({menuItems}) => {
  return (
    <nav className="su-cc">
      <ul className="su-m-0 su-p-0 su-list-unstyled lg:su-flex lg:su-justify-end">
        {menuItems.map(item =>
          <MenuItem key={item.id} {...item}/>
        )}
      </ul>
    </nav>
  )
}

const MenuItem = ({url, title}) => {

  return (
    <li className="su-p-0 su-m-0 su-relative lg:su-flex lg:su-flex-wrap">
      <Conditional showWhen={url.length > 1}>
        <Link
          href={url.length >= 1 ? url : '#'}
          className="su-flex su-items-center su-text-white lg:su-text-black-true hover:su-text-white focus:su-text-white lg:focus:su-text-black-true hover:su-bg-black focus:su-bg-black lg:focus:su-bg-transparent lg:hover:su-text-black-true lg:hover:su-bg-transparent su-no-underline hover:su-underline lg:focus:su-underline su-w-full su-p-20"
        >
          <div className="su-pl-30 lg:su-pl-0">
            {title}
          </div>
        </Link>
      </Conditional>
    </li>
  )
}
export default FallbackMainMenu;