import {ReactNodeLike} from "prop-types";
import Conditional from "@/components/utils/conditional";
import Card from "@/components/patterns/card";
import {DrupalLinkType} from "@/lib/drupal/drupal";

interface BannerProps {
  image?: ReactNodeLike;
  superHeader?: string
  header?: string
  body?: string
  link?: DrupalLinkType
  overlayPosition?: string
  className?: string
  fullWidth?: boolean
  headerId?: string
}

const Banner = ({headerId, image, header, superHeader, body, link, overlayPosition, fullWidth = true, ...props}: BannerProps) => {

  const hasCardText = header || superHeader || body || link;

  return (
    <div className="hero su-basefont-23 su-relative su-h-full su-mx-auto su-w-full lg:su-max-h-500" {...props}>
      <div
        className="su-w-full su-overflow-hidden su-relative su-max-h-500 su-min-h-[30rem] lg:su-min-h-[50rem] su-bg-[grey]">
        {image}
      </div>

      <Conditional showWhen={hasCardText}>
        <div
          className={`su-mx-auto su-block lg:su-absolute lg:su-top-auto lg:su-bottom-36 ${overlayPosition === 'right' ? 'lg:su-right-36' : 'lg:su-left-36'}`}>
          <div
            className="card su-basefont-23 su-leading-display su-bg-white su-text-black su-border su-border-solid su-border-black-10 su-shadow su-relative lg:su-max-w-[50%]">
            <Card
              header={header}
              superHeader={superHeader}
              body={body}
              link={link}
              headerId={headerId}
            />
          </div>
        </div>
      </Conditional>
    </div>
  )
}
export default Banner;