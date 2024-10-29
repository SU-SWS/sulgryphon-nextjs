"use client"

import {HTMLAttributes, useCallback, useRef} from "react"
import {useRouter} from "next/navigation"
import ReactFocusLock from "react-focus-lock"
import {XMarkIcon} from "@heroicons/react/20/solid"
import {useScrollLock} from "usehooks-ts"
import useOutsideClick from "@/lib/hooks/useOutsideClick"

const InterceptionModal = ({children, ...props}: HTMLAttributes<HTMLDialogElement>) => {
  const wrapper = useRef(null)
  const router = useRouter()

  useScrollLock()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  useOutsideClick(wrapper, onDismiss)

  return (
    <dialog
      className="modal fixed left-0 top-0 z-[10000] flex h-full w-screen items-center justify-center overflow-x-hidden overflow-y-scroll overscroll-contain bg-black-true bg-opacity-[90%]"
      aria-modal="true"
      open
      {...props}
    >
      <ReactFocusLock returnFocus>
        <div ref={wrapper}>
          <button type="button" onClick={onDismiss} className="fixed right-50 top-50 flex text-white hocus:underline">
            Close<span className="sr-only"> Overlay</span>
            <XMarkIcon className="ml-5" width={25} />
          </button>
          <div className="absolute left-1/2 top-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 p-6 sm:w-10/12 md:w-8/12 lg:w-1/2">
            {children}
          </div>
        </div>
      </ReactFocusLock>
    </dialog>
  )
}

export default InterceptionModal
