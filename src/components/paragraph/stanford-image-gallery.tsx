"use client"

import {ImageGalleryParagraph} from "@/lib/drupal/drupal";
import Link from "@/components/patterns/elements/drupal-link";
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
    <div className="relative centered" {...props}>
      {paragraph.su_gallery_headline && <h2 className="text-center type-5">{paragraph.su_gallery_headline}</h2>}
      {paragraph.su_gallery_description && <div>{formatHtml(paragraph.su_gallery_description)}</div>}

      <div className="mb-40 grid lg:grid-cols-3 gap-xl">
        {paragraph.su_gallery_images.map(image =>
          <figure key={image.id} className="table h-fit">
            <div className="aspect-[16/9] relative w-full">
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
                  className="object-cover"
                />
              </Link>
            </div>

            {image.su_gallery_caption &&
              <figcaption className="table-caption caption-bottom text-right italic leading text-19">
                {formatHtml(image.su_gallery_caption)}
              </figcaption>
            }


            <Modal
              isOpen={modalOpen === image.id}
              onClose={() => setModalOpen('')}
              ariaLabel={image.su_gallery_image?.resourceIdObjMeta?.alt ?? ''}
              labelledBy={image.su_gallery_image.id}
            >
              <figure className="relative h-full w-full table">
                <div className="table-row relative h-full">
                  <Image
                    src={image.su_gallery_image.image_style_uri.breakpoint_2xl_2x}
                    alt={image.su_gallery_image?.resourceIdObjMeta?.alt ?? ''}
                    fill={true}
                    className="object-contain"
                  />
                </div>

                <Conditional showWhen={image.su_gallery_caption}>
                  <figcaption id={image.su_gallery_image.id} className="text-right table-caption caption-bottom w-full bg-white leading text-19 p-10 mt-10">
                    {image.su_gallery_caption}
                  </figcaption>
                </Conditional>
              </figure>
            </Modal>

          </figure>
        )}
      </div>

      {paragraph.su_gallery_button &&
        <DrupalLinkButton href={paragraph.su_gallery_button.url} className="block mx-auto" {...paragraph.su_gallery_button.options?.attributes}>
          {paragraph.su_gallery_button.title}
        </DrupalLinkButton>
      }
    </div>
  )
}
export default StanfordImageGallery;
