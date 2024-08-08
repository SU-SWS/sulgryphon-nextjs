import formatHtml from "@/lib/format-html"
import {HTMLAttributes} from "react"

type Props = HTMLAttributes<HTMLDivElement> & {
  text?: string
}

const StanfordWysiwyg = ({text, ...props}: Props) => {
  return (
    <div className="centered relative lg:max-w-[980px]" {...props}>
      {text && <>{formatHtml(text)}</>}
    </div>
  )
}
export default StanfordWysiwyg
