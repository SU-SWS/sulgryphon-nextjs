import {HTMLAttributes} from "react"
import {ParagraphSulHomeImage} from "@/lib/gql/__generated__/drupal.d"
import Image from "next/image"
import formatHtml from "@/lib/format-html"
import Wave from "@/components/patterns/wave"

type Props = HTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSulHomeImage
}
const SulHomeImage = ({paragraph, ...props}: Props) => {
  return (
    <div {...props}>
      <div className="relative h-300 md:h-[40rem] lg:h-450 xl:h-[56rem] 2xl:h-[65rem]">
        <Image
          src={paragraph.sulHomeImage.mediaImage.url}
          alt={paragraph.sulHomeImage.mediaImage.alt || ""}
          fill
          sizes="100vw"
          className="object-cover"
          loading="eager"
        />
        <Wave className="absolute bottom-0 translate-y-1 -scale-x-100" />
      </div>
      {paragraph.sulHomeImageCredits && (
        <div className="bottom-50 w-full md:absolute">
          <div className="p-16 shadow-lg md:ml-auto md:w-[633px] md:bg-black md:bg-opacity-50 md:text-white md:shadow-none lg:p-24 xl:p-32">
            {paragraph.sulHomeImageCredits?.processed && (
              <div className="font-sans *:mb-0 md:text-right [&_a]:md:text-white">
                {formatHtml(paragraph.sulHomeImageCredits.processed)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default SulHomeImage
