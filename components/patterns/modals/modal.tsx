"use client";

import {ReactNode, useCallback, useEffect} from 'react';
import {XMarkIcon} from "@heroicons/react/20/solid";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import ReactFocusLock from "react-focus-lock";

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  ariaLabel: string
}

const Modal = ({children, isOpen, onClose, ariaLabel}: ModalProps) => {

  const [animationParent] = useAutoAnimate()

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  const lockScroll = () => {
    document.getElementsByTagName('body')[0].style.height = '100vh';
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  };

  const unlockScroll = () => {
    document.getElementsByTagName('body')[0].style.height = 'auto';
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
  };

  useEffect(() => {
    isOpen ? lockScroll() : unlockScroll();
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <dialog className="su-w-full su-h-full" open ref={animationParent}>
      <ReactFocusLock returnFocus>
        <div
          className={"su-modal su-fixed su-w-screen su-h-full su-overscroll-contain su-overflow-y-scroll su-overflow-x-hidden su-top-0 su-left-0 su-items-center su-justify-center su-z-[10000] su-bg-black-true su-bg-opacity-[90%] su-flex"}
          aria-label={ariaLabel}
          aria-hidden={!isOpen}
          aria-modal={isOpen}
          role="dialog"
        >
          <div className={"su-absolute su-w-screen su-h-full su-basefont-19 su-pointer-events-auto"}>
            <div
              className="su-h-5/6 su-w-11/12 md:su-h-4/5 md:su-w-8/12 su-mx-auto su-mt-[5%]"
            >
              {children}
            </div>

            <div>
              <button
                type="button"
                onClick={onClose}
                className={"su-absolute su-right-50 su-top-50 su-text-white su-flex"}
              >
                Close<span className="su-sr-only"> Overlay</span>
                <XMarkIcon className="su-ml-10 su-mt-[-3px]" width={25}/>
              </button>
            </div>
          </div>
        </div>
      </ReactFocusLock>
    </dialog>
  );
};

export default Modal;

