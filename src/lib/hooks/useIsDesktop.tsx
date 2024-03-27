import {useEffect, useState} from "react";
import {useDebounceCallback, useEventListener} from "usehooks-ts";

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const handleResize = () => setIsDesktop(window.innerWidth >= 992);
  const debouncedHandleResize = useDebounceCallback(handleResize, 100)
  useEventListener("resize", debouncedHandleResize);
  useEffect(() => debouncedHandleResize(), [debouncedHandleResize])
  return isDesktop;
}