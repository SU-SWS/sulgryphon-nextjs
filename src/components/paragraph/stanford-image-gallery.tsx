"use client"

import Link from "@/components/patterns/elements/drupal-link"
import Image from "next/image"
import {DrupalLinkButton} from "@/components/patterns/link"
import Modal from "@/components/patterns/modals/modal"
import {HTMLAttributes, useState} from "react"
import formatHtml from "@/lib/format-html"
import {buildUrl} from "@/lib/drupal/utils"
import {ParagraphStanfordGallery} from "@/lib/gql/__generated__/drupal.d"

type StanfordImageGalleryProps = HTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordGallery
}

const StanfordImageGallery = ({paragraph, ...props}: StanfordImageGalleryProps) => {
  const [modalOpen, setModalOpen] = useState("")

  return (
    <div className="centered relative" {...props}>
      {paragraph.suGalleryHeadline && <h2 className="type-5 text-center">{paragraph.suGalleryHeadline}</h2>}
      {paragraph.suGalleryDescription && <div>{formatHtml(paragraph.suGalleryDescription.processed)}</div>}

      {paragraph.suGalleryImages && (
        <div className="mb-40 grid gap-xl lg:grid-cols-3">
          {paragraph.suGalleryImages.map(image => {
            if (!image.suGalleryImage?.url) return
            return (
              <figure key={image.id} className="table h-fit">
                <div className="relative aspect-[16/9] w-full">
                  <Link
                    href={buildUrl(image.suGalleryImage?.url).toString()}
                    className=""
                    onClick={e => {
                      e.preventDefault()
                      setModalOpen(image.id)
                    }}
                  >
                    <Image
                      src={buildUrl(image.suGalleryImage.url).toString()}
                      alt={image.suGalleryImage.alt || ""}
                      fill
                      sizes="(max-width: 1700px) 100vw, 1500px"
                      className="object-cover"
                    />
                  </Link>
                </div>

                {image.suGalleryCaption && (
                  <figcaption className="table-caption caption-bottom text-right text-16 italic leading">
                    {formatHtml(image.suGalleryCaption)}
                  </figcaption>
                )}

                <Modal
                  isOpen={modalOpen === image.id}
                  onClose={() => setModalOpen("")}
                  ariaLabel={image.suGalleryImage?.alt || ""}
                  labelledBy={image.id}
                >
                  <figure className="relative table h-full w-full">
                    <div className="relative table-row h-full">
                      <Image
                        src={buildUrl(image.suGalleryImage.url).toString()}
                        alt={image.suGalleryImage?.alt || ""}
                        fill
                        sizes="(max-width: 1700px) 100vw, 1500px"
                        className="object-contain"
                      />
                    </div>

                    {image.suGalleryCaption && (
                      <figcaption
                        id={image.id}
                        className="mt-10 table-caption w-full caption-bottom bg-white p-10 text-right text-19 leading"
                      >
                        {image.suGalleryCaption}
                      </figcaption>
                    )}
                  </figure>
                </Modal>
              </figure>
            )
          })}
        </div>
      )}

      {paragraph.suGalleryButton?.url && (
        <DrupalLinkButton
          href={paragraph.suGalleryButton.url}
          className="mx-auto block"
          aria-label={paragraph.suGalleryButton.attributes?.ariaLabel || undefined}
        >
          {paragraph.suGalleryButton.title}
        </DrupalLinkButton>
      )}
    </div>
  )
}
export default StanfordImageGallery
