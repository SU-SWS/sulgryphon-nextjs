import formatHtml from "@/lib/format-html";
import {PropsWithoutRef} from "react";

interface Props extends PropsWithoutRef<any> {
  text?: string
  siblingCount?: number
}

const StanfordWysiwyg = ({text, siblingCount, ...props}: Props) => {
  return (
    <div {...props}>
      {text && <>{formatHtml(text)}</>}
    </div>
  )
}
export default StanfordWysiwyg