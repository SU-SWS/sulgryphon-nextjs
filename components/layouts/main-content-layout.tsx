import {ReactNodeLike} from "prop-types";

import {SideNav} from "@/components/menu/side-nav";

interface MainLayoutProps {
  fullWidth?: boolean;
  className?: string;
  children: ReactNodeLike;
}

export const MainContentLayout = ({fullWidth, children}: MainLayoutProps) => {
  return (
    <main className={`lg:su-flex su-justify-between su-gap-2xl ${fullWidth ? '' : 'su-cc'}`}>
      <SideNav className="su-hidden lg:su-block su-w-4/12"/>
      <section id="main-content" className="su-flex-1">
        {children}
      </section>
    </main>
  )
}
