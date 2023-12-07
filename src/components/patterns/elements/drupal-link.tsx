import Link from "next/link";

const DrupalLink = ({href, children, ...props}) => {
  href = href.replace(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL, '');
  const prefetch = href.startsWith('/') || href.startsWith('https://library.stanford.edu');
  return (
    <Link href={href} prefetch={prefetch} rel={prefetch ? undefined : "nofollow"} {...props}>
      {children}
    </Link>
  )
}
export default DrupalLink as typeof Link;
