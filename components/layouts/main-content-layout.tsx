import {ReactNodeLike} from "prop-types";
import {HomeIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import {useRouter} from "next/router";

import {SideNav} from "@/components/menu/side-nav";
import Conditional from "@/components/simple/conditional";
import Image from "next/image";


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
            


            <Breadcrumbs className="su-cc su-text-white su-absolute su-top-10"/>
            <h1 className="su-cc su-pt-[110px] su-pb-50 lg:su-pb-20 su-relative su-text-white">{pageTitle}</h1>


            <div className="su-hidden lg:su-block su-absolute su-bottom-0 su-right-0 after:su-content-[''] after:su-absolute after:su-h-full after:su-w-full after:su-bottom-0 after:su-right-0 after:su-bg-gradient-to-br after:su-from-black-true after:su-to-transparent">
              <Image
                  className=""
                  src="/interior-sprinkles.png"
                  alt=""
                  width={936}
                  height={305}
              />
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

  const trail = ['/', '/resources'];
  const router = useRouter();

  return (
    <div {...props}>
      <div className="su-flex su-text-14">
        {trail.map((path, i) => <Crumb key={i} path={path} name="path title"
                                       className={i == trail.length - 1 ? "" : "after:su-content-['/'] after:su-inline-block after:su-mx-5"}/>)}
      </div>
    </div>
  )
}

const Crumb = ({path, name, ...props}) => {
  const icon = path == '/' ? <HomeIcon width={14}/> : null;
  const text = path == '/' ? <span className="su-sr-only">Home</span> : name;

  return (
    <div {...props}>
      <Link
        className="su-font-normal su-inline-block su-text-white hover:su-text-white su-no-underline hover:su-underline"
        href={path}>
        {icon}
        {text}
      </Link>
    </div>
  )
}