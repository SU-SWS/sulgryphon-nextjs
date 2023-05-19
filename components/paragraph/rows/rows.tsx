import {DrupalParagraph} from "next-drupal";
import OneColumn from "@/components/paragraph/rows/one-column";
import TwoColumn from "@/components/paragraph/rows/two-column";
import ThreeColumn from "@/components/paragraph/rows/three-column";

interface RowProps {
  items: DrupalParagraph[]
  fullWidth?: boolean
}

export const ParagraphRows = ({items, fullWidth = true, ...props}: RowProps) => {
  const layouts = {};

  // Set the layouts first.
  items.map(item => {
    if (item?.behavior_settings?.layout_paragraphs?.layout) {
      layouts[item.id] = item;
      layouts[item.id].children = [];
    }
  })

  // Add the components to each of the layouts.
  items.map(item => {
    const parentUUID = item?.behavior_settings?.layout_paragraphs?.parent_uuid;
    if (parentUUID && layouts[parentUUID]) {
      layouts[parentUUID].children.push(item);
    }
  })

  return (
    <div className="su-grid su-grid-column su-mb-[40px] su-gap-[90px]" {...props}>
      {Object.keys(layouts).map(layoutId =>
        <Row
          key={layoutId}
          layoutSettings={layouts[layoutId].behavior_settings.layout_paragraphs}
          items={layouts[layoutId].children}
          fullWidth={fullWidth}
        />
      )}
    </div>
  )
}

const Row = ({layoutSettings, items, fullWidth = true}) => {
  return (
    <>
      {layoutSettings.layout === 'sul_helper_1_column' &&
        <OneColumn config={layoutSettings.config} items={items} fullWidth={fullWidth}/>}
      {layoutSettings.layout === 'sul_helper_2_column' &&
        <TwoColumn config={layoutSettings.config} items={items} fullWidth={fullWidth}/>}
      {layoutSettings.layout === 'sul_helper_3_column' &&
        <ThreeColumn config={layoutSettings.config} items={items} fullWidth={fullWidth}/>}
    </>
  )
}
