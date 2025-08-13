import OneColumn from "@/components/paragraph/rows/one-column"
import {ParagraphUnion} from "@/lib/gql/__generated__/drupal.d"
import {getParagraphBehaviors} from "@/components/paragraph"
import {isPreviewMode} from "@/lib/drupal/is-draft-mode"
import {LayoutParagraphBehaviors} from "@lib/drupal/drupal-jsonapi.d"
import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"

interface LayoutProps {
  items: ParagraphUnion[]
  fullWidth?: boolean
  config?: LayoutParagraphBehaviors["config"]
}

const ThreeColumn = async ({items, fullWidth = true, config}: LayoutProps) => {
  const leftItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === "left")
  const mainItems = items.filter(
    item => !["left", "right"].includes(getParagraphBehaviors(item).layout_paragraphs?.region || "main")
  )
  const rightItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === "right")

  const draftProps: Record<string, string> = {}
  if (await isPreviewMode()) {
    draftProps["data-columns"] = "3"
  }

  return (
    <div
      className={twMerge(
        clsx(
          "centered flex flex-col justify-between gap-90 *:mx-auto *:w-full md:flex-row md:flex-wrap *:md:w-[calc(50%_-_5rem)] lg:flex-nowrap *:lg:w-[calc(33.3%_-_5rem)]",
          {
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
          }
        )
      )}
      data-columns="3"
      {...draftProps}
    >
      <OneColumn items={leftItems} fullWidth={fullWidth} />
      <OneColumn items={mainItems} fullWidth={fullWidth} />
      <OneColumn items={rightItems} fullWidth={fullWidth} />
    </div>
  )
}
export default ThreeColumn
