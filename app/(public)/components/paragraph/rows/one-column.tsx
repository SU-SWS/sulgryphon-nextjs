import Paragraph from "@/components/paragraph";
import {DrupalParagraph} from "next-drupal";

const OneColumn = ({items, fullWidth = false, config = {}}) => {
  const fullWidthItems = [
    'paragraph--stanford_banner',
    'paragraph--sul_feat_collection',
  ];

  const paddingClass = fullWidth ? "su-px-40 lg:px-0": "";

  return (
    <div className="su-grid su-grid-col su-gap-2xl">
      {items.map(item =>
        <Paragraph key={item.id} paragraph={item as DrupalParagraph} siblingCount={0} className={"su-relative " + (fullWidthItems.indexOf(item.type) >= 0 ? "" : "su-w-full su-max-w-[980px] su-mx-auto ") + paddingClass}/>
      )}
    </div>
  )
}
export default OneColumn;