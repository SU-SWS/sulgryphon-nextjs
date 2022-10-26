import {useState} from "react";
import Image from "next/image";

import {ImageGalleryParagraph} from "../../types/drupal";
import formatHtml from "@/lib/format-html";
import {DrupalLink, DrupalLinkButton} from "@/components/simple/link";
import {Modal} from "@/components/simple/modal";

interface StanfordImageGalleryProps {
  paragraph: ImageGalleryParagraph
  siblingCount?: number
  className?: string
}

export const StanfordImageGallery = ({paragraph, siblingCount, ...props}: StanfordImageGalleryProps) => {
  const [modalOpen, setModalOpen] = useState(null);

  return (
    <div {...props} className={'su-max-w-[980px] su-mx-auto' + (props.className ?? '')}>
      {paragraph.su_gallery_headline && <h2 className="su-text-center su-text-m3">{paragraph.su_gallery_headline}</h2>}
      {paragraph.su_gallery_description && <div>{formatHtml(paragraph.su_gallery_description.processed)}</div>}

      <div className={`su-grid  su-gap-xl ` + (siblingCount >= 1 ? '' : 'lg:su-grid-cols-3')}>
        {paragraph.su_gallery_images.map(image =>
          <figure key={image.id} className="su-overflow-hidden su-aspect-[16/9] su-relative">
            <DrupalLink href={image.su_gallery_image.uri.url} className="su-block su-absolute" onClick={(e) => {e.preventDefault(); setModalOpen(image.id)}}>
              <Image
                src={image.su_gallery_image.image_style_uri.cta_1x_596x397}
                width={`711`}
                height={`400px`}
                alt={image.su_gallery_image.resourceIdObjMeta.alt}
                layout="intrinsic"
              />

            </DrupalLink>
            {image.su_gallery_caption &&
                <figcaption className="su-text-right">{formatHtml(image.su_gallery_caption)}</figcaption>}


            <Modal isOpen={modalOpen === image.id} onClose={() => setModalOpen(null)} title={image.su_gallery_image.resourceIdObjMeta.alt} description={image.su_gallery_caption}>
              <figure>
                <Image
                  src={image.su_gallery_image.image_style_uri.breakpoint_2xl_2x}
                  width={image.su_gallery_image.resourceIdObjMeta.width}
                  height={image.su_gallery_image.resourceIdObjMeta.height}
                  alt=""
                  layout="intrinsic"
                />
              </figure>
            </Modal>

          </figure>
        )}
      </div>

      {paragraph.su_gallery_button &&
          <DrupalLinkButton href={paragraph.su_gallery_button.url} className="su-block su-mx-auto">
            {paragraph.su_gallery_button.title}
          </DrupalLinkButton>
      }
    </div>
  )
}
