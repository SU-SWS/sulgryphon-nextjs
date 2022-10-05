import formatHtml from "@/lib/format-html"
import {WysiwygParagraph} from "../../types/drupal";

interface StanfordWysiwygProps {
  paragraph: WysiwygParagraph
  siblingCount?: number
  className?: string
}

export function StanfordWysiwyg({paragraph, siblingCount, ...props}: StanfordWysiwygProps) {
  return (
    <div {...props} className={`su-max-w-[980px] su-mx-auto ${props.className ?? ''}`}>
      {formatHtml(paragraph?.su_wysiwyg_text?.processed)}
    </div>
  )
}