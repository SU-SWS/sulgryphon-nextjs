import useIsCentered from "@/lib/hooks/useIsCentered"
import {PropsWithChildren, RefObject} from "react"
import cn from "@/lib/utils/className"

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
      className={cn("absolute top-0 left-0 z-[-10] h-full", {
        "ml-[calc(-50vw+50%)] w-screen": isCentered,
        "w-full": !isCentered,
      })}
    >
      <div className="relative h-full w-full bg-black-true" {...props}>
        {children}
      </div>
    </div>
  )
}

export default FullScreenBackground
