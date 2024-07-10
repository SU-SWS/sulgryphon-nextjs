import {ExclamationCircleIcon} from "@heroicons/react/20/solid"
import {HTMLAttributes, JSX} from "react"

type Props = HTMLAttributes<HTMLDivElement> & {
  message: string | JSX.Element
}
const EditorAlertBanner = ({message, children}: Props) => {
  return (
    <div className={children ? "border-2 border-dashed border-illuminating" : ""}>
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
