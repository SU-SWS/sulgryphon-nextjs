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
    <div data-rows="three-column" className="centered grid gap-[90px] lg:grid-cols-3">
      <div className="gap-2xll relative flex min-w-0 flex-col">
        {leftItems.map(item => (
          <Paragraph key={item.id} paragraph={item} fullWidth={false} />
        ))}
      </div>
      <div className="relative flex min-w-0 flex-col gap-2xl">
        {mainItems.map(item => (
          <Paragraph key={item.id} paragraph={item} fullWidth={false} />
        ))}
      </div>
      <div className="relative flex min-w-0 flex-col gap-2xl">
        {rightItems.map(item => (
          <Paragraph key={item.id} paragraph={item} fullWidth={false} />
        ))}
      </div>
    </div>
  )
}
export default ThreeColumn
