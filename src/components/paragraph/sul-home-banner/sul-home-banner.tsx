import {HTMLAttributes} from "react"
import {ParagraphSulHomeBanner} from "@/lib/gql/__generated__/drupal.d"
import {
  SulHomeBannerFormClient,
  SulHomeBannerRandomClient,
} from "@/components/paragraph/sul-home-banner/sul-home-banner.client"
import SulHomeImage from "@/components/paragraph/sul-home-image/sul-home-image"
import {twMerge} from "tailwind-merge"

type Props = HTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSulHomeBanner
}
const SulHomeBanner = ({paragraph, ...props}: Props) => {
  if (!paragraph.sulHomeImages) return
  return (
    <div {...props} className={twMerge("relative mb-50", props.className)}>
      <div className="absolute top-[15%] z-10 w-full sm:top-1/4">
        <div className="centered">
          <SulHomeBannerFormClient />
        </div>
      </div>
      <SulHomeBannerRandomClient>
        {paragraph.sulHomeImages.map(imageParagraph => (
          <SulHomeImage key={imageParagraph.id} paragraph={imageParagraph} />
        ))}
      </SulHomeBannerRandomClient>
    </div>
  )
}
export default SulHomeBanner
