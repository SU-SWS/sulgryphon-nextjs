import {DrupalImage} from "@/components/simple/image";
import {Oembed} from "@/components/simple/oembed";
import formatHtml from "@/lib/format-html";
import {DrupalLink, DrupalLinkButton} from "@/components/simple/link";

interface CardProps {
  video?: {
    src: string
    title: string
  }
  image?: {
    src: string
    alt: string
    height: number
    width: number
  };
  superHeader?: string
  header?: string
  body?: string
  link?: {
    url: string
    title: string
  }
  linkStyle?: string
  className?: string
}

export const Card = ({video, image, superHeader, header, body, link, linkStyle, ...props}: CardProps) => {

  return (
    <div {...props}
         className={`card su-block su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border su-border-solid su-border-black-10 su-shadow-md ${props.className ?? ''}`}>

      {image &&
          <div className="su-overflow-hidden su-aspect-[16/9] su-relative" aria-hidden="true">
              <DrupalImage
                  src={image.src}
                  alt={image.alt}
                  height={image.height}
                  width={image.width}
                  layout="responsive"
              />
          </div>
      }

      {video &&
          <div className="su-overflow-hidden su-aspect-[16/9] su-relative">
              <Oembed className="su-object-cover su-w-full su-h-full" src={video.src} title={video.title}/>
          </div>
      }

      <div className="su-flex su-flex-col card-body su-items-start su-rs-px-2 su-rs-pt-2 su-rs-pb-4">
        {superHeader &&
            <span
                className="su-type-0 su-mb-0 su-leading-display su-font-bold">{superHeader}</span>}
        {header &&
            <h3 className="su-leading-display su-font-sans su-font-bold su-type-2 su-mb-03em">{header}</h3>}
        {body && <div>{formatHtml(body)}</div>}

        {link && linkStyle !== 'action' &&
            <DrupalLinkButton href={link.url}>
              {link.title}
            </DrupalLinkButton>
        }
        {link && linkStyle === 'action' &&
            <DrupalLink href={link.url}>
              {link.title}
            </DrupalLink>
        }

      </div>
    </div>
  )

}