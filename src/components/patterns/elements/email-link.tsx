"use client"

import {Email} from "react-obfuscate-email"
import {HTMLProps, ReactNode} from "react"

/**
 * An optional icon goes inside the link, so it takes the link's colour and hover box. It's kept on the first line
 * with the start of the address.
 */
const EmailLink = ({email, icon, ...props}: {email: string; icon?: ReactNode} & HTMLProps<HTMLAnchorElement>) => {
  return (
    <Email email={email} {...props}>
      {icon && <span className="whitespace-nowrap">{icon}&#65279;</span>}
      {email}
    </Email>
  )
}
export default EmailLink
