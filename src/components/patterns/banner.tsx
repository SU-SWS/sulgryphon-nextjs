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
  headerId?: string
}

const Banner = ({headerId, image, header, superHeader, body, link, overlayPosition, ...props}: BannerProps) => {

  const hasCardText = header || superHeader || body || link;

  return (
    <div className="hero basefont-23 relative h-full mx-auto w-full lg:max-h-500" {...props}>
      <div
        className="w-full overflow-hidden relative max-h-500 min-h-[30rem] lg:min-h-[50rem] bg-[grey]">
        {image}
      </div>

      <Conditional showWhen={hasCardText}>
        <div
          className={`mx-auto block lg:absolute lg:top-auto lg:bottom-36 ${overlayPosition === 'right' ? 'lg:right-36' : 'lg:left-36'}`}>
          <div
            className="card basefont-23 leading-display bg-white text-black border border-solid border-black-10 shadow relative lg:max-w-[50%]">
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