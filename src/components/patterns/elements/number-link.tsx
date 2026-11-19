"use client"

import Obfuscate from "react-obfuscate"
import {ComponentProps, HTMLAttributes, HTMLProps, JSX, ReactNode, useState} from "react"
import IconLinkContent from "@/components/patterns/elements/icon-link-content"

/** react-obfuscate passes other props on to the <a>, but its types don't say so. */
const ObfuscateLink = Obfuscate as (
  _props: ComponentProps<typeof Obfuscate> & Omit<HTMLAttributes<HTMLAnchorElement>, "onClick">
) => JSX.Element

/** react-obfuscate's text reversal, which it undoes visually with a right-to-left override. */
const reverse = (text: string) => text.split("").reverse().join("").replace("(", ")").replace(")", "(")

/**
 * An optional icon goes inside the link, so it takes the link's colour (see IconLinkContent).
 * react-obfuscate would render the icon right to left too, so with an icon the number's reversal is applied to the
 * number's own span, and lifted when react-obfuscate reveals the real link: on focus, mouse-over or the context menu.
 * The capture-phase handlers listen to those same events without replacing react-obfuscate's own handlers.
 *
 * `label` is screen-reader text read before the number (e.g. "Mobile: "). It sits outside the reversed span.
 */
const NumberLink = ({
  tel,
  icon,
  label,
  className,
}: {tel: string; icon?: ReactNode; label?: string} & HTMLProps<HTMLAnchorElement>) => {
  const [revealed, setRevealed] = useState(false)
  const reveal = () => setRevealed(true)

  if (!icon) return <ObfuscateLink tel={tel} className={className} />

  return (
    <ObfuscateLink
      tel={tel}
      className={className}
      obfuscateChildren={false}
      onFocusCapture={reveal}
      onMouseOverCapture={reveal}
      onContextMenuCapture={reveal}
    >
      <IconLinkContent icon={icon}>
        {label && <span className="sr-only">{label}</span>}
        {revealed ? tel : <span style={{unicodeBidi: "bidi-override", direction: "rtl"}}>{reverse(tel)}</span>}
      </IconLinkContent>
    </ObfuscateLink>
  )
}
export default NumberLink
