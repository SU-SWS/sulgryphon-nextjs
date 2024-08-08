import Link from "next/link"
import {HTMLAttributes} from "react"

type Props = HTMLAttributes<HTMLAnchorElement> & {
  href: string
  prefetch?: boolean
}
const DrupalLink = ({href, children, prefetch, ...props}: Props) => {
  href = href.replace(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string, "")

  return (
    <Link href={href} prefetch={prefetch || false} rel={prefetch ? undefined : "nofollow"} {...props}>
      {children}
    </Link>
  )
}
export default DrupalLink as typeof Link
