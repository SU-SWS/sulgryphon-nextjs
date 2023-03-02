import formatHtml from "../../lib/format-html";
import {WysiwygParagraph} from "../../../src/types/drupal";

interface StanfordWysiwygProps {
  paragraph: WysiwygParagraph
  siblingCount?: number
  className?: string
}

const StanfordWysiwyg = ({paragraph, siblingCount, ...props}: StanfordWysiwygProps) => {
  return (
    <div {...props} className={`su-w-full su-max-w-[980px] su-mx-auto ${props.className ?? ''}`}>
      {formatHtml(paragraph?.su_wysiwyg_text?.processed)}
    </div>
  )
}
export default StanfordWysiwyg