import OneColumn from "@/components/paragraph/rows/one-column"
import {ParagraphUnion} from "@/lib/gql/__generated__/drupal.d"
import {getParagraphBehaviors} from "@/components/paragraph"
import {isPreviewMode} from "@/lib/drupal/is-draft-mode"
import {ParagraphBehaviors} from "@/lib/drupal/drupal.d"
import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"

type Props = {
  items: ParagraphUnion[]
  fullWidth?: boolean
  config: NonNullable<ParagraphBehaviors["layout_paragraphs"]>["config"] & {
    column_widths: "33-67" | "67-33"
    vertical_dividers?: boolean
  }
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
    <div
      className={twMerge(
        "gutters centered grid gap-90",
        gridCols,
        clsx({
          "@7xl:grid-cols-1-2": config?.column_widths === "33-67",
          "@7xl:grid-cols-2-1": config?.column_widths === "67-33",
          "px-5 pb-20 pt-20": !!config?.bg_color,
          "pt-0": config?.top_padding === "none",
          "pt-40": config?.top_padding === "more",
          "mb-0": config?.bottom_margin === "none",
          "pb-0": config?.bottom_padding === "none",
          "bg-foggy-light": config?.bg_color === "f4f4f4",
          "bg-[#ebeae4]": config?.bg_color === "ebeae5",
          "bg-[#dcecef]": config?.bg_color === "dcecef",
          "bg-[#dcefec]": config?.bg_color === "dcefec",
          "bg-[#f2e8f1]": config?.bg_color === "f2e8f1",
          "bg-[#f7ecde]": config?.bg_color === "f7ecde",
        })
      )}
      data-columns="2"
      {...draftProps}
    >
      <OneColumn
        items={leftItems}
        fullWidth={fullWidth}
        config={{top_padding: "none", bottom_margin: "none"}}
        className={clsx({
          "after:contents('') relative after:absolute after:-right-10 after:top-0 after:h-full after:w-1 after:bg-black":
            config?.vertical_dividers,
        })}
      />
      <OneColumn items={rightItems} fullWidth={fullWidth} config={{top_padding: "none", bottom_margin: "none"}} />
    </div>
  )
}
export default TwoColumn
