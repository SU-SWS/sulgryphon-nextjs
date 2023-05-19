"use client"

import {ImageGalleryParagraph} from "@/lib/drupal/drupal";
import Link from "next/link";
import Image from "next/image";
import Conditional from "@/components/utils/conditional";
import {DrupalLinkButton} from "@/components/patterns/link";
import Modal from "@/components/patterns/modals/modal";
import {useState} from "react";
import formatHtml from "@/lib/format-html";

interface StanfordImageGalleryProps {
  paragraph: ImageGalleryParagraph
  fullWidth?: boolean
}

const StanfordImageGallery = ({paragraph, fullWidth = true, ...props}: StanfordImageGalleryProps) => {
  const [modalOpen, setModalOpen] = useState('');

  return (
    <div className="su-relative su-centered" {...props}>
      {paragraph.su_gallery_headline && <h2 className="su-text-center su-type-5">{paragraph.su_gallery_headline}</h2>}
      {paragraph.su_gallery_description && <div>{formatHtml(paragraph.su_gallery_description)}</div>}

      <div className="su-mb-40 su-grid lg:su-grid-cols-3 su-gap-xl">
        {paragraph.su_gallery_images.map(image =>
          <figure key={image.id} className="su-table su-h-fit">
            <div className="su-aspect-[16/9] su-relative su-w-full">
              <Link href={image.su_gallery_image.image_style_uri.responsive_large} className=""
                    onClick={(e) => {
                      e.preventDefault();
                      setModalOpen(image.id)
                    }}>
                <Image
                  src={image.su_gallery_image.image_style_uri.cta_1x_596x397}
                  alt={image.su_gallery_image?.resourceIdObjMeta?.alt ?? ''}
                  fill
                  placeholder={image.su_gallery_image.uri.base64 ? 'blur' : 'empty'}
                  blurDataURL={image.su_gallery_image.uri.base64}
                  className="su-object-cover"
                />
              </Link>
            </div>

            {image.su_gallery_caption &&
              <figcaption className="su-table-caption su-caption-bottom su-text-right su-italic su-leading su-text-19">
                {formatHtml(image.su_gallery_caption)}
              </figcaption>
            }


            <Modal
              isOpen={modalOpen === image.id}
              onClose={() => setModalOpen('')}
              ariaLabel={image.su_gallery_image?.resourceIdObjMeta?.alt ?? ''}
            >
              <figure className="su-relative su-h-full su-w-full su-table">
                <div className="su-table-row su-relative su-h-full">
                  <Image
                    src={image.su_gallery_image.image_style_uri.breakpoint_2xl_2x}
                    alt={image.su_gallery_image?.resourceIdObjMeta?.alt ?? ''}
                    fill={true}
                    className="su-object-contain"
                  />
                </div>

                <Conditional showWhen={image.su_gallery_caption}>
                  <figcaption className="su-text-right su-table-caption su-caption-bottom su-w-full su-bg-white su-leading su-text-19 su-p-10 su-mt-10">
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
