import Link from "@/components/patterns/elements/drupal-link"
import {ChevronRightIcon, MapPinIcon} from "@heroicons/react/20/solid"
import {HTMLAttributes, JSX} from "react"
import {twMerge} from "tailwind-merge"
import {clsx} from "clsx"
import {Link as LinkType} from "@/lib/gql/__generated__/drupal.d"

export const DrupalLinkButton = ({
  href,
  children,
  className = "",
  isDarkBg,
  ...props
}: HTMLAttributes<HTMLAnchorElement> & {href: string; isDarkBg?: boolean; className?: string}) => {
  return (
    <Link
      href={href}
      {...props}
      className={clsx(
        "cta-button btn--primary group rs-mt-neg1 block w-fit rounded-full px-26 pb-11 pt-10 text-16 font-semibold leading-display text-white no-underline transition-colors hocus:underline md:text-18",
        {
          "border-2 border-white bg-transparent text-white hover:bg-white hover:text-digital-red focus:bg-black-true focus:text-white":
            isDarkBg,
          "bg-digital-red hover:bg-cardinal-red-dark focus:bg-black-true active:bg-black-true hocus:text-white":
            !isDarkBg,
        },
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
  isDarkBg,
  ...props
}: HTMLAttributes<HTMLAnchorElement> & {
  href: string
  isDarkBg?: boolean
  className?: string
}) => {
  return (
    <Link
      href={href}
      {...props}
      className={clsx(
        "cta-button btn--secondary group rs-mt-neg1 block w-fit rounded-full border-3 border-solid border-digital-red bg-white px-26 pb-11 pt-10 text-16 font-semibold leading-display text-digital-red no-underline transition-colors hocus:text-white hocus:underline md:text-18",
        {
          "hover:border-cardinal-red-xdark hover:bg-digital-red focus:border-white focus:bg-black-true focus:text-white":
            isDarkBg,
          "hover:border-cardinal-red hover:bg-cardinal-red focus:border-black-true focus:bg-black-true active:border-black-true active:bg-black-true":
            !isDarkBg,
        },
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
  title,
  ...props
}: HTMLAttributes<HTMLAnchorElement> & {
  href: string
  className?: string
}) => {
  // Don't include title if title is part of the display text
  const shouldIncludeTitle =
    title &&
    !(
      typeof children === "string" &&
      (children.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(children.toLowerCase()))
    )
  return (
    <Link
      {...props}
      href={href}
      title={shouldIncludeTitle ? title : undefined}
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

export const DrupalLocationLink = ({
  href,
  children,
  title,
  ...props
}: HTMLAttributes<HTMLAnchorElement> & {
  href: string
  className?: string
}) => {
  // Don't include title if title is part of the display text
  const shouldIncludeTitle =
    title &&
    !(
      typeof children === "string" &&
      (children.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(children.toLowerCase()))
    )
  return (
    <Link
      {...props}
      href={href}
      title={shouldIncludeTitle ? title : undefined}
      className={twMerge(
        "hocus:su-dark-brick relative underline active:text-cardinal-red hocus:bg-black-10",
        props.className
      )}
    >
      <MapPinIcon title="Location" width={20} className="my-auto mr-10 inline-block h-fit" />
      {children}
    </Link>
  )
}

type DrupalLinkProps = Omit<HTMLAttributes<HTMLAnchorElement>, "title"> & {
  url: string
  title: LinkType["title"]
  linkStyle?: "secondary_button" | "cta_button" | string | null
  children?: JSX.Element | JSX.Element[] | string
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
    <LinkComponent href={url} {...props}>
      {title}
      {children}
    </LinkComponent>
  )
}
