"use client";
import Obfuscate from 'react-obfuscate';

const TelephoneLink = ({tel, ...props}) => {
  return (
    <Obfuscate
      tel={tel}
      {...props}
    />
  )
}
export default TelephoneLink;