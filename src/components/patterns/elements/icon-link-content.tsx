import {ReactNode} from "react"
import cn from "@/lib/utils/className"

/**
 * An icon and its text, laid out inside a link so the icon takes the link's colour.
 *
 * The icon sits in a box one line high (1lh), so it's centred on the first line of text, and wrapped lines start
 * under the text, not the icon. The row is a block-level flex box (not inline-flex) so the link's hover underline
 * still reaches the text. Give the icon its own right margin for the gap.
 */
const IconLinkContent = ({icon, children, className}: {icon: ReactNode; children: ReactNode; className?: string}) => (
  <span className={cn("flex", className)}>
    <span className="flex h-[1lh] shrink-0 items-center">{icon}</span>
    <span className="min-w-0">{children}</span>
  </span>
)
export default IconLinkContent
