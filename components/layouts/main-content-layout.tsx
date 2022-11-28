import {ReactNodeLike} from "prop-types";
import Link from "next/link";
import {HomeIcon} from "@heroicons/react/20/solid";

import {useAppContext} from "../../context/state";
import {SideNav} from "@/components/menu/side-nav";
import Conditional from "@/components/simple/conditional";

interface MainLayoutProps {
  pageTitle?: string | ReactNodeLike
  fullWidth?: boolean;
  className?: string;
  header?: ReactNodeLike
  children: ReactNodeLike;
}

export const MainContentLayout = ({fullWidth, header, pageTitle, children}: MainLayoutProps) => {

  return (
    <main>
      <Conditional showWhen={header}>
        <header className="su-w-full">
          {header}
          <h1 className="su-cc">{pageTitle}</h1>
        </header>
      </Conditional>

      <Conditional showWhen={!header}>
        <div className="su-bg-black-true su-mb-50 su-relative su-overflow-hidden">

          <div className="su-relative su-z-10">
            <Breadcrumbs className="su-cc su-text-white su-pt-20"/>
            <Conditional showWhen={typeof pageTitle === 'string'}>
              <h1 className="su-cc su-pt-[110px] su-pb-50 lg:su-pb-20 su-relative su-text-white">{pageTitle}</h1>
            </Conditional>

            <Conditional showWhen={typeof pageTitle != 'string'}>
              {pageTitle}
            </Conditional>
          </div>

          <div
            className="su-bg-right-bottom lg:su-bg-interior-header-sprinkles su-absolute su-h-2/3 su-w-1/2 su-bottom-0 su-right-0">
            <div className="su-bg-gradient-to-b su-from-black-true su-to-transparent su-absolute su-w-full su-h-full">
              <div className="su-bg-gradient-to-r su-from-black-true su-to-transparent su-absolute su-w-full su-h-full">
              {/*Empty elements. They are absolute positioned to provide visual affects only.*/}
              </div>
            </div>
          </div>

          <div className="su-relative su-z-10">
            <svg viewBox="0 0 1500 70">
              <path d="M0,71 Q500,65 800,20 Q1200,-30 1500,71" stroke="#fff" className="su-fill-white"></path>
            </svg>
          </div>
        </div>
      </Conditional>

      <div className={`lg:su-flex su-justify-between su-gap-2xl ${fullWidth ? '' : 'su-cc'}`}>
        <SideNav className="su-hidden lg:su-block su-w-4/12"/>
        <section id="main-content" className="su-flex-1">
          {children}
        </section>
      </div>
    </main>
  )
}

const Breadcrumbs = (props) => {
  const context = useAppContext()
  const trail = context.breadcrumbs

  return (
    <Conditional showWhen={trail.length > 0}>
      <nav aria-label="breadcrumbs" {...props}>
        <ol className="su-flex su-flex-wrap su-items su-text-14 su-list-unstyled">
          {trail.map((item, i) =>
            <Crumb
              {...item}
              key={i}
              currentPage={i == trail.length - 1}
              className={i == trail.length - 1 ? "" : "after:su-content-['/'] after:su-inline-block after:su-mx-5"}
            />
          )}
        </ol>
      </nav>
    </Conditional>
  )
}

const Crumb = ({href, text, currentPage = false, ...props}) => {
  const icon = href == '/' ? <HomeIcon width={14} className="su-relative su-top-2"/> : null;
  const linkText = href == '/' ? <span className="su-sr-only">Home</span> : text;

  return (
    <li {...props}>
      <Link
        aria-current={currentPage}
        className="su-font-normal su-inline-block su-text-white hover:su-text-white focus:su-text-white su-no-underline hover:su-underline"
        href={href}>
        {icon}
        {linkText}
      </Link>
    </li>
  )
}