import {MutableRefObject, useEffect, useState} from "react";

const useIsCentered = (ref: MutableRefObject<any>) => {
  const [isCentered, setIsCentered] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      if (ref?.current) {
        const boundingBox = ref.current.getBoundingClientRect();
        setIsCentered(Math.abs((window.innerWidth - boundingBox.width) / 2 - boundingBox.x) <= 10);
      }
    }

    // Tiny timeout to allow it to render the ref.
    if (ref?.current) setTimeout(handleResize, 100)

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ref])
  return isCentered;
}

export default useIsCentered;