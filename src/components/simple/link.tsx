import Link from "next/link";
import {ChevronRightIcon} from "@heroicons/react/20/solid";

export const DrupalLink = ({href, children = null, buttonProps = null, ...props}) => {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}

export const DrupalLinkButton = ({href, children = null, buttonProps = null, ...props}) => {
  return (
    <DrupalLink
      href={href}
      {...props}
      className={(props.className ?? '') + " su-rounded-full su-cta-button su-font-regular su-leading-display su-block su-w-fit su-no-underline hocus:su-underline su-group su-transition-colors su-px-26 su-pt-10 su-pb-11 su-text-16 md:su-text-20 su-bg-digital-red hover:su-bg-cardinal-red-dark focus:su-bg-black-true active:su-bg-black-true su-text-white hocus:su-text-white su-rs-mt-neg1"}
    >
      {children}
    </DrupalLink>
  )
}

export const DrupalLinkSecondaryButton = ({href, children = null, buttonProps = null, ...props}) => {
  return (
    <DrupalLink
      href={href}
      {...props}
      className={(props.className ?? '') + " su-rounded-full su-cta-button su-font-regular su-leading-display su-block su-w-fit su-no-underline hocus:su-underline su-border-3 su-border-digital-red su-border-solid hover:su-border-cardinal-red focus:su-border-black-true active:su-border-black-true su-group su-transition-colors su-px-26 su-pt-10 su-pb-11 su-text-16 md:su-text-20 su-bg-white hover:su-bg-cardinal-red active:su-bg-black-true focus:su-bg-black-true su-text-black hocus:su-text-white su-rs-mt-neg1"}
    >
      {children}
    </DrupalLink>
  )
}

export const DrupalLinkBigButton = ({href, children = null, buttonProps = null, ...props}) => {
  return (
    <DrupalLink
      href={href}
      {...props}
      className={(props.className ?? '') + " su-rounded-full su-cta-button su-font-large su-leading-display su-block su-w-fit su-no-underline hocus:su-underline su-group su-transition-colors su-px-36 su-py-16 su-text-16 md:su-text-20 su-bg-digital-red hover:su-bg-cardinal-red-dark focus:su-bg-black-true active:su-bg-black-true su-text-white hocus:su-text-white su-rs-mt-neg1"}
    >
      {children}
    </DrupalLink>
  )
}

export const DrupalActionLink = ({href, children = null, buttonProps = null, ...props}) => {
  return (
    <DrupalLink
      href={href}
      {...props}
      className={(props.className ?? '') + " su-relative su-pr-30 hocus:su-text-brick su-no-underline"}
    >
      {children}
      <ChevronRightIcon className="su-inline su-h-full su-absolute su-top-0 su-right-0 su-h-full"/>
    </DrupalLink>
  )
}
