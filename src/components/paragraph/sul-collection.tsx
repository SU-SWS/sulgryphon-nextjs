import {HTMLAttributes, useId} from "react"
import AboveHeaderBorder from "@/components/patterns/above-header-border"
import Card from "@/components/patterns/card"
import Oembed from "@/components/patterns/elements/oembed"
import Image from "next/image"
import {buildUrl} from "@/lib/drupal/utils"
import {Maybe, MediaImage, ParagraphCollectionCard, Link as LinkType} from "@/lib/gql/__generated__/drupal.d"
import {Tab, TabPanel, Tabs, TabsList} from "@/components/patterns/elements/tabs"

type Props = HTMLAttributes<HTMLDivElement> & {
  cards?: Maybe<ParagraphCollectionCard[]>
  heading?: Maybe<string>
}

const SulCollection = ({cards, heading, ...props}: Props) => {
  const elementId = useId()

  return (
    <section className="centered relative md:w-[124rem]" aria-labelledby={`${elementId}-heading`} {...props}>
      {heading && (
        <>
          <AboveHeaderBorder />
          <h2 id={`${elementId}-heading`}>{heading}</h2>
        </>
      )}
      <Tabs orientation="vertical" className="flex flex-col gap-lg md:flex-row">
        <TabsList className="md:w-1/3">
          {cards?.map(card => (
            <Tab
              key={card.id + "-tab"}
              className="mb-2 w-full cursor-pointer py-20 pl-10 text-left aria-selected:bg-archway aria-selected:text-white hocus:underline"
            >
              {card.sulCardInfo}
            </Tab>
          ))}
        </TabsList>

        <div className="md:w-2/3">
          {cards?.map(card => (
            <TabPanel key={card.id + "-panel"}>
              <CollectionCard
                header={card.sulCard?.suCardHeader}
                superHeader={card.sulCard?.suCardSuperHeader}
                body={card.sulCard?.suCardBody?.processed}
                link={card.sulCard?.suCardLink}
                image={card.sulCard?.suCardMedia?.__typename === "MediaImage" ? card.sulCard.suCardMedia : undefined}
                videoUrl={
                  card.sulCard?.suCardMedia?.__typename === "MediaVideo"
                    ? card.sulCard.suCardMedia.mediaOembedVideo
                    : undefined
                }
                headerId={card.sulCard?.id}
              />
            </TabPanel>
          ))}
        </div>
      </Tabs>
    </section>
  )
}

const CollectionCard = ({
  header,
  superHeader,
  body,
  link,
  image,
  videoUrl,
  headerId,
}: {
  header?: Maybe<string>
  superHeader?: Maybe<string>
  body?: Maybe<string>
  link?: Maybe<LinkType>
  image?: MediaImage
  videoUrl?: Maybe<string>
  headerId?: string
}) => {
  const imageUrl = image?.mediaImage.url
  const imageAlt = image?.mediaImage.alt || ""

  return (
    <Card
      headerId={headerId}
      video={videoUrl && <Oembed url={videoUrl} className="h-full" />}
      image={
        imageUrl && (
          <Image
            className="object-cover object-center"
            src={buildUrl(imageUrl).toString()}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 1500px"
          />
        )
      }
      header={header}
      superHeader={superHeader}
      body={body}
      link={link}
      headingLevel="h3"
    />
  )
}
export default SulCollection
