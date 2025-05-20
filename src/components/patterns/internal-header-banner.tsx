import Wave from "@/components/patterns/wave"
import {PropsWithChildren} from "react"

const InternalHeaderBanner = ({children}: PropsWithChildren) => {
  return (
    <header className="relative mb-60 overflow-auto border-t border-black-50 bg-fog-light">
      <div className="relative z-[1]">{children}</div>
      <div className="relative">
        <Wave />
      </div>
    </header>
  )
}

export default InternalHeaderBanner
