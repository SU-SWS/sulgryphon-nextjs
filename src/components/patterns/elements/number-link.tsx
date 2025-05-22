"use client"

import Obfuscate from "react-obfuscate"
import {HTMLProps} from "react"

const NumberLink = ({tel}: {tel: string} & HTMLProps<HTMLAnchorElement>) => {
  return <Obfuscate tel={tel} />
}
export default NumberLink
