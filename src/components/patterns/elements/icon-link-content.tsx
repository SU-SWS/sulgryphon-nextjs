import {ReactNode} from "react"
import cn from "@/lib/utils/className"

/**
 * An icon and its text, laid out inside a link so the icon takes the link's colour.
 *
 * The icon is centred on the first line of text, and wrapped lines start under the text, not the icon. The row is a
 * block-level flex box (not inline-flex) so the link's hover underline still reaches the text. Give the icon its own
 * right margin for the gap.
 *
 * How the centring works, without the `lh` unit (Safari 27 resolves `1lh` here from the inherited body line-height,
 * not the link's own, so a `h-[1lh]` box came out 27px on 21.6px text and the icon sat low):
 * - The row aligns its items on their baselines.
 * - The icon box holds one zero-width space (CSS generated, so it isn't copied or read out), which gives it a text
 *   baseline and one line of the same font. Its centre is then the centre of the text's first line, whatever the
 *   line-height.
 * - The icon sits in a zero-height wrapper centred in that box, so icons taller than the line still centre exactly.
 */
const IconLinkContent = ({icon, children, className}: {icon: ReactNode; children: ReactNode; className?: string}) => (
  <span className={cn("flex items-baseline", className)}>
    <span className="flex shrink-0 items-center select-none before:content-['\200B']" aria-hidden="true">
      <span className="flex h-0 items-center">{icon}</span>
    </span>
    <span className="min-w-0">{children}</span>
  </span>
)
export default IconLinkContent
