import React, {useEffect, useRef} from 'react';
import {XMarkIcon} from "@heroicons/react/20/solid";
import FocusTrap from "focus-trap-react";
import Conditional from "@/components/simple/conditional";
import {useAutoAnimate} from "@formkit/auto-animate/react";

const Modal = ({children, isOpen, onClose, ariaLabel, initialFocus = null}) => {
  const closeButton = useRef(null);
  const modalBodyRef = useRef(null);
  const [animationParent] = useAutoAnimate()

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
  }, [isOpen]);

  return (
    <div ref={animationParent}>
      <Conditional showWhen={isOpen}>
        <FocusTrap
          active={isOpen}
          focusTrapOptions={{
            initialFocus: () => initialFocus?.current ?? false,
            fallbackFocus: closeButton.current,
            returnFocusOnDeactivate: true
          }}
        >
          <div
            className={"su-modal su-fixed su-w-screen su-h-full su-overscroll-contain su-overflow-y-scroll su-overflow-x-hidden su-top-0 su-left-0 su-items-center su-justify-center su-z-[60] su-bg-black su-bg-opacity-[97%] su-flex"}
            aria-label={ariaLabel}
            aria-hidden={!isOpen}
            aria-modal={isOpen}
            role="dialog"
          >
            <div className={"su-absolute su-w-screen su-h-full su-basefont-19 su-pointer-events-auto"}>
              <div ref={modalBodyRef}
                   className="su-w-full su-h-5/6 su-w-11/12 md:su-h-4/5 md:su-w-8/12 su-mx-auto su-mt-[5%]">
                {children}
              </div>

              <div className={""}>
                <button
                  type="button"
                  ref={closeButton}
                  onClick={onClose}
                  className={"su-absolute su-right-50 su-top-50 su-text-white"}
                  aria-label="Close modal"
                >
                  <XMarkIcon className={""} width={25} aria-hidden/>
                </button>
              </div>
            </div>
          </div>
        </FocusTrap>
      </Conditional>
    </div>
  );
};

export default Modal;

