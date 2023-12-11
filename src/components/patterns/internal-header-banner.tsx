import Wave from "@/components/patterns/wave";
import {PropsWithChildren, ReactNode} from "react";

const InternalHeaderBanner = ({children}: PropsWithChildren) => {
  return (
    <header className="bg-black-true mb-50 relative overflow-hidden">
      <div className="relative z-[1]">
        {children}
      </div>

      <div className="bg-right-bottom lg:bg-interior-header-sprinkles absolute h-2/3 w-1/2 bottom-0 right-0">
        <div className="bg-gradient-to-b from-black-true to-transparent absolute w-full h-full">
          <div className="bg-gradient-to-r from-black-true to-transparent absolute w-full h-full">
            {/*Empty elements. They are absolute positioned to provide visual affects only.*/}
          </div>
        </div>
      </div>

      <div className="relative">
        <Wave/>
      </div>
    </header>
  )
}

export default InternalHeaderBanner;