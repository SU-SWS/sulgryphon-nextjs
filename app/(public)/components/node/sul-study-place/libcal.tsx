"use client";

import {useRef, useState} from "react";
import Modal from "../../patterns/modal";
import { CalendarDaysIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const LibCal = ({libcalId}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const iframeRef = useRef(null);
  return (
    <>
      <button className="su-bg-black-true su-text-white hocus:su-text-illuminating-dark su-w-full su-rs-p-neg1" onClick={() => setModalOpen(true)}>
        <div className="su-flex su-justify-end su-items-center su-gap-xs">
          <div className="su-w-[87px] su-h-[3px] su-bg-illuminating-dark"></div>
          <CalendarDaysIcon className="su-inline-block su-flex-shrink-0 su-w-[24px]"/>
          <div className="su-relative su-pr-30 su-font-bold su-no-underline">
            Reserve Space
            <ChevronRightIcon className="su-inline su-absolute su-top-0 su-right-0 su-h-full"/>
          </div>
        </div>
      </button>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        ariaLabel="Foo Bar"
        initialFocus={iframeRef}
      >
        <iframe
          ref={iframeRef}
          src={`https://appointments.library.stanford.edu/widget/appointments?u=${libcalId}&lid=0&gid=0&iid=5247&t=Make%20an%20appointment`}
          title="Schedule an appointment"
          className="su-w-full su-h-full"
        />
      </Modal>
    </>
  )
}
export default LibCal;