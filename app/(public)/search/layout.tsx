import {ReactNode} from "react";
import InternalHeaderBanner from "@/components/patterns/internal-header-banner";

const Layout = ({children}: { children: ReactNode }) => {
  return (
    <div>
      <InternalHeaderBanner>
        <h1 className="su-cc su-pt-[110px] su-pb-50 lg:su-pb-20 su-relative su-text-white">Search</h1>
      </InternalHeaderBanner>
      <div className="su-cc">{children}</div>
    </div>
  )
}

export default Layout;