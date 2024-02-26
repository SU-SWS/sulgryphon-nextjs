import {ReactNodeLike} from "prop-types";
import Card from "@/components/patterns/card";
import {Maybe, Link as LinkType} from "@/lib/gql/__generated__/drupal.d";
import {HTMLAttributes} from "react";

type BannerProps = HTMLAttributes<HTMLDivElement> & {
  image?: Maybe<ReactNodeLike>;
  superHeader?: Maybe<string>
  header?: Maybe<string>
  body?: Maybe<string>
  link?: Maybe<LinkType>
  overlayPosition?: Maybe<string>
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

      {(hasCardText) &&
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
      }
    </div>
  )
}
export default Banner;