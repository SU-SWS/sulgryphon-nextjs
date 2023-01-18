import {ReactNodeLike} from "prop-types";
import Link from "next/link";
import dynamic from "next/dynamic";
import {HomeIcon} from "@heroicons/react/20/solid";

import {useAppContext} from "../../context/state";
import Conditional from "@/components/simple/conditional";
const SideNav = dynamic(() => import("../menu/side-nav").then((mod) => mod.SideNav));
const InternalHeaderBanner = dynamic(() => import("../../components/patterns/internal-header-banner"));

interface MainLayoutProps {
  pageTitle?: string | ReactNodeLike
  fullWidth?: boolean;
  className?: string;
  header?: ReactNodeLike
  children: ReactNodeLike;
}

export const MainContentLayout = ({fullWidth, header, pageTitle, children}: MainLayoutProps) => {

  return (
    <main className="su-mb-50">
      <Conditional showWhen={header}>
        <header className="su-w-full">
          {header}
          {pageTitle && <h1 className="su-cc">{pageTitle}</h1>}
        </header>
      </Conditional>

      <Conditional showWhen={!header}>
        <InternalHeaderBanner>
          <Breadcrumbs className="su-cc su-text-white su-pt-20"/>
          <Conditional showWhen={typeof pageTitle === 'string'}>
            <h1 className="su-cc su-pt-[110px] su-pb-50 lg:su-pb-20 su-relative su-text-white">{pageTitle}</h1>
          </Conditional>

          <Conditional showWhen={typeof pageTitle != 'string'}>
            {pageTitle}
          </Conditional>
        </InternalHeaderBanner>
      </Conditional>

      <div className={`lg:su-flex su-justify-between su-gap-2xl ${fullWidth ? '' : 'su-cc'}`}>
        <SideNav className="su-hidden lg:su-block su-w-4/12"/>
        <section id="main-content" className={"su-flex-1 " + (fullWidth ? 'su-mx-40 lg:su-mx-0' : '')}>
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