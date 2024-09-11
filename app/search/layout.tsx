import {ReactNode} from "react"
import InternalHeaderBanner from "@/components/patterns/internal-header-banner"

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <div>
      <InternalHeaderBanner>
        <h1 className="md::max-w-[calc(100vw-20rem)] relative mx-auto mb-50 mt-80 w-full max-w-[calc(100vw-10rem)] p-0 text-white md:mt-100 3xl:max-w-[calc(1500px-20rem)]">
          Search
        </h1>
      </InternalHeaderBanner>
      <div className="centered">{children}</div>
    </div>
  )
}

export default Layout
