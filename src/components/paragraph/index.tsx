import StanfordCard from "@/components/paragraph/stanford-card";
import StanfordBanner from "@/components/paragraph/stanford-banner";
import StanfordImageGallery from "@/components/paragraph/stanford-image-gallery";
import StanfordMediaCaption from "@/components/paragraph/stanford-media-caption";
import StanfordWysiwyg from "@/components/paragraph/stanford-wysiwyg";
import StanfordLists from "@/components/paragraph/stanford-lists";
import StanfordEntity from "@/components/paragraph/stanford-entity";
import StanfordSpacer from "@/components/paragraph/stanford-spacer";
import SulCollection from "@/components/paragraph/sul-collection";
import SulFeaturedCollection from "@/components/paragraph/sul-featured-collection";
import SulContactCard from "@/components/paragraph/sul-contact-card";
import SulButton from "@/components/paragraph/sul-button";
import {HTMLAttributes, Suspense, useId} from "react";
import SulLibguides from "@/components/paragraph/sul-libguides";
import {ParagraphUnion} from "@/lib/gql/__generated__/drupal.d";
import {ParagraphBehaviors} from "@/lib/drupal/drupal";

type ParagraphProps = HTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphUnion;
  fullWidth?: boolean;
  singleRow?: boolean;
}

const Paragraph = ({paragraph, singleRow = false, fullWidth = false, ...props}: ParagraphProps) => {
  const headerId = useId();

  const paragraphBehaviors = getParagraphBehaviors(paragraph);
  return (
    <>
      {paragraph.__typename === 'ParagraphStanfordCard' &&
        <StanfordCard
          header={paragraph.suCardHeader}
          superHeader={paragraph.suCardSuperHeader}
          body={paragraph.suCardBody?.processed}
          link={paragraph.suCardLink}
          linkStyle={paragraphBehaviors?.sul_card_styles?.link_display_style}
          sprinklePosition={paragraphBehaviors?.sul_card_styles?.background_sprinkles}
          image={paragraph.suCardMedia?.__typename === 'MediaImage' ? paragraph.suCardMedia : undefined}
          videoUrl={paragraph.suCardMedia?.__typename === 'MediaVideo' ? paragraph.suCardMedia.mediaOembedVideo : undefined}
          orientation={paragraphBehaviors?.sul_card_styles?.orientation}
          singleRow={singleRow}
          headerId={headerId}
          fullWidth={fullWidth}
          {...props}
        />}

      {paragraph.__typename === 'ParagraphStanfordBanner' &&
        <StanfordBanner
          header={paragraph.suBannerHeader}
          superHeader={paragraph.suBannerSupHeader}
          body={paragraph.suBannerBody?.processed}
          link={paragraph.suBannerButton}
          image={paragraph.suBannerImage}
          overlayPosition={paragraphBehaviors?.hero_pattern?.overlay_position}
          headerId={headerId}
          {...props}
        />
      }

      {paragraph.__typename === 'ParagraphStanfordGallery' &&
        <StanfordImageGallery paragraph={paragraph} {...props}/>}

      {paragraph.__typename === 'ParagraphStanfordMediaCaption' &&
        <StanfordMediaCaption
          caption={paragraph.suMediaCaptionCaption?.processed}
          link={paragraph.suMediaCaptionLink}
          image={paragraph.suMediaCaptionMedia?.__typename === 'MediaImage' ? paragraph.suMediaCaptionMedia: undefined}
          videoUrl={paragraph.suMediaCaptionMedia?.__typename === 'MediaVideo' ? paragraph.suMediaCaptionMedia.mediaOembedVideo: undefined}
          {...props}
        />
      }

      {paragraph.__typename === 'ParagraphStanfordWysiwyg' &&
        <StanfordWysiwyg text={paragraph.suWysiwygText?.processed} {...props}/>}

      {paragraph.__typename === 'ParagraphStanfordList' &&
        <Suspense>
          <StanfordLists
            headline={paragraph.suListHeadline}
            description={paragraph.suListDescription?.processed}
            link={paragraph.suListButton}
            view={paragraph.suListView}
            behaviors={paragraphBehaviors}
            headerId={headerId}
            uuid={paragraph.id}
            {...props}
          />
        </Suspense>
      }

      {paragraph.__typename === 'ParagraphStanfordEntity' &&
        <StanfordEntity
          headline={paragraph.suEntityHeadline}
          description={paragraph.suEntityDescription?.processed}
          link={paragraph.suEntityButton}
          entities={paragraph.suEntityItem || []}
          styles={paragraphBehaviors?.sul_teaser_styles}
          headerId={headerId}
          {...props}
        />
      }

      {paragraph.__typename === 'ParagraphStanfordSpacer' && <StanfordSpacer size={paragraph.suSpacerSize}/>}

      {paragraph.__typename === 'ParagraphCollection' &&
        <SulCollection
          cards={paragraph.sulCollectionCard}
          heading={paragraph.sulCollectionHeading}
          {...props}
        />
      }

      {paragraph.__typename === 'ParagraphSulFeatCollection' &&
        <SulFeaturedCollection
          headline={paragraph.sulCollectionHeadline}
          link={paragraph.sulCollectionLink}
          cards={paragraph.sulCollectionCards}
          styles={paragraphBehaviors?.sul_feat_collections_styles}
          headerId={headerId}
          fullWidth={fullWidth}
          {...props}
        />
      }

      {paragraph.__typename === 'ParagraphSulContactCard' &&
        <SulContactCard paragraph={paragraph} {...props}/>}

      {paragraph.__typename === 'ParagraphSulButton' &&
        <SulButton
          headline={paragraph.sulButtonHeadline}
          link={paragraph.sulButtonLink}
          styles={paragraphBehaviors?.sul_button_styles}
          headerId={headerId}
          fullWidth={fullWidth}
          {...props}
        />
      }

      {paragraph.__typename === 'ParagraphSulLibguide' &&
        <SulLibguides
          headline={paragraph.sulLibguideHeadline}
          description={paragraph.sulLibguideDesc?.processed}
          libguideId={paragraph.sulLibguideId}
          {...props}
        />
      }
    </>
  );
}

export const getParagraphBehaviors = (paragraph: ParagraphUnion): ParagraphBehaviors => {
  if (paragraph.behaviors) return JSON.parse(paragraph.behaviors)
  return {}
}

export default Paragraph;