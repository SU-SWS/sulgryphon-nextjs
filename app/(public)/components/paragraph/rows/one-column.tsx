import Paragraph from "@/components/paragraph";
import {DrupalParagraph} from "next-drupal";

interface LayoutProps {
  items: DrupalParagraph[],
  fullWidth?: boolean
  config?: {}
}

const OneColumn = ({items, config = {}, fullWidth = false}: LayoutProps) => {

  // Items that will manage their widths/gutters directly in the component.
  const fullWidthItems = [
    'paragraph--stanford_banner',
    'paragraph--sul_feat_collection',
    'paragraph--stanford_lists',
    'paragraph--stanford_card',
  ];

  const paddingClass = fullWidth ? "su-px-40 xl:su-px-0" : "";

  return (
    <div className="su-grid su-grid-col su-gap-2xl">
      {items.map(item =>
        <Paragraph
          key={item.id}
          paragraph={item as DrupalParagraph}
          siblingCount={0}
          className={"su-relative su-w-full su-mx-auto " + (fullWidthItems.indexOf(item.type) >= 0 ? "" : ` su-max-w-[980px] ${paddingClass}`)}
        />
      )}
    </div>
  )
}
export default OneColumn;
