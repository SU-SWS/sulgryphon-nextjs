"use client"

import {ImageGalleryParagraph} from "../../../src/types/drupal";
import Link from "next/link";
import Image from "next/image";
import Conditional from "../utils/conditional";
import {DrupalLinkButton} from "../patterns/link";
import Modal from "../patterns/modal";
import {useState} from "react";
import formatHtml from "../../lib/format-html";


interface StanfordImageGalleryProps {
  paragraph: ImageGalleryParagraph
  siblingCount?: number
  className?: string
}

const StanfordImageGallery = ({paragraph, siblingCount = 0, ...props}: StanfordImageGalleryProps) => {
  const [modalOpen, setModalOpen] = useState('');

  return (
    <div {...props} className={'su-max-w-[980px] su-mx-auto' + (props.className ?? '')}>
      {paragraph.su_gallery_headline && <h2 className="su-text-center su-text-m3">{paragraph.su_gallery_headline}</h2>}
      {paragraph.su_gallery_description && <div>{formatHtml(paragraph.su_gallery_description.processed)}</div>}

      <div className={`su-mb-40 su-grid su-gap-xl ` + (siblingCount >= 1 ? '' : 'lg:su-grid-cols-3')}>
        {paragraph.su_gallery_images.map(image =>
          <figure key={image.id} className="su-overflow-hidden su-aspect-[16/9] su-relative">
            <Link href={image.su_gallery_image.uri.url} className="su-block su-absolute" onClick={(e) => {
              e.preventDefault();
              setModalOpen(image.id)
            }}>
              <Image
                src={image.su_gallery_image.image_style_uri.cta_1x_596x397}
                width={`711`}
                height={`400`}
                alt={image.su_gallery_image?.resourceIdObjMeta?.alt ?? ''}
              />

            </Link>
            {image.su_gallery_caption &&
                <figcaption className="su-text-right">{formatHtml(image.su_gallery_caption)}</figcaption>}


            <Modal
              isOpen={modalOpen === image.id}
              onClose={() => setModalOpen('')}
              ariaLabel={image.su_gallery_image?.resourceIdObjMeta?.alt ?? ''}
            >
              <figure className="su-h-full su-relative">
                <Image
                  src={image.su_gallery_image.image_style_uri.breakpoint_2xl_2x}
                  alt={image.su_gallery_image?.resourceIdObjMeta?.alt ?? ''}
                  fill={true}
                  className="su-mx-auto su-block su-max-h-full su-object-contain"
                />

                <Conditional showWhen={image.su_gallery_caption}>
                  <figcaption className="su-absolute su-z-[100] su-text-white">
                    {image.su_gallery_caption}
                  </figcaption>
                </Conditional>
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
export default StanfordImageGallery;
