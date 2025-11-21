import OneColumn from "@/components/paragraph/rows/one-column"
import TwoColumn, {TwoColumnConfig} from "@/components/paragraph/rows/two-column"
import ThreeColumn, {ThreeColumnConfig} from "@/components/paragraph/rows/three-column"
import {Maybe, ParagraphLayout, ParagraphUnion} from "@/lib/gql/__generated__/drupal.d"
import {getParagraphBehaviors} from "@/components/paragraph"
import {ParagraphBehaviors} from "@/lib/drupal/drupal"
import {HTMLAttributes} from "react"
import {twMerge} from "tailwind-merge"

type Layout = Record<
  string,
  {
    item: ParagraphLayout
    layout: NonNullable<ParagraphBehaviors["layout_paragraphs"]>["layout"]
    config?: Record<string, unknown>
    children: ParagraphUnion[]
  }
>

type Props = HTMLAttributes<HTMLDivElement> & {
  components?: Maybe<ParagraphUnion[]>
  fullWidth?: boolean
}

const Rows = async ({components, className, fullWidth, ...props}: Props) => {
  if (!components) return
  const layouts: Layout = {}

  // Set the layouts first.
  components.map(item => {
    if (item.__typename === "ParagraphLayout") {
      const behaviors = getParagraphBehaviors(item)

      layouts[item.uuid] = {
        item,
        layout: behaviors.layout_paragraphs?.layout || "sul_helper_1_column",
        config: behaviors.layout_paragraphs?.config,
        children: [],
      }
    }
  })

  // Add the components to each of the layouts.
  components.map(item => {
    const behaviors = getParagraphBehaviors(item)
    const parentUUID = behaviors?.layout_paragraphs?.parent_uuid
    if (parentUUID && layouts[parentUUID]) {
      layouts[parentUUID].children.push(item)
    }
  })

  return (
    <div className={twMerge("mb-10 flex flex-col gap-32 @container", className)} {...props}>
      {Object.keys(layouts).map(layoutId => (
        <Row
          key={layoutId}
          layout={layouts[layoutId].layout}
          layoutSettings={layouts[layoutId].config}
          items={layouts[layoutId].children}
          fullWidth={fullWidth}
        />
      ))}
    </div>
  )
}

const Row = ({
  layout,
  layoutSettings,
  items,
  fullWidth,
}: {
  layout: NonNullable<ParagraphBehaviors["layout_paragraphs"]>["layout"]
  layoutSettings?: Record<string, unknown>
  items: ParagraphUnion[]
  fullWidth?: boolean
}) => {
  if (layout === "sul_helper_2_column")
    return <TwoColumn config={layoutSettings as TwoColumnConfig} items={items} fullWidth={fullWidth} />
  if (layout === "sul_helper_3_column")
    return <ThreeColumn items={items} fullWidth={fullWidth} config={layoutSettings as ThreeColumnConfig} />

  // Fall back to one column if the layout is unknown.
  return <OneColumn items={items} fullWidth={fullWidth} config={layoutSettings} />
}

export default Rows
