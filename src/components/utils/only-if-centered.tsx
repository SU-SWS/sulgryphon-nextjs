import useIsCentered from "@/lib/hooks/useIsCentered"
import {MutableRefObject, PropsWithChildren} from "react"

const OnlyIfCentered = ({elem, children}: PropsWithChildren<{elem: MutableRefObject<any>}>) => {
  const isCentered = useIsCentered(elem)
  if (!isCentered) return null
  return <>{children}</>
}

export default OnlyIfCentered
