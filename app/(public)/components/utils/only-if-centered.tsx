import useIsCentered from "@/lib/hooks/useIsCentered";
import {ReactNode} from "react";

const OnlyIfCentered = ({elem, children}): null | ReactNode => {
  const isCentered = useIsCentered(elem);
  if (!isCentered) return null;
  return <>{children}</>
}

export default OnlyIfCentered