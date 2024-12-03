import {ParagraphStanfordFaq} from "@/lib/gql/__generated__/drupal.d"
import Accordion from "@/components/patterns/accordion"
import {HTMLAttributes} from "react"
import {twMerge} from "tailwind-merge"
import formatHtml from "@/lib/format-html"

type Props = HTMLAttributes<HTMLElement> & {
  paragraph: ParagraphStanfordFaq
}

const StanfordAccordionParagraph = ({paragraph, ...props}: Props) => {
  const Element = paragraph.suFaqHeadline ? "article" : "div"
  console.log("paragraph", paragraph.suFaqHeadline)
  return (
    <Element
      {...props}
      className={twMerge("centered", props.className)}
      aria-labelledby={paragraph.suFaqHeadline ? paragraph.id : undefined}
    >
      {paragraph.suFaqHeadline && (
        <h2 id={paragraph.id} className="text-center">
          {paragraph.suFaqHeadline}
        </h2>
      )}

      {paragraph.suFaqDescription && (
        <div className="wysiwyg centered relative mb-20 lg:max-w-[980px]">
          {formatHtml(paragraph.suFaqDescription.processed)}
        </div>
      )}

      {paragraph.suFaqQuestions &&
        paragraph.suFaqQuestions.map(accordion => (
          <Accordion
            key={accordion.id}
            headingLevel={paragraph.suFaqHeadline ? "h3" : "h2"}
            button={accordion.suAccordionTitle}
          >
            <div className="wysiwyg centered relative">{formatHtml(accordion.suAccordionBody.processed)}</div>
          </Accordion>
        ))}
    </Element>
  )
}

export default StanfordAccordionParagraph
