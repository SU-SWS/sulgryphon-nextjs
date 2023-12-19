import {ReactNode} from "react";
import InternalHeaderBanner from "@/components/patterns/internal-header-banner";

const Layout = ({children}: { children: ReactNode }) => {
  return (
    <div>
      <InternalHeaderBanner>
        <h1
          className="w-full max-w-[calc(100vw-10rem)] md::max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)] mx-auto relative text-white mt-80 md:mt-100 mb-50 p-0">
          Search
        </h1>
      </InternalHeaderBanner>
      <div className="centered">{children}</div>
    </div>
  )
}

export default Layout;