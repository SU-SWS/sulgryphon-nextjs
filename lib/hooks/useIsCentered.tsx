import {MutableRefObject, useCallback, useLayoutEffect, useState} from "react";
import {useDebounce} from "usehooks-ts";

const useIsCentered = (ref: MutableRefObject<any>) => {
  const [isCentered, setIsCentered] = useState<boolean>(false)
  const debouncedIsCentered = useDebounce<boolean>(isCentered);

  const resizeHandler = useCallback(() => {
    if (ref?.current) {
      const boundingBox = ref.current.getBoundingClientRect();
      setIsCentered(Math.abs((window.innerWidth - boundingBox.width) / 2 - boundingBox.x) <= 10);
    }
  }, [ref]);

  useLayoutEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [ref, resizeHandler])

  return debouncedIsCentered;
}

export default useIsCentered;