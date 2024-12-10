import {HtmlHTMLAttributes} from "react"
import {ParagraphStanfordFaq} from "@/lib/gql/__generated__/drupal.d"
import {twMerge} from "tailwind-merge"
import formatHtml from "@/lib/format-html"
import Accordion, {AccordionHeaderChoice} from "@/components/patterns/elements/accordion"
import ExpandCollapseAll from "@/components/patterns/elements/expand-collapse-all"
import {getParagraphBehaviors} from "."

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordFaq
}

const StanfordAccordionParagraph = ({paragraph, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)
  const headerTag = behaviors.faq_accordions?.heading || "h2"

  const heading = paragraph.suFaqHeadline

  let accordionHeadingLevel: AccordionHeaderChoice = "h2"
  if (heading) {
    if (headerTag === "h2") accordionHeadingLevel = "h3"
    if (headerTag === "h3") accordionHeadingLevel = "h4"
    if (headerTag === "h4") accordionHeadingLevel = "h5"
  }

  return (
    <div {...props} className={twMerge("space-y-20", props.className)}>
      <div className="flex flex-col items-center justify-between gap-20 @3xl:flex-row">
        {paragraph.suFaqHeadline && (
          <h2 id={paragraph.id} className="text-center">
            {paragraph.suFaqHeadline}
          </h2>
        )}
        <ExpandCollapseAll className="ml-auto" />
      </div>

      {paragraph.suFaqDescription && (
        <div className="wysiwyg centered relative mb-20 lg:max-w-[980px]">
          {formatHtml(paragraph.suFaqDescription.processed)}
        </div>
      )}

      {paragraph.suFaqQuestions?.map(question => (
        <Accordion
          className="border-t border-black-40 last:border-b"
          buttonProps={{className: "mt-6"}}
          key={question.id}
          button={question.suAccordionTitle}
          headingLevel={accordionHeadingLevel}
        >
          <div className="wysiwyg centered relative">{formatHtml(question.suAccordionBody.processed)}</div>
        </Accordion>
      ))}
    </div>
  )
}

export default StanfordAccordionParagraph
