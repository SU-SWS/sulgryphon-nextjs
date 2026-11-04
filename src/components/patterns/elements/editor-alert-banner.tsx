import {ExclamationCircleIcon} from "@heroicons/react/20/solid"
import {HTMLAttributes, JSX} from "react"
import cn from "@/lib/utils/className"

type Props = HTMLAttributes<HTMLDivElement> & {
  message: string | JSX.Element
}
const EditorAlertBanner = ({message, children}: Props) => {
  return (
    <div className={cn({"border-2 border-dashed border-illuminating": children})}>
      <div className="bg-illuminating py-10 text-3xl font-bold">
        <div className="centered-container flex gap-10">
          <ExclamationCircleIcon width={20} />
          {message}
        </div>
      </div>
      {children}
    </div>
  )
}
export default EditorAlertBanner
