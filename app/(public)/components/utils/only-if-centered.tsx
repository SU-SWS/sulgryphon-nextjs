import useIsCentered from "@/lib/hooks/useIsCentered";
import {ReactElement} from "react";

const OnlyIfCentered = ({elem, children}): null | ReactElement => {
  const isCentered = useIsCentered(elem);
  if (!isCentered) return null;
  return <>{children}</>
}

export default OnlyIfCentered