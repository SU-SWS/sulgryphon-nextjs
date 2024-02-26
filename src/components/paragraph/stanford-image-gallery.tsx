"use client"

import Link from "@/components/patterns/elements/drupal-link";
import Image from "next/image";
import {DrupalLinkButton} from "@/components/patterns/link";
import Modal from "@/components/patterns/modals/modal";
import {HTMLAttributes, useState} from "react";
import formatHtml from "@/lib/format-html";
import {buildUrl} from "@/lib/drupal/utils";
import {ParagraphStanfordGallery} from "@/lib/gql/__generated__/drupal.d";

type StanfordImageGalleryProps = HTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordGallery
}

const StanfordImageGallery = ({paragraph, ...props}: StanfordImageGalleryProps) => {
  const [modalOpen, setModalOpen] = useState('');

  return (
    <div className="relative centered" {...props}>
      {paragraph.suGalleryHeadline && <h2 className="text-center type-5">{paragraph.suGalleryHeadline}</h2>}
      {paragraph.suGalleryDescription && <div>{formatHtml(paragraph.suGalleryDescription.processed)}</div>}

      {paragraph.suGalleryImages &&
        <div className="mb-40 grid lg:grid-cols-3 gap-xl">
          {paragraph.suGalleryImages.map(image => {
              if (!image.suGalleryImage?.url) return;
              return (
                <figure key={image.id} className="table h-fit">
                  <div className="aspect-[16/9] relative w-full">
                    <Link href={buildUrl(image.suGalleryImage?.url).toString()} className=""
                          onClick={(e) => {
                            e.preventDefault();
                            setModalOpen(image.id)
                          }}>
                      <Image
                        src={buildUrl(image.suGalleryImage.url).toString()}
                        alt={image.suGalleryImage.alt || ''}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px"
                        className="object-cover"
                      />
                    </Link>
                  </div>

                  {image.suGalleryCaption &&
                    <figcaption className="table-caption caption-bottom text-right italic leading text-19">
                      {formatHtml(image.suGalleryCaption)}
                    </figcaption>
                  }


                  <Modal
                    isOpen={modalOpen === image.id}
                    onClose={() => setModalOpen('')}
                    ariaLabel={image.suGalleryImage?.alt || ''}
                    labelledBy={image.id}
                  >
                    <figure className="relative h-full w-full table">
                      <div className="table-row relative h-full">
                        <Image
                          src={buildUrl(image.suGalleryImage.url).toString()}
                          alt={image.suGalleryImage?.alt || ''}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px"
                          className="object-contain"
                        />
                      </div>

                      {(image.suGalleryCaption) &&
                        <figcaption id={image.id}
                                    className="text-right table-caption caption-bottom w-full bg-white leading text-19 p-10 mt-10">
                          {image.suGalleryCaption}
                        </figcaption>
                      }
                    </figure>
                  </Modal>

                </figure>
              )
            }
          )}
        </div>
      }

      {paragraph.suGalleryButton?.url &&
        <DrupalLinkButton
          href={paragraph.suGalleryButton.url}
          className="block mx-auto"
          aria-label={paragraph.suGalleryButton.attributes?.ariaLabel}
        >
          {paragraph.suGalleryButton.title}
        </DrupalLinkButton>
      }
    </div>
  )
}
export default StanfordImageGallery;
