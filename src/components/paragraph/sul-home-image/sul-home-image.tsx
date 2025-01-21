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
      <div className="relative h-400">
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
          <div className="centered">
            <div className="p-32 md:ml-auto md:w-[633px] md:bg-black md:bg-opacity-50 md:text-white">
              {paragraph.sulHomeImageCredits?.processed && (
                <div className="font-sans md:text-right [&_a]:md:text-white">
                  {formatHtml(paragraph.sulHomeImageCredits.processed)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default SulHomeImage
