"use client";

import {useRef, useState} from "react";
import Modal from "../../patterns/modal";

const LibCal = ({libcalId}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const iframeRef = useRef(null);
  return (
    <>
      <button className="su-button" onClick={() => setModalOpen(true)}>
        Schedule an appointment
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