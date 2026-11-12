"use client"

import {Email} from "react-obfuscate-email"
import {HTMLProps, ReactNode} from "react"
import IconLinkContent from "@/components/patterns/elements/icon-link-content"

/** An optional icon goes inside the link, so it takes the link's colour and hover box (see IconLinkContent). */
const EmailLink = ({email, icon, ...props}: {email: string; icon?: ReactNode} & HTMLProps<HTMLAnchorElement>) => {
  return (
    <Email email={email} {...props}>
      {icon ? <IconLinkContent icon={icon}>{email}</IconLinkContent> : email}
    </Email>
  )
}
export default EmailLink
