import useIsCentered from "@/lib/hooks/useIsCentered"
import {PropsWithChildren, RefObject} from "react"

const FullScreenBackground = ({
  children,
  compareRef,
  ...props
}: PropsWithChildren<{
  compareRef: RefObject<HTMLElement | null>
  className?: string
}>) => {
  const isCentered = useIsCentered(compareRef)
  return (
    <div
      className={(isCentered ? "ml-[calc(-50vw+50%)] w-screen " : "w-full ") + "absolute left-0 top-0 z-[-10] h-full"}
    >
      <div className="relative h-full w-full bg-black-true" {...props}>
        {children}
      </div>
    </div>
  )
}

export default FullScreenBackground
