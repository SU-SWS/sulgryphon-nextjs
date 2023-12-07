"use client";

// @ts-ignore
import Obfuscate from 'react-obfuscate';
import {HTMLProps} from "react";

const TelephoneLink = ({tel, ...props}: { tel: string } & HTMLProps<HTMLLinkElement>) => {
  return (
    <Obfuscate
      tel={tel}
      {...props}
    />
  )
}
export default TelephoneLink;