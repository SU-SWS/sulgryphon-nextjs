import {HTMLAttributes} from "react"
import Paragraph from "@/components/paragraph"
import {ParagraphUnion} from "@/lib/gql/__generated__/drupal.d"
import {isPreviewMode} from "@/lib/drupal/is-draft-mode"
import {ParagraphBehaviors} from "@/lib/drupal/drupal.d"
import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import SectionHeading from "@/components/patterns/section-heading"

type Props = HTMLAttributes<HTMLDivElement> & {
  items: ParagraphUnion[]
  fullWidth?: boolean
  config?: NonNullable<ParagraphBehaviors["layout_paragraphs"]>["config"]
}

const OneColumn = async ({items, fullWidth = true, config, className}: Props) => {
  const draftProps: Record<string, string> = {}
  if (await isPreviewMode()) {
    draftProps["data-columns"] = "1"
  }
  return (
    <div
      className={twMerge(
        clsx(
          "flex flex-col gap-90",
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
          },
          className
        )
      )}
      data-columns="1"
      {...draftProps}
    >
      {config?.heading && <SectionHeading heading={config.heading} headerTag={config.heading_level} />}
      {items.map(item => (
        <Paragraph paragraph={item} key={item.id} fullWidth={fullWidth} />
      ))}
    </div>
  )
}
export default OneColumn
