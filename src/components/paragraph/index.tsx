import Conditional from "@/components/utils/conditional";
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
import {PropsWithoutRef, useId} from "react";
import SulLibguides from "@/components/paragraph/sul-libguides";
import UnpublishedBanner from "@/components/patterns/unpublished-banner";

interface ParagraphProps extends PropsWithoutRef<any> {
  paragraph: any;
  fullWidth?: boolean;
  singleRow?: boolean;
}

const Paragraph = ({paragraph, singleRow = false, ...props}: ParagraphProps) => {
  props['data-type'] = paragraph.type;
  props['data-id'] = paragraph.id;
  const headerId = useId();

  return (
    <>
      <Conditional showWhen={paragraph.status != undefined && !paragraph.status}>
        <UnpublishedBanner/>
      </Conditional>

      {paragraph.type === 'paragraph--stanford_card' &&
        <StanfordCard
          header={paragraph.su_card_header}
          superHeader={paragraph.su_card_super_header}
          body={paragraph.su_card_body}
          link={paragraph.su_card_link}
          linkStyle={paragraph.behavior_settings?.sul_card_styles?.link_display_style}
          sprinklePosition={paragraph.behavior_settings?.sul_card_styles?.background_sprinkles}
          image={paragraph?.su_card_media?.field_media_image}
          videoUrl={paragraph?.su_card_media?.field_media_oembed_video}
          orientation={paragraph.behavior_settings?.sul_card_styles?.orientation}
          singleRow={singleRow}
          headerId={headerId}
          {...props}
        />}

      {paragraph.type === 'paragraph--stanford_banner' &&
        <StanfordBanner
          header={paragraph.su_banner_header}
          superHeader={paragraph.su_banner_sup_header}
          body={paragraph.su_banner_body}
          link={paragraph.su_banner_button}
          image={paragraph?.su_banner_image?.field_media_image}
          overlayPosition={paragraph.behavior_settings?.hero_pattern?.overlay_position}
          headerId={headerId}
          {...props}
        />
      }

      {paragraph.type === 'paragraph--stanford_gallery' &&
        <StanfordImageGallery paragraph={paragraph} {...props}/>}

      {paragraph.type === 'paragraph--stanford_media_caption' &&
        <StanfordMediaCaption
          caption={paragraph.su_media_caption_caption}
          link={paragraph.su_media_caption_link}
          image={paragraph.su_media_caption_media?.field_media_image}
          videoUrl={paragraph.su_media_caption_media?.field_media_oembed_video}
          {...props}
        />
      }

      {paragraph.type === 'paragraph--stanford_wysiwyg' &&
        <StanfordWysiwyg text={paragraph.su_wysiwyg_text} {...props}/>}

      {paragraph.type === 'paragraph--stanford_lists' &&
        <StanfordLists
          headline={paragraph.su_list_headline}
          description={paragraph.su_list_description}
          link={paragraph.su_list_button}
          view={paragraph.su_list_view}
          styles={paragraph.behavior_settings}
          headerId={headerId}
          {...props}
        />
      }

      {paragraph.type === 'paragraph--stanford_entity' &&
        <StanfordEntity
          headline={paragraph.su_entity_headline}
          description={paragraph.su_entity_description}
          link={paragraph.su_entity_button}
          entities={paragraph.su_entity_item ?? []}
          styles={paragraph.behavior_settings?.sul_teaser_styles}
          headerId={headerId}
          {...props}
        />
      }

      {paragraph.type === 'paragraph--stanford_spacer' && <StanfordSpacer size={paragraph.su_spacer_size}/>}

      {paragraph.type === 'paragraph--collection' &&
        <SulCollection
          cards={paragraph.sul_collection_card}
          heading={paragraph.sul_collection_heading}
          {...props}
        />
      }

      {paragraph.type === 'paragraph--sul_feat_collection' &&
        <SulFeaturedCollection
          headline={paragraph.sul_collection__headline}
          link={paragraph.sul_collection__link}
          cards={paragraph.sul_collection__cards}
          styles={paragraph.behavior_settings?.sul_feat_collections_styles}
          headerId={headerId}
          {...props}
        />
      }

      {paragraph.type === 'paragraph--sul_contact_card' &&
        <SulContactCard paragraph={paragraph} {...props}/>}

      {paragraph.type === 'paragraph--sul_button' &&
        <SulButton
          headline={paragraph.sul_button_headline}
          link={paragraph.sul_button_link}
          styles={paragraph.behavior_settings?.sul_button_styles}
          headerId={headerId}
          {...props}
        />
      }

      {paragraph.type === 'paragraph--sul_libguide' &&
        <SulLibguides
          headline={paragraph.sul_libguide__headline}
          description={paragraph.sul_libguide__desc}
          libguideId={paragraph.sul_libguide_id}
          {...props}
        />
      }
    </>
  );
}

export default Paragraph;