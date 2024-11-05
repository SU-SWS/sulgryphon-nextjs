import useIsCentered from "@/lib/hooks/useIsCentered"
import {PropsWithChildren, RefObject} from "react"

const OnlyIfCentered = ({elem, children}: PropsWithChildren<{elem: RefObject<HTMLElement | null>}>) => {
  const isCentered = useIsCentered(elem)
  if (!isCentered) return null
  return <>{children}</>
}

export default OnlyIfCentered
