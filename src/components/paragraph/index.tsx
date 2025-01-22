import StanfordCard from "@/components/paragraph/stanford-card"
import StanfordBanner from "@/components/paragraph/stanford-banner"
import StanfordImageGallery from "@/components/paragraph/stanford-image-gallery"
import StanfordMediaCaption from "@/components/paragraph/stanford-media-caption"
import StanfordWysiwyg from "@/components/paragraph/stanford-wysiwyg"
import StanfordLists from "@/components/paragraph/stanford-lists"
import StanfordEntity from "@/components/paragraph/stanford-entity"
import StanfordSpacer from "@/components/paragraph/stanford-spacer"
import SulCollection from "@/components/paragraph/sul-collection"
import SulFeaturedCollection from "@/components/paragraph/sul-featured-collection"
import SulContactCard from "@/components/paragraph/sul-contact-card"
import SulButton from "@/components/paragraph/sul-button"
import {ElementType, HTMLAttributes, Suspense, useId} from "react"
import SulLibguides from "@/components/paragraph/sul-libguides"
import {ParagraphUnion, ParagraphInterface} from "@/lib/gql/__generated__/drupal.d"
import {ParagraphBehaviors} from "@/lib/drupal/drupal"
import EditorAlertBanner from "@/components/patterns/elements/editor-alert-banner"
import StanfordAccordionParagraph from "@/components/paragraph/stanford-accordion"
import SulHomeBanner from "@/components/paragraph/sul-home-banner/sul-home-banner"
import SulLocationHour from "@/components/paragraph/sul-location-hour/sul-location-hour"

type ParagraphProps = HTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphUnion
  fullWidth?: boolean
  singleRow?: boolean
}

const Paragraph = ({paragraph, ...props}: ParagraphProps) => {
  if (paragraph.status) {
    return <ParagraphComponent paragraph={paragraph} {...props} />
  }
  return (
    <EditorAlertBanner message="Unpublished Content">
      <ParagraphComponent paragraph={paragraph} {...props} />;
    </EditorAlertBanner>
  )
}

const ParagraphComponent = ({paragraph, singleRow = false, fullWidth = false, ...props}: ParagraphProps) => {
  const headerId = useId()
  const paragraphBehaviors = getParagraphBehaviors(paragraph)

  switch (paragraph.__typename) {
    case "ParagraphStanfordCard":
      return (
        <StanfordCard
          header={paragraph.suCardHeader}
          superHeader={paragraph.suCardSuperHeader}
          body={paragraph.suCardBody?.processed}
          link={paragraph.suCardLink}
          linkStyle={paragraphBehaviors?.sul_card_styles?.link_display_style}
          sprinklePosition={paragraphBehaviors?.sul_card_styles?.background_sprinkles}
          image={paragraph.suCardMedia?.__typename === "MediaImage" ? paragraph.suCardMedia : undefined}
          videoUrl={
            paragraph.suCardMedia?.__typename === "MediaVideo" ? paragraph.suCardMedia.mediaOembedVideo : undefined
          }
          orientation={paragraphBehaviors?.sul_card_styles?.orientation}
          singleRow={singleRow}
          headerId={headerId}
          fullWidth={fullWidth}
          headingTag={(paragraphBehaviors.su_card_styles?.heading?.replace(/\..*/, "") || "h2") as ElementType}
          hideHeading={paragraphBehaviors.su_card_styles?.hide_heading}
          {...props}
        />
      )

    case "ParagraphStanfordBanner":
      return (
        <StanfordBanner
          header={paragraph.suBannerHeader}
          superHeader={paragraph.suBannerSupHeader}
          body={paragraph.suBannerBody?.processed}
          link={paragraph.suBannerButton}
          image={paragraph.suBannerImage}
          overlayPosition={paragraphBehaviors?.hero_pattern?.overlay_position}
          headerId={headerId}
          headingTag={(paragraphBehaviors.hero_pattern?.heading?.replace(/\..*/, "") || "h2") as ElementType}
          hideHeading={paragraphBehaviors.hero_pattern?.hide_heading}
          {...props}
        />
      )

    case "ParagraphStanfordGallery":
      return <StanfordImageGallery paragraph={paragraph} {...props} />

    case "ParagraphStanfordMediaCaption":
      return (
        <StanfordMediaCaption
          caption={paragraph.suMediaCaptionCaption?.processed}
          link={paragraph.suMediaCaptionLink}
          image={paragraph.suMediaCaptionMedia?.__typename === "MediaImage" ? paragraph.suMediaCaptionMedia : undefined}
          videoUrl={
            paragraph.suMediaCaptionMedia?.__typename === "MediaVideo"
              ? paragraph.suMediaCaptionMedia.mediaOembedVideo
              : undefined
          }
          {...props}
        />
      )

    case "ParagraphStanfordWysiwyg":
      return <StanfordWysiwyg text={paragraph.suWysiwygText?.processed} {...props} />

    case "ParagraphStanfordList":
      return (
        <Suspense>
          <StanfordLists paragraph={paragraph} />
        </Suspense>
      )

    case "ParagraphStanfordEntity":
      return (
        <StanfordEntity
          headline={paragraph.suEntityHeadline}
          description={paragraph.suEntityDescription?.processed}
          link={paragraph.suEntityButton}
          entities={paragraph.suEntityItem || []}
          styles={paragraphBehaviors?.sul_teaser_styles}
          headerId={headerId}
          headingBehavior={paragraphBehaviors.stanford_teaser?.heading_behavior}
          {...props}
        />
      )

    case "ParagraphStanfordSpacer":
      return <StanfordSpacer size={paragraph.suSpacerSize} />

    case "ParagraphCollection":
      return <SulCollection cards={paragraph.sulCollectionCard} heading={paragraph.sulCollectionHeading} {...props} />

    case "ParagraphSulFeatCollection":
      return (
        <SulFeaturedCollection
          headline={paragraph.sulCollectionHeadline}
          link={paragraph.sulCollectionLink}
          cards={paragraph.sulCollectionCards}
          styles={paragraphBehaviors?.sul_feat_collections_styles}
          headerId={headerId}
          fullWidth={fullWidth}
          {...props}
        />
      )

    case "ParagraphSulContactCard":
      return <SulContactCard paragraph={paragraph} {...props} />

    case "ParagraphSulButton":
      return (
        <SulButton
          headline={paragraph.sulButtonHeadline}
          link={paragraph.sulButtonLink}
          styles={paragraphBehaviors?.sul_button_styles}
          headerId={headerId}
          fullWidth={fullWidth}
          {...props}
        />
      )

    case "ParagraphSulLibguide":
      return (
        <SulLibguides
          headline={paragraph.sulLibguideHeadline}
          description={paragraph.sulLibguideDesc?.processed}
          libguideId={paragraph.sulLibguideId}
          {...props}
        />
      )

    case "ParagraphStanfordFaq":
      return <StanfordAccordionParagraph paragraph={paragraph} {...props} />

    case "ParagraphSulHomeBanner":
      return <SulHomeBanner paragraph={paragraph} {...props} />

    case "ParagraphSulLocationHour":
      return <SulLocationHour paragraph={paragraph} {...props} />

    default:
      console.warn(`Unknown paragraph ${paragraph.__typename}.`)
      return null
  }
}

export const getParagraphBehaviors = <T extends ParagraphBehaviors>(paragraph: ParagraphInterface): T => {
  if (paragraph.behaviors) return JSON.parse(paragraph.behaviors) as T
  return {} as T
}

export default Paragraph
