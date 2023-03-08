"use client";

import {PrinterIcon} from "@heroicons/react/24/solid";

const NewsPrintButton = () => {
  return (
    <button onClick={() => window.print()}
            className="su-text-black hocus:su-text-digital-blue su-transition-colors">
      <span className="su-sr-only">Print Article</span>
      <PrinterIcon width={28}/>
    </button>
  )
}
export default NewsPrintButton;