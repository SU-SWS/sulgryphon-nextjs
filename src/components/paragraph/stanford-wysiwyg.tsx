import formatHtml from "@/lib/format-html";
import {PropsWithoutRef} from "react";

interface Props extends PropsWithoutRef<any> {
  text?: string
}

const StanfordWysiwyg = ({text, ...props}: Props) => {
  return (
    <div className="relative centered lg:max-w-[980px]" {...props}>
      {text && <>{formatHtml(text)}</>}
    </div>
  )
}
export default StanfordWysiwyg