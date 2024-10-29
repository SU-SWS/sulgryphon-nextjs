"use client"

import {HTMLAttributes, useCallback, useRef} from "react"
import {useRouter} from "next/navigation"
import ReactFocusLock from "react-focus-lock"
import {XMarkIcon} from "@heroicons/react/20/solid"
import {useEventListener, useScrollLock} from "usehooks-ts"

const InterceptionModal = ({children, ...props}: HTMLAttributes<HTMLDialogElement>) => {
  const overlay = useRef<HTMLDialogElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const router = useRouter()
  useScrollLock()

  const onDismiss = useCallback(() => router.back(), [router])

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current || e.target === wrapper.current) onDismiss()
    },
    [onDismiss, overlay, wrapper]
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss()
    },
    [onDismiss]
  )

  useEventListener("keydown", onKeyDown)

  return (
    <dialog
      ref={overlay}
      className="modal fixed left-0 top-0 z-[10000] flex h-full w-screen items-center justify-center overflow-x-hidden overflow-y-scroll overscroll-contain bg-black-true bg-opacity-[90%]"
      aria-modal="true"
      onClick={onClick}
      open
      {...props}
    >
      <ReactFocusLock returnFocus>
        <button type="button" onClick={onDismiss} className="fixed right-50 top-50 flex text-white hocus:underline">
          Close<span className="sr-only"> Overlay</span>
          <XMarkIcon className="ml-5" width={25} />
        </button>
        <div
          ref={wrapper}
          className="absolute left-1/2 top-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 p-6 sm:w-10/12 md:w-8/12 lg:w-1/2"
        >
          {children}
        </div>
      </ReactFocusLock>
    </dialog>
  )
}

export default InterceptionModal
