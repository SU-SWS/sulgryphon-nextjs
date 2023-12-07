import Paragraph from "@/components/paragraph";
import {DrupalParagraph} from "next-drupal";

interface LayoutProps {
  items: DrupalParagraph[],
  fullWidth?: boolean
  config?: {}
}

const OneColumn = ({items, config = {}, fullWidth = true}: LayoutProps) => {
  return (
    <div data-rows="one-column" className="relative flex flex-col gap-[90px]">
      {items.map(item =>
        <Paragraph
          key={item.id}
          paragraph={item as DrupalParagraph}
          fullWidth={fullWidth}
          singleRow
        />
      )}
    </div>
  )
}
export default OneColumn;
