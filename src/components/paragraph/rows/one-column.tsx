import Paragraph from "@/components/paragraph";
import {StanfordParagraph} from "@/lib/drupal/drupal";

interface LayoutProps {
  items: StanfordParagraph[],
  fullWidth?: boolean
  config?: {}
}

const OneColumn = ({items, fullWidth = true}: LayoutProps) => {
  return (
    <div data-rows="one-column" className="relative flex flex-col gap-[90px]">
      {items.map(item =>
        <Paragraph
          key={item.id}
          paragraph={item}
          fullWidth={fullWidth}
          singleRow
        />
      )}
    </div>
  )
}
export default OneColumn;
