import OneColumn from "@/components/paragraph/rows/one-column"
import {ParagraphUnion} from "@/lib/gql/__generated__/drupal.d"
import {getParagraphBehaviors} from "@/components/paragraph"
import {isPreviewMode} from "@/lib/drupal/is-draft-mode"
import {twMerge} from "tailwind-merge"

export type TwoColumnConfig = Record<string, string>
type Props = {
  items: ParagraphUnion[]
  fullWidth?: boolean
  config?: TwoColumnConfig
}

const TwoColumn = async ({items, fullWidth, config}: Props) => {
  const leftItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === "left")
  const rightItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region !== "left")

  let gridCols = "md:grid-cols-2"
  if (config?.column_widths === "33-67") {
    gridCols = "@6xl:grid-cols-1-2"
  } else if (config?.column_widths === "67-33") {
    gridCols = "@6xl:grid-cols-2-1"
  }

  const draftProps: Record<string, string> = {}
  if (await isPreviewMode()) {
    draftProps["data-columns"] = "2"
  }

  return (
    <div className={twMerge("gutters centered grid gap-90", gridCols)} {...draftProps}>
      <OneColumn items={leftItems} fullWidth={fullWidth} />
      <OneColumn items={rightItems} fullWidth={fullWidth} />
    </div>
  )
}
export default TwoColumn
