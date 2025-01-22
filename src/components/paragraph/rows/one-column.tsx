import Paragraph from "@/components/paragraph"
import {ParagraphUnion} from "@/lib/gql/__generated__/drupal.d"
import {isPreviewMode} from "@/lib/drupal/is-draft-mode"
import {twMerge} from "tailwind-merge"

interface LayoutProps {
  items: ParagraphUnion[]
  fullWidth?: boolean
  config?: Record<string, string>
  className?: string
}

const OneColumn = ({items, fullWidth = true, className}: LayoutProps) => {
  const draftProps: Record<string, string> = {}
  if (isPreviewMode()) {
    draftProps["data-columns"] = "1"
  }
  return (
    <div className={twMerge("space-y-16 @container", className)} {...draftProps}>
      {items.map(item => (
        <Paragraph paragraph={item} key={item.id} fullWidth={fullWidth} />
      ))}
    </div>
  )
}
export default OneColumn
