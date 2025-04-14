import Wave from "@/components/patterns/wave"
import {PropsWithChildren} from "react"

const InternalHeaderBanner = ({children}: PropsWithChildren) => {
  return (
    <header className="relative mb-50 overflow-auto bg-black-true">
      <div className="relative z-[1]">{children}</div>

      <div className="absolute bottom-0 right-0 h-2/3 w-1/2 bg-right-bottom lg:bg-interior-header-sprinkles">
        <div className="absolute h-full w-full bg-gradient-to-b from-black-true to-transparent">
          <div className="absolute h-full w-full bg-gradient-to-r from-black-true to-transparent">
            {/*Empty elements. They are absolute positioned to provide visual affects only.*/}
          </div>
        </div>
      </div>

      <div className="relative">
        <Wave />
      </div>
    </header>
  )
}

export default InternalHeaderBanner
