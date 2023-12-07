"use client";
import {Email} from "react-obfuscate-email";
import {HTMLProps} from "react";

const EmailLink= ({email, ...props}:{ email: string } & HTMLProps<HTMLAnchorElement> ) => {
  return (
    <Email
      email={email}
      {...props}
    >
      {email}
    </Email>
  )
}
export default EmailLink;