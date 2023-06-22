"use client";
import { Email } from "react-obfuscate-email";

const EmailLink = ({email, ...props}) => {
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