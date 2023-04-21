import {MutableRefObject, useLayoutEffect, useState} from "react";
import {useDebouncedCallback} from "use-debounce";

const useIsCentered = (ref: MutableRefObject<any>) => {
  const [isCentered, setIsCentered] = useState(false)

  const resizeHandler = useDebouncedCallback(() => {
    if (ref?.current) {
      const boundingBox = ref.current.getBoundingClientRect();
      setIsCentered(Math.abs((window.innerWidth - boundingBox.width) / 2 - boundingBox.x) <= 10);
    }
  }, 200)


  useLayoutEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [ref])

  return isCentered;
}

export default useIsCentered;