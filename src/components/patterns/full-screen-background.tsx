import useIsCentered from "@/lib/hooks/useIsCentered";
import {MutableRefObject, PropsWithChildren} from "react";

const FullScreenBackground = ({children, compareRef, ...props}:PropsWithChildren<{compareRef: MutableRefObject<any>, className?: string}>) => {
  const isCentered = useIsCentered(compareRef);
  return (
    <div className={(isCentered ? " w-screen ml-[calc(-50vw+50%)] " : "w-full ") + "absolute z-[-10]  h-full top-0 left-0"}>
      <div className="relative w-full h-full bg-black-true" {...props}>
        {children}
      </div>
    </div>
  )
}

export default FullScreenBackground