import Link from "next/link";

const DrupalLink = ({href, children, ...props}) => {
  href = href.replace(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL, '');
  const Element = href.startsWith('/') ? Link : 'a';
  return (
    <Element href={href} {...props}>
      {children}
    </Element>
  )
}
export default DrupalLink as typeof Link;
