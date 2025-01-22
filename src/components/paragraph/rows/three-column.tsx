import OneColumn from "@/components/paragraph/rows/one-column"
import {ParagraphUnion} from "@/lib/gql/__generated__/drupal.d"
import {getParagraphBehaviors} from "@/components/paragraph"
import {isPreviewMode} from "@/lib/drupal/is-draft-mode"

interface LayoutProps {
  items: ParagraphUnion[]
  fullWidth?: boolean
  config?: Record<string, string>
}

const ThreeColumn = ({items, fullWidth = true}: LayoutProps) => {
  const leftItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === "left")
  const mainItems = items.filter(
    item => !["left", "right"].includes(getParagraphBehaviors(item).layout_paragraphs?.region || "main")
  )
  const rightItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === "right")

  const draftProps: Record<string, string> = {}
  if (isPreviewMode()) {
    draftProps["data-columns"] = "3"
  }

  return (
    <div
      className="centered flex flex-col justify-between gap-[9rem] md:flex-row md:flex-wrap xl:flex-nowrap"
      {...draftProps}
    >
      <OneColumn
        className="w-full md:w-[calc(50%_-_5rem)] xl:w-[calc(33.3%_-_5rem)]"
        items={leftItems}
        fullWidth={fullWidth}
      />
      <OneColumn
        className="w-full md:w-[calc(50%_-_5rem)] xl:w-[calc(33.3%_-_5rem)]"
        items={mainItems}
        fullWidth={fullWidth}
      />
      <OneColumn
        className="mx-auto w-full md:w-[calc(50%_-_5rem)] xl:w-[calc(33.3%_-_5rem)]"
        items={rightItems}
        fullWidth={fullWidth}
      />
    </div>
  )
}
export default ThreeColumn
