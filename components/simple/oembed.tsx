export const Oembed = ({src, title = null, ...props}) => {
  const iframeSrc = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + '/media/oembed?url=' + src;
  return (
    <iframe src={iframeSrc} title={title} {...props} />
  )
}