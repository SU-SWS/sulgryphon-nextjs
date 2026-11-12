"use client"

import Obfuscate from "react-obfuscate"
import {ComponentProps, HTMLAttributes, HTMLProps, JSX, ReactNode, useState} from "react"

/** react-obfuscate passes other props on to the <a>, but its types don't say so. */
const ObfuscateLink = Obfuscate as (
  _props: ComponentProps<typeof Obfuscate> & Omit<HTMLAttributes<HTMLAnchorElement>, "onClick">
) => JSX.Element

/** react-obfuscate's text reversal, which it undoes visually with a right-to-left override. */
const reverse = (text: string) => text.split("").reverse().join("").replace("(", ")").replace(")", "(")

/**
 * An optional icon goes inside the link, so it takes the link's colour and hover box. react-obfuscate would render
 * the icon right to left too, so with an icon the number's reversal is applied to the number's own span and lifted
 * on the first hover or focus, as react-obfuscate does.
 */
const NumberLink = ({tel, icon, className}: {tel: string; icon?: ReactNode} & HTMLProps<HTMLAnchorElement>) => {
  const [revealed, setRevealed] = useState(false)

  if (!icon) return <ObfuscateLink tel={tel} className={className} />

  return (
    <ObfuscateLink
      tel={tel}
      className={className}
      obfuscateChildren={false}
      onMouseEnter={() => setRevealed(true)}
      onFocusCapture={() => setRevealed(true)}
    >
      <span className="whitespace-nowrap">{icon}&#65279;</span>
      {revealed ? tel : <span style={{unicodeBidi: "bidi-override", direction: "rtl"}}>{reverse(tel)}</span>}
    </ObfuscateLink>
  )
}
export default NumberLink
