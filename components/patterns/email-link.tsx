"use client";
import Obfuscate from 'react-obfuscate';

const EmailLink = ({email, ...props}) => {
  return (
    <Obfuscate
      email={email}
      {...props}
    />
  )
}
export default EmailLink;