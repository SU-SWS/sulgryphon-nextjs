import Link from "next/link";
import {HTMLAttributes} from "react";
type Props = HTMLAttributes<HTMLAnchorElement> & {
  href: string
}
const DrupalLink = ({href, children, ...props}: Props) => {
  href = href.replace(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string, '');
  const prefetch = href.startsWith('/') || href.startsWith('https://library.stanford.edu');
  return (
    <Link href={href} prefetch={prefetch} rel={prefetch ? undefined : "nofollow"} {...props}>
      {children}
    </Link>
  )
}
export default DrupalLink as typeof Link;
