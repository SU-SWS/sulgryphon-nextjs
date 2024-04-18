import {ReactNode} from "react";
import {isPreviewMode} from "@/lib/drupal/is-draft-mode";
import Editori11y from "@/components/editori11y";
import {ExclamationCircleIcon} from "@heroicons/react/20/solid";
import DisablePreviewMode from "./disable-preview-mode";

const RootLayout = ({children}: { children: ReactNode }) => {
  const previewMode = isPreviewMode()
  return (
    <>
      {previewMode &&
        <>
          <div className="bg-illuminating py-10 text-3xl font-bold">
            <div className="centered-container flex gap-10"><ExclamationCircleIcon width={20}/>Previewing Content</div>
          </div>

          <Editori11y/>
          <DisablePreviewMode/>
        </>
      }
      {children}
    </>
  )
}
export default RootLayout;
