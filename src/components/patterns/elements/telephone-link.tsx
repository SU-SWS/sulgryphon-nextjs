"use client"

import Obfuscate from "react-obfuscate"
import {HTMLAttributes} from "react"

const TelephoneLink = ({tel, ...props}: {tel: string} & Omit<HTMLAttributes<HTMLLinkElement>, "onClick">) => {
  return <Obfuscate tel={tel} {...props} />
}
export default TelephoneLink
