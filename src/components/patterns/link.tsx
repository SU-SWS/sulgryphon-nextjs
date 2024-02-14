import Link from "@/components/patterns/elements/drupal-link";
import {ChevronRightIcon} from "@heroicons/react/20/solid";
import {PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";

export const DrupalLinkButton = ({href, children, className = '', ...props}: PropsWithChildren<{href: string, className?: string}>) => {
  return (
    <Link
      href={href}
      {...props}
      className={twMerge("rounded-full cta-button font-semibold leading-display block w-fit no-underline hocus:underline group transition-colors px-26 pt-10 pb-11 text-16 md:text-20 bg-digital-red hover:bg-cardinal-red-dark focus:bg-black-true active:bg-black-true text-white hocus:text-white rs-mt-neg1", className)}
    >
      {children}
    </Link>
  )
}

export const DrupalLinkSecondaryButton = ({href, children, className = '', ...props}: PropsWithChildren<{href: string, className?: string}>) => {
  return (
    <Link
      href={href}
      {...props}
      className={twMerge("rounded-full cta-button font-semibold leading-display block w-fit no-underline hocus:underline border-3 border-digital-red border-solid hover:border-cardinal-red focus:border-black-true active:border-black-true group transition-colors px-26 pt-10 pb-11 text-16 md:text-20 bg-white hover:bg-cardinal-red active:bg-black-true focus:bg-black-true text-black hocus:text-white rs-mt-neg1", className)}
    >
      {children}
    </Link>
  )
}

export const DrupalLinkBigButton = ({href, children, className = '', ...props}: PropsWithChildren<{href: string, className?: string, }>) => {
  return (
    <Link
      href={href}
      {...props}
      className={twMerge("rounded-full cta-button font-large leading-display block w-fit no-underline hocus:underline group transition-colors px-36 py-16 text-16 md:text-20 bg-digital-red hover:bg-cardinal-red-dark focus:bg-black-true active:bg-black-true text-white hocus:text-white rs-mt-neg1", className)}
    >
      {children}
    </Link>
  )
}

export const DrupalActionLink = ({href, children, ...props}: PropsWithChildren<{href: string, className?: string}>) => {
  return (
    <Link
      href={href}
      {...props}
      className={'pt-10'}
    >
      <tspan  className={twMerge("relative pr-30 no-underline rs-mt-neg1 hover:bg-black-10 hover:text-brick hocus:underline focus:bg-black-true active:bg-black-true", props.className)}
      >
        {children}
        <ChevronRightIcon className="inline absolute top-0 right-0 h-full "/>
      </tspan>

    </Link>
  )
}

interface DrupalLinkProps extends PropsWithChildren<any> {
  url?: string
  title?: string
  style?: string
}


export const DrupalLink = ({url, title, style, children, ...props}: DrupalLinkProps) => {
  console.log(url);
  if (!url) {
    return null;
  }
  const LinkComponent = style === 'secondary_button' ? DrupalLinkSecondaryButton : (style === 'cta_button' ? DrupalActionLink : DrupalLinkButton);
  return (
    <LinkComponent href={url} {...props}>
      {title}
      {children}
    </LinkComponent>
  )
}
