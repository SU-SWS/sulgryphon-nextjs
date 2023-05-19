import {ReactNode} from "react";
import InternalHeaderBanner from "@/components/patterns/internal-header-banner";

const Layout = ({children}: { children: ReactNode }) => {
  return (
    <div>
      <InternalHeaderBanner>
        <h1
          className="su-w-full su-max-w-[calc(100vw-10rem)] md::su-max-w-[calc(100vw-20rem)] 3xl:su-max-w-[calc(1500px-20rem)] su-mx-auto su-relative su-text-white su-mt-80 md:mt-100 su-mb-50 su-p-0">
          Search
        </h1>
      </InternalHeaderBanner>
      <div className="su-centered">{children}</div>
    </div>
  )
}

export default Layout;