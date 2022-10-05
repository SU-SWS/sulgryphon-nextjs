import Image from "next/image";


export const DrupalImage = ({src, alt= null, width= null, height= null, ...props}) => {
  let imgSrc = src.replace(/(^\/|\?.*?$)/g, '');

  imgSrc = imgSrc.indexOf(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL) >=0 ? imgSrc :`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${imgSrc}`;
  return (
    <Image
      src={imgSrc}
      width={`${width}px`}
      height={`${height}px`}
      alt={alt}
      {...props}
    />
  )
}