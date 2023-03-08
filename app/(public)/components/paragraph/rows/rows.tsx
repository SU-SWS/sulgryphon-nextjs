import {DrupalParagraph} from "next-drupal";
import dynamic from "next/dynamic";

const OneColumn = dynamic(() => import("./one-column"));
const TwoColumn = dynamic(() => import("./two-column"));
const ThreeColumn = dynamic(() => import("./three-column"));

interface RowProps {
  items: DrupalParagraph[]
}

export const ParagraphRows = ({items, ...props}: RowProps) => {
  const layouts = {};
  items.map(item => {
    if (item?.behavior_settings?.layout_paragraphs?.layout) {
      layouts[item.id] = item;
      layouts[item.id].children = [];
      return;
    }

    const parentUUID = item?.behavior_settings?.layout_paragraphs?.parent_uuid;
    if (parentUUID) {
      layouts[parentUUID].children.push(item);
    }
  })

  return (
    <div className="su-grid su-grid-column su-gap-2xl su-mb-[40px]" {...props}>
      {Object.keys(layouts).map(layoutId =>
        <Row
          key={layoutId}
          layoutSettings={layouts[layoutId].behavior_settings.layout_paragraphs}
          items={layouts[layoutId].children}
        />
      )}
    </div>
  )
}

export const Row = ({layoutSettings, items}) => {
  return (
    <>
      {layoutSettings.layout === 'sul_helper_1_column' && <OneColumn config={layoutSettings.config} items={items}/>}
      {layoutSettings.layout === 'sul_helper_2_column' && <TwoColumn config={layoutSettings.config} items={items}/>}
      {layoutSettings.layout === 'sul_helper_3_column' && <ThreeColumn config={layoutSettings.config} items={items}/>}
    </>
  )
}
