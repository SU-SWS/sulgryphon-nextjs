import Paragraph from "@/components/paragraph"
import {ParagraphUnion} from "@/lib/gql/__generated__/drupal.d"
import {isPreviewMode} from "@/lib/drupal/is-draft-mode"

interface LayoutProps {
  items: ParagraphUnion[]
  fullWidth?: boolean
  config?: Record<string, string>
}

const OneColumn = async ({items, fullWidth = true}: LayoutProps) => {
  const draftProps: Record<string, string> = {}
  if (await isPreviewMode()) {
    draftProps["data-columns"] = "1"
  }
  return (
    <div className="space-y-16 @container" {...draftProps}>
      {items.map(item => (
        <Paragraph paragraph={item} key={item.id} fullWidth={fullWidth} />
      ))}
    </div>
  )
}
export default OneColumn
