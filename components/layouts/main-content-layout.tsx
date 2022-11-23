import {ReactNodeLike} from "prop-types";
import {HomeIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

import {SideNav} from "@/components/menu/side-nav";
import Conditional from "@/components/simple/conditional";

interface MainLayoutProps {
  pageTitle: string | ReactNodeLike
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

      {!header &&
          <div className="su-bg-black-true su-mb-50 su-relative su-overflow-hidden">

            <div className="su-relative su-z-10">
              <Breadcrumbs className="su-cc su-text-white su-pt-20"/>
              <h1 className="su-cc su-pt-[110px] su-pb-50 lg:su-pb-20 su-relative su-text-white">{pageTitle}</h1>
            </div>

            <div className="su-bg-interior-header-sprinkles su-absolute su-h-2/3 su-w-1/2 su-bottom-0 su-right-0">
              <div className="su-bg-gradient-to-b su-from-black-true su-to-transparent su-absolute su-w-full su-h-full">
                <div
                    className="su-bg-gradient-to-r su-from-black-true su-to-transparent su-absolute su-w-full su-h-full">

                </div>
              </div>
            </div>

            <div className="su-relative su-z-10">
              <svg viewBox="0 0 1500 70">
                <path d="M0,71 Q500,65 800,20 Q1200,-30 1500,71" stroke="#fff" className="su-fill-white"></path>
              </svg>
            </div>
          </div>
      }

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
  const [trail, setTrail] = useState([])
  const router = useRouter();

  useEffect(() => {
    fetch('/api/breadcrumbs?path=' + router.asPath)
      .then(resp => resp.json())
      .then(data => setTrail(data))
      .catch(() => setTrail([]));
  }, [router])

  return (
    <Conditional showWhen={trail.length > 0}>
      <nav aria-label="breadcrumbs" {...props}>
        <ol className="su-flex su-text-14 su-list-unstyled">
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
  const icon = href == '/' ? <HomeIcon width={14}/> : null;
  const linkText = href == '/' ? <span className="su-sr-only">Home</span> : text;

  return (
    <li {...props}>
      <Link
        aria-current={currentPage}
        className="su-font-normal su-inline-block su-text-white hover:su-text-white su-no-underline hover:su-underline"
        href={href}>
        {icon}
        {linkText}
      </Link>
    </li>
  )
}