import formatHtml from "@/lib/format-html"
import {HTMLAttributes} from "react"

type Props = HTMLAttributes<HTMLDivElement> & {
  text?: string
}

const StanfordWysiwyg = ({text, ...props}: Props) => {
  return (
    <div className="wysiwyg centered relative w-[100ch] lg:max-w-[980px]" {...props}>
      {text && <>{formatHtml(text)}</>}
    </div>
  )
}
export default StanfordWysiwyg
