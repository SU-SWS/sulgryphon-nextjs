import formatHtml from "@/lib/format-html";
import {PropsWithoutRef} from "react";

interface Props extends PropsWithoutRef<any> {
  text?: string
  fullWidth?: boolean
}

const StanfordWysiwyg = ({text, fullWidth = true, ...props}: Props) => {
  return (
    <div className={"su-relative su-max-w-[980px] su-mx-auto" + (fullWidth ? " su-px-40 lg:su-px-0": "")} {...props}>
      {text && <>{formatHtml(text)}</>}
    </div>
  )
}
export default StanfordWysiwyg