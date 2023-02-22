import React, {useEffect, useRef, useState} from 'react';
import {XMarkIcon} from "@heroicons/react/20/solid";
import {tabbable} from 'tabbable';

import useFocusTrap from "@/lib/hooks/useFocusTrap";


const Modal = ({children, isOpen, onClose, ariaLabel, initialFocus = null}) => {
  const closeButton = useRef(null);
  const modalBodyRef = useRef(null);

  // Find the last tabbable item within the modal body.
  const getLastTabbableItem = () => {
    if (!modalBodyRef.current) return null;
    const focusableItems = tabbable(modalBodyRef.current);
    const lastTabbableItem = focusableItems.length
      ? focusableItems[focusableItems.length - 1]
      : closeButton.current;
    return lastTabbableItem;
  };

  // Mimick the structure of a React ref so it works with UseFocusTrap hook.
  const [lastTabbableRef, setLastTabbableRef] = useState({
    current: getLastTabbableItem(),
  });

  // Update focus trap when child content changes.
  useEffect(() => {
    setLastTabbableRef({current: getLastTabbableItem()});
  }, [children]);

  useFocusTrap(closeButton, lastTabbableRef, isOpen);

  const lockScroll = () => {
    const overlay = document.querySelector('.su-modal');
    const scrollbarWidth = `${overlay.offsetWidth - overlay.clientWidth}px`;

    document
      .getElementsByTagName('html')[0]
      .setAttribute('style', 'overflow-y: hidden!important');
    document.getElementsByTagName('body')[0].style.paddingRight =
      scrollbarWidth;
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    document.getElementsByTagName('body')[0].style.position = 'fixed';
    document.getElementsByTagName('body')[0].style.left = '0';
    document.getElementsByTagName('body')[0].style.right = '0';
  };

  const unlockScroll = () => {
    document
      .getElementsByTagName('html')[0]
      .setAttribute('style', 'overflow-y: visible!important');
    document.getElementsByTagName('body')[0].style.paddingRight = '0';
    document.getElementsByTagName('body')[0].style.overflowY = 'visible';
    document.getElementsByTagName('body')[0].style.position = 'relative';
    document.getElementsByTagName('body')[0].style.left = 'unset';
    document.getElementsByTagName('body')[0].style.right = 'unset';
  };

  useEffect(() => {
    if (isOpen) {
      lockScroll();
      if (initialFocus) {
        initialFocus.current.focus();
      } else {
        closeButton.current.focus();
      }
    } else {
      unlockScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div
      className={"su-modal su-fixed su-w-screen su-h-full su-overscroll-contain su-overflow-y-scroll su-overflow-x-hidden su-top-0 su-left-0 su-items-center su-justify-center su-z-[60] su-bg-black-80 su-bg-opacity-[90%] " + (isOpen ? 'su-flex' : 'su-hidden')}
      aria-label={ariaLabel}
      aria-hidden={!isOpen}
      aria-modal={isOpen}
      role="dialog"
      tabIndex={-1}
    >
      <div className={"su-absolute su-w-screen su-h-full su-basefont-19 su-pointer-events-auto"}>
        <div className={""}>
          <button
            type="button"
            ref={closeButton}
            onClick={onClose}
            className={"su-text-white hocus:su-bg-transparent su-font-semibold hocus:su-underline su-text-m1 su-flex su-items-end focus:su-outline-none"}
            aria-label="Close modal"
          >
            Close
            <XMarkIcon className={""} aria-hidden/>
          </button>
        </div>
        <div ref={modalBodyRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

