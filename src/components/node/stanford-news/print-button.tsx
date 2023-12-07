"use client";

import {PrinterIcon} from "@heroicons/react/24/solid";
import {ErrorBoundary} from "react-error-boundary";

const NewsPrintButton = () => {
  return (
    <ErrorBoundary
      fallback={<></>}
      onError={e => console.error(e.message)}
    >
      <button onClick={() => window.print()}
              className="text-black hocus:text-digital-blue transition-colors">
        <span className="sr-only">Print Article</span>
        <PrinterIcon width={28}/>
      </button>
    </ErrorBoundary>
  )
}
export default NewsPrintButton;