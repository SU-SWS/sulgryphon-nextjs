import {DrupalParagraph} from "next-drupal";

import {OneColumn} from "@/components/layouts/one-column";
import {TwoColumn} from "@/components/layouts/two-column";
import {ThreeColumn} from "@/components/layouts/three-column";

interface RowProps {
  rows: DrupalParagraph[]
  rowField: string
}

export const Rows = ({rows, rowField, ...props}: RowProps) => {
  const layouts = {};
  rows.map(row => {
    if (row?.behavior_settings?.layout_paragraphs?.layout) {
      layouts[row.id] = row;
      layouts[row.id].children = [];
      return;
    }

    const parentUUID = row?.behavior_settings?.layout_paragraphs?.parent_uuid;
    if (parentUUID) {
      layouts[parentUUID].children.push(row);
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
