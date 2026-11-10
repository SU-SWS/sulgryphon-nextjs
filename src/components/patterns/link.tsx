import Link from "@/components/patterns/elements/drupal-link"
import {ChevronRightIcon, MapPinIcon} from "@heroicons/react/20/solid"
import {HTMLAttributes, JSX} from "react"
import cn from "@/lib/utils/className"
import {Link as LinkType} from "@/lib/gql/__generated__/graphql"
import {
  primaryButtonClasses,
  primaryButtonDarkBgClasses,
  secondaryButtonClasses,
  secondaryButtonDarkBgClasses,
} from "@/components/patterns/button-styles"

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
      className={cn(
        "cta-button btn--primary group rs-mt-neg1 block w-fit rounded-full px-26 pt-10 pb-11 text-16 leading-display font-semibold md:text-18",
        isDarkBg ? primaryButtonDarkBgClasses : primaryButtonClasses,
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
      className={cn(
        "cta-button btn--secondary group rs-mt-neg1 block w-fit rounded-full px-26 pt-10 pb-11 text-16 leading-display font-semibold md:text-18",
        isDarkBg ? secondaryButtonDarkBgClasses : secondaryButtonClasses,
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
      className={cn(
        "cta-button font-large group rs-mt-neg1 block w-fit rounded-full px-36 py-16 text-16 leading-display md:text-18",
        primaryButtonClasses,
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
      className={cn("rs-mt-neg1 link-cta", props.className)}
    >
      {children}
      <span className="whitespace-nowrap">
        &#65279;
        <ChevronRightIcon height={20} className="inline-block h-full" />
      </span>
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
      className={cn("relative link-inline", props.className)}
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
