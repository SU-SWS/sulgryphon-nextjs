"use client";

import React, {useCallback, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import ReactFocusLock from "react-focus-lock";
import {XMarkIcon} from "@heroicons/react/20/solid";

const InterceptionModal = ({children}) => {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.getElementsByTagName('body')[0].style.height = '100vh';
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.getElementsByTagName('body')[0].style.height = 'auto';
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    }
  }, [onKeyDown]);

  return (
      <dialog
        ref={overlay}
        className="su-modal su-fixed su-w-screen su-h-full su-overscroll-contain su-overflow-y-scroll su-overflow-x-hidden su-top-0 su-left-0 su-items-center su-justify-center su-z-[10000] su-bg-black-true su-bg-opacity-[80%] su-flex"
        onClick={onClick}
      >
        <ReactFocusLock>
          <div
            ref={wrapper}
            className="su-absolute su-top-1/2 su-left-1/2 su--translate-x-1/2 su--translate-y-1/2 su-w-11/12 sm:su-w-10/12 md:su-w-8/12 lg:su-w-1/2 p-6"
          >
            {children}
          </div>

          <button
            type="button"
            onClick={onDismiss}
            className="su-fixed su-right-50 su-top-50 su-text-white su-flex hocus:su-underline"
          >
            Close<span className="su-sr-only"> Overlay</span>
            <XMarkIcon className="su-ml-5" width={25}/>
          </button>
        </ReactFocusLock>
      </dialog>

  );
}


export default InterceptionModal;