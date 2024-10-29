import Paragraph from "@/components/paragraph"
import {ParagraphUnion} from "@/lib/gql/__generated__/drupal.d"

interface LayoutProps {
  items: ParagraphUnion[]
  fullWidth?: boolean
  config?: Record<string, string>
}

const OneColumn = ({items, fullWidth = true}: LayoutProps) => {
  return (
    <div data-rows="one-column" className="relative flex flex-col gap-[90px]">
      {items.map(item => (
        <Paragraph key={item.id} paragraph={item} fullWidth={fullWidth} singleRow />
      ))}
    </div>
  )
}
export default OneColumn
