import useIsCentered from "@/lib/hooks/useIsCentered";

const OnlyIfCentered = ({elem, children}): null | JSX.Element => {
  const isCentered = useIsCentered(elem);
  if (!isCentered) return null;
  return <>{children}</>
}

export default OnlyIfCentered