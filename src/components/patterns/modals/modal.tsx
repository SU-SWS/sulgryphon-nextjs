"use client"

import {ReactNode, useCallback, useEffect} from "react"
import {XMarkIcon} from "@heroicons/react/20/solid"
import {useAutoAnimate} from "@formkit/auto-animate/react"
import ReactFocusLock from "react-focus-lock"
import {useEventListener, useScrollLock} from "usehooks-ts"

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  ariaLabel?: string
  labelledBy?: string
}

const Modal = ({children, isOpen, onClose, labelledBy}: ModalProps) => {
  const [animationParent] = useAutoAnimate()
  const {lock, unlock} = useScrollLock({
    autoLock: false,
    lockTarget: "body",
  })
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEventListener("keydown", onKeyDown)

  useEffect(() => {
    if (isOpen) {
      lock()
    } else {
      unlock()
    }
    // Disabling eslint because adding lock and unlock as dependencies prevents the unlock from firing when it needs to.
    // eslint-disable-next-line
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <dialog aria-modal="true" className="h-full w-full" open ref={animationParent} aria-labelledby={labelledBy}>
      <ReactFocusLock returnFocus>
        <div
          className={
            "modal fixed left-0 top-0 z-[10000] flex h-full w-screen items-center justify-center overflow-x-hidden overflow-y-scroll overscroll-contain bg-black-true bg-opacity-[90%]"
          }
        >
          <div className={"basefont-19 pointer-events-auto absolute h-full w-screen"}>
            <div>
              <button
                type="button"
                onClick={onClose}
                className={"absolute right-50 top-50 flex text-white hocus:underline"}
              >
                Close<span className="sr-only"> Overlay</span>
                <XMarkIcon className="ml-10 mt-[-3px]" width={25} />
              </button>
            </div>
            <div className="mx-auto mt-[5%] h-5/6 w-11/12 md:h-4/5 md:w-8/12">{children}</div>
          </div>
        </div>
      </ReactFocusLock>
    </dialog>
  )
}

export default Modal
