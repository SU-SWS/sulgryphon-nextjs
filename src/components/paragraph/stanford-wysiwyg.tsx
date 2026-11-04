import formatHtml from "@/lib/format-html"
import {HTMLAttributes} from "react"
import cn from "@/lib/utils/className"

type Props = HTMLAttributes<HTMLDivElement> & {
  text?: string | null
}

const StanfordWysiwyg = ({text, className, ...props}: Props) => {
  return (
    <div className={cn("wysiwyg relative centered lg:max-w-[980px]", className)} {...props}>
      {text && <>{formatHtml(text)}</>}
    </div>
  )
}
export default StanfordWysiwyg
