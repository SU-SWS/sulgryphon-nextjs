"use client";

import {useRef, useState} from "react";
import Modal from "../../patterns/modal";
import { CalendarDaysIcon, CalendarIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const LibCal = ({libcalId}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const iframeRef = useRef(null);
  return (
    <>
      <button className="su-bg-black-true su-text-white " onClick={() => setModalOpen(true)}>
        <div className="su-flex su-justify-end su-items-center">
            <div className="su-text-white">
                <CalendarDaysIcon className="su-text-white su-bg-black-20" />
            </div>
            <div className="su-relative su-pr-30 su-font-bold hocus:su-text-illuminating-dark su-no-underline">
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