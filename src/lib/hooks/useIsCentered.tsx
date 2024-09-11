import {MutableRefObject, useLayoutEffect, useState} from "react"
import {useDebounceCallback, useEventListener} from "usehooks-ts"

const useIsCentered = (ref: MutableRefObject<any>) => {
  const [isCentered, setIsCentered] = useState<boolean>(false)

  const resizeHandler = () => {
    if (ref?.current) {
      const boundingBox = ref.current.getBoundingClientRect()
      setIsCentered(Math.abs((window.innerWidth - boundingBox.width) / 2 - boundingBox.x) <= 10)
    }
  }

  const debouncedHandler = useDebounceCallback(resizeHandler, 100)
  useEventListener("resize", debouncedHandler)
  useLayoutEffect(() => debouncedHandler(), [debouncedHandler])

  return isCentered
}

export default useIsCentered
