"use client";

import {ReactNode, useCallback, useEffect} from 'react';
import {XMarkIcon} from "@heroicons/react/20/solid";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import ReactFocusLock from "react-focus-lock";
import {useEventListener, useScrollLock} from "usehooks-ts";

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
    lockTarget: 'body',
  })
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEventListener("keydown", onKeyDown);

  useEffect(() => {
    isOpen ? lock(): unlock()
    // Disabling eslint because adding lock and unlock as dependencies prevents the unlock from firing when it needs to.
    // eslint-disable-next-line
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <dialog aria-modal="true" className="w-full h-full" open ref={animationParent} aria-labelledby={labelledBy}>
      <ReactFocusLock returnFocus>
        <div
          className={"modal fixed w-screen h-full overscroll-contain overflow-y-scroll overflow-x-hidden top-0 left-0 items-center justify-center z-[10000] bg-black-true bg-opacity-[90%] flex"}
        >
          <div className={"absolute w-screen h-full basefont-19 pointer-events-auto"}>
            <div>
              <button
                type="button"
                onClick={onClose}
                className={"absolute right-50 top-50 text-white flex hocus:underline"}
              >
                Close<span className="sr-only"> Overlay</span>
                <XMarkIcon className="ml-10 mt-[-3px]" width={25}/>
                </button>
              </div>
            <div
              className="h-5/6 w-11/12 md:h-4/5 md:w-8/12 mx-auto mt-[5%]"
            >
              {children}
            </div>
          </div>
        </div>
      </ReactFocusLock>
    </dialog>
  );
};

export default Modal;

