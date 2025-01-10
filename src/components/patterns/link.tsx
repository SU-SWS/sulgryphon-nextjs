import Link from "@/components/patterns/elements/drupal-link"
import {ChevronRightIcon} from "@heroicons/react/20/solid"
import {HTMLAttributes, JSX} from "react"
import {twJoin, twMerge} from "tailwind-merge"
import {Link as LinkType} from "@/lib/gql/__generated__/drupal.d"

export const DrupalLinkButton = ({
  href,
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLAnchorElement> & {href: string; className?: string}) => {
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
}: HTMLAttributes<HTMLAnchorElement> & {
  href: string
  className?: string
}) => {
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
}: HTMLAttributes<HTMLAnchorElement> & {href: string; className?: string}) => {
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

export const DrupalActionLink = ({
  href,
  children,
  ...props
}: HTMLAttributes<HTMLAnchorElement> & {
  href: string
  className?: string
}) => {
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

type DrupalLinkProps = {
  url: string
  href: string
  title: LinkType["title"]
  linkStyle?: "secondary_button" | "cta_button" | string | null
  children?: JSX.Element | JSX.Element[]
  className: string
}

export const DrupalLink = ({url, title, linkStyle, children, ...props}: DrupalLinkProps) => {
  if (!url) {
    return null
  }
  const LinkComponent =
    linkStyle === "secondary_button"
      ? DrupalLinkSecondaryButton
      : linkStyle === "cta_button"
        ? DrupalActionLink
        : DrupalLinkButton
  return (
    <LinkComponent {...props}>
      {title}
      {children}
    </LinkComponent>
  )
}
