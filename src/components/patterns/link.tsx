import Link from "@/components/patterns/elements/drupal-link"
import {ChevronRightIcon} from "@heroicons/react/20/solid"
import {PropsWithChildren} from "react"
import {twJoin, twMerge} from "tailwind-merge"
import {Maybe} from "@/lib/gql/__generated__/drupal.d"

export const DrupalLinkButton = ({
  href,
  children,
  className = "",
  ...props
}: PropsWithChildren<{href: string; className?: string}>) => {
  return (
    <Link
      href={href}
      {...props}
      className={twJoin(
        "cta-button group rs-mt-neg1 block w-fit rounded-full bg-digital-red px-26 pb-11 pt-10 text-16 font-semibold leading-display text-white no-underline transition-colors hover:bg-cardinal-red-dark focus:bg-black-true active:bg-black-true hocus:text-white hocus:underline md:text-18",
        className
      )}
    >
      {children}
    </Link>
  )
}

export const DrupalLinkSecondaryButton = ({
  href,
  children,
  className = "",
  ...props
}: PropsWithChildren<{href: string; className?: string}>) => {
  return (
    <Link
      href={href}
      {...props}
      className={twMerge(
        "cta-button group rs-mt-neg1 block w-fit rounded-full border-3 border-solid border-digital-red bg-white px-26 pb-11 pt-10 text-16 font-semibold leading-display text-black no-underline transition-colors hover:border-cardinal-red hover:bg-cardinal-red focus:border-black-true focus:bg-black-true active:border-black-true active:bg-black-true hocus:text-white hocus:underline md:text-18",
        className
      )}
    >
      {children}
    </Link>
  )
}

export const DrupalLinkBigButton = ({
  href,
  children,
  className = "",
  ...props
}: PropsWithChildren<{href: string; className?: string}>) => {
  return (
    <Link
      href={href}
      {...props}
      className={twMerge(
        "cta-button font-large group rs-mt-neg1 block w-fit rounded-full bg-digital-red px-36 py-16 text-16 leading-display text-white no-underline transition-colors hover:bg-cardinal-red-dark focus:bg-black-true active:bg-black-true hocus:text-white hocus:underline md:text-18",
        className
      )}
    >
      {children}
    </Link>
  )
}

export const DrupalActionLink = ({href, children, ...props}: PropsWithChildren<{href: string; className?: string}>) => {
  return (
    <Link
      href={href}
      {...props}
      className={twMerge(
        "hocus:su-dark-brick rs-mt-neg1 relative pr-30 no-underline active:text-cardinal-red hocus:bg-black-10 hocus:underline",
        props.className
      )}
    >
      {children}
      <ChevronRightIcon className="absolute right-0 top-0 inline h-full" />
    </Link>
  )
}

interface DrupalLinkProps extends PropsWithChildren<any> {
  url?: Maybe<string>
  title?: Maybe<string>
  style?: Maybe<string>
}

export const DrupalLink = ({url, title, style, children, ...props}: DrupalLinkProps) => {
  if (!url) {
    return null
  }
  const LinkComponent =
    style === "secondary_button"
      ? DrupalLinkSecondaryButton
      : style === "cta_button"
        ? DrupalActionLink
        : DrupalLinkButton
  return (
    <LinkComponent href={url} {...props}>
      {title}
      {children}
    </LinkComponent>
  )
}
