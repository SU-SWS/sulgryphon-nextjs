import formatHtml from "@/lib/format-html";
import {WysiwygParagraph} from "@/lib/drupal/drupal";

interface StanfordWysiwygProps {
  paragraph: WysiwygParagraph
  siblingCount?: number
}

const StanfordWysiwyg = ({paragraph, siblingCount, ...props}: StanfordWysiwygProps) => {
  return (
    <div {...props}>
      {formatHtml(paragraph?.su_wysiwyg_text?.processed)}
    </div>
  )
}
export default StanfordWysiwyg