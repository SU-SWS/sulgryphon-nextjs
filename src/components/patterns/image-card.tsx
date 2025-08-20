import Image from "next/image"
import Oembed from "@/components/patterns/elements/oembed"
import {ElementType, HTMLAttributes} from "react"
import {Maybe} from "@/lib/gql/__generated__/drupal.d"
import {twMerge} from "tailwind-merge"

type Props = HTMLAttributes<HTMLElement | HTMLDivElement> & {
  /**
   * Absolute image url path.
   */
  imageUrl?: Maybe<string>
  /**
   * Image alt string.
   */
  imageAlt?: Maybe<string>
  /**
   * Absolute url for the video, typically an oembed url.
   */
  videoUrl?: Maybe<string>
  /**
   * If the wrapper should be an article or a div, use an article if an appropriate heading is within the card.
   */
  isArticle?: Maybe<boolean>
}

const ImageCard = ({imageUrl, imageAlt, videoUrl, isArticle, children, ...props}: Props) => {
  const CardWrapper: ElementType = isArticle ? "article" : "div"

  return (
    <CardWrapper
      {...props}
      className={twMerge(
        "centered relative w-full border border-black-10 bg-white shadow-lg xl:max-w-[980px]",
        props.className
      )}
    >
      {imageUrl && (
        <div className="relative aspect-[16/9] w-full">
          <Image
            className="object-cover object-center"
            src={imageUrl}
            alt={imageAlt || ""}
            fill
            sizes="(max-width: 768px) 100vw, 1000px"
          />
        </div>
      )}

      {videoUrl && <Oembed url={videoUrl} />}

      <div className="flex flex-col gap-5 px-24 py-30">{children}</div>
    </CardWrapper>
  )
}

export const ImageCardSkeleton = () => {
  return (
    <div className="centered w-full border border-black-10 pb-20 shadow-lg xl:max-w-[980px]">
      <div className="aspect-[16/9] w-full bg-black-10"></div>
    </div>
  )
}

export default ImageCard
