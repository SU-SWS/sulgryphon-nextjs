import OneColumn from "@/components/paragraph/rows/one-column";
import TwoColumn from "@/components/paragraph/rows/two-column";
import ThreeColumn from "@/components/paragraph/rows/three-column";
import {ParagraphLayout, ParagraphUnion} from "@/lib/gql/__generated__/drupal.d";
import {getParagraphBehaviors} from "@/components/paragraph";

type RowProps = {
  items: ParagraphUnion[]
  fullWidth?: boolean
}

type Layout = Record<string, {
  item: ParagraphLayout
  layout: string
  config?: Record<string, any>
  children: ParagraphUnion[]
}>

export const ParagraphRows = ({items, fullWidth}: RowProps) => {
  const layouts: Layout = {};

  // Set the layouts first.
  items.map(item => {
    if (item.__typename === 'ParagraphLayout') {
      const behaviors = getParagraphBehaviors(item);

      layouts[item.id] = {
        item,
        layout: behaviors.layout_paragraphs?.layout || 'sul_helper_1_column',
        config: behaviors.layout_paragraphs?.config,
        children: []
      }
    }
  })

  // Add the components to each of the layouts.
  items.map(item => {
    const behaviors = getParagraphBehaviors(item);
    const parentUUID = behaviors?.layout_paragraphs?.parent_uuid
    if (parentUUID && layouts[parentUUID]) {
      layouts[parentUUID].children.push(item);
    }
  })

  return (
    <div className="grid gap-32 mb-10">
      {Object.keys(layouts).map(layoutId =>
        <Row
          key={layoutId}
          layout={layouts[layoutId].layout}
          layoutSettings={layouts[layoutId].config}
          items={layouts[layoutId].children}
          fullWidth={fullWidth}
        />
      )}
    </div>
  )
}

const Row = ({layout, layoutSettings, items, fullWidth}: {
  layout: string
  layoutSettings?: Record<string, any>
  items: ParagraphUnion[]
  fullWidth?: boolean
}) => {
  return (
    <>
      {layout === 'sul_helper_1_column' &&
        <OneColumn config={layoutSettings} items={items} fullWidth={fullWidth}/>}
      {layout === 'sul_helper_2_column' &&
        <TwoColumn config={layoutSettings} items={items} fullWidth={fullWidth}/>}
      {layout === 'sul_helper_3_column' &&
        <ThreeColumn items={items} fullWidth={fullWidth}/>}
    </>
  )
}
