"use client"

import {Ref, useId} from "react"

// Not "search", "q", etc: those are real params the external /all and
// searchworks.stanford.edu targets may interpret, so a generic name risks colliding.
export const HONEYPOT_FIELD_NAME = "_hp"

const HoneypotField = ({ref}: {ref: Ref<HTMLInputElement>}) => {
  const honeypotId = useId()

  return (
    // Hidden both visually and from assistive tech (aria-hidden + off-screen + tabIndex -1
    // + autoComplete off). Humans never populate it; bots that fill every field do.
    // Do NOT use sr-only here - that is announced by screen readers.
    <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
      <label htmlFor={honeypotId}>Leave this field blank</label>
      <input
        id={honeypotId}
        type="text"
        name={HONEYPOT_FIELD_NAME}
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
        ref={ref}
      />
    </div>
  )
}

export default HoneypotField
