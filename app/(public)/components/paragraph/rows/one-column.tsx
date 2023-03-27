import Paragraph from "@/components/paragraph";
import {DrupalParagraph} from "next-drupal";

interface LayoutProps {
  items: DrupalParagraph[],
  fullWidth?: boolean
}

const OneColumn = ({items, fullWidth = false}: LayoutProps) => {
  const fullWidthItems = [
    'paragraph--stanford_banner',
    'paragraph--sul_feat_collection',
  ];

  const paddingClass = fullWidth ? "su-px-40 xl:su-px-0" : "";

  return (
    <div className="su-grid su-grid-col su-gap-2xl">
      {items.map(item =>
        <Paragraph key={item.id} paragraph={item as DrupalParagraph} siblingCount={0}
                   className={"su-relative su-w-full su-mx-auto " + (fullWidthItems.indexOf(item.type) >= 0 ? "" : " su-max-w-[980px] ") + paddingClass}/>
      )}
    </div>
  )
}
export default OneColumn;