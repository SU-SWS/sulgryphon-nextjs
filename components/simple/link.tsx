import Link from "next/link";

export const DrupalLink = ({href, children = null, buttonProps = null, ...props}) => {
  return (
    <Link href={href} passHref>
      <a href={href} {...props}>
        {children}
      </a>
    </Link>
  )
}

export const DrupalLinkButton = ({href, children = null, buttonProps = null, ...props}) => {
  return (
    <DrupalLink
      href={href}
      {...props}
      className={(props.className ?? '') + " su-cta-button su-font-regular su-leading-display su-block su-w-fit su-no-underline hover:su-underline focus:su-underline su-group su-transition-colors su-px-26 su-pt-10 su-pb-11 su-text-16 md:su-text-20 su-bg-digital-red hocus:su-bg-archway-dark su-text-white hocus:su-text-white su-border-2 su-border-digital-red su-border-solid hover:su-border-black focus:su-border-black su-rs-mt-neg1"}
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
      className={(props.className ?? '') + " su-cta-button su-font-regular su-leading-display su-block su-w-fit su-no-underline hover:su-underline focus:su-underline su-group su-transition-colors su-px-26 su-pt-10 su-pb-11 su-text-16 md:su-text-20 su-bg-digital-red hocus:su-bg-archway-dark su-text-white hocus:su-text-white su-border-2 su-border-digital-red su-border-solid hover:su-border-black focus:su-border-black su-rs-mt-neg1"}
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
      className={(props.className ?? '') + " su-cta-button su-font-regular su-leading-display su-block su-w-fit su-no-underline hover:su-underline focus:su-underline su-group su-transition-colors su-px-26 su-pt-10 su-pb-11 su-text-16 md:su-text-20 su-bg-digital-red hocus:su-bg-archway-dark su-text-white hocus:su-text-white su-border-2 su-border-digital-red su-border-solid hover:su-border-black focus:su-border-black su-rs-mt-neg1"}
    >
      {children}
    </DrupalLink>
  )
}
