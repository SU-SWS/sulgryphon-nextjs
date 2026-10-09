import formatHtml from "@/lib/format-html"
import {HTMLAttributes} from "react"
import {twMerge} from "tailwind-merge"

type Props = HTMLAttributes<HTMLDivElement> & {
  text?: string | null
}

const StanfordWysiwyg = ({text, className, ...props}: Props) => {
  return (
    <div className={twMerge("wysiwyg relative centered lg:max-w-[980px]", className)} {...props}>
      {text && <>{formatHtml(text)}</>}
    </div>
  )
}
export default StanfordWysiwyg
