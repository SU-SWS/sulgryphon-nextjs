import Paragraph, {getParagraphBehaviors} from "@/components/paragraph"
import {ParagraphUnion} from "@/lib/gql/__generated__/drupal.d"

interface LayoutProps {
  items: ParagraphUnion[]
  fullWidth?: boolean
}

const ThreeColumn = ({items}: LayoutProps) => {
  const leftItems = items.filter(item => getParagraphBehaviors(item)?.layout_paragraphs?.region === "left")
  const mainItems = items.filter(item => getParagraphBehaviors(item)?.layout_paragraphs?.region === "main")
  const rightItems = items.filter(item => getParagraphBehaviors(item)?.layout_paragraphs?.region === "right")
  return (
    <div data-rows="three-column" className="centered flex flex-col items-center gap-[90px]">
      <div className="grid gap-[90px] md:grid-cols-2 lg:grid-cols-3">
        <div className="relative flex min-w-0 flex-col gap-2xl">
          {leftItems.map(item => (
            <Paragraph key={item.id} paragraph={item} fullWidth={false} />
          ))}
        </div>
        <div className="relative flex min-w-0 flex-col gap-2xl">
          {mainItems.map(item => (
            <Paragraph key={item.id} paragraph={item} fullWidth={false} />
          ))}
        </div>
        <div className="relative hidden min-w-0 flex-col gap-2xl lg:block">
          {rightItems.map(item => (
            <Paragraph key={item.id} paragraph={item} fullWidth={false} />
          ))}
        </div>
      </div>
      <div className="relative flex w-full max-w-[47rem] flex-col items-center justify-center gap-2xl md:w-[calc(50%_-_45px)] lg:hidden">
        {rightItems.map(item => (
          <Paragraph key={item.id} paragraph={item} fullWidth={false} />
        ))}
      </div>
    </div>
  )
}
export default ThreeColumn
