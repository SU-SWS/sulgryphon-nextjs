import Conditional from "@/components/utils/conditional";
import {ExclamationCircleIcon} from "@heroicons/react/20/solid";
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

interface ParagraphProps {
  paragraph: any;
  siblingCount?: number;
  [key: string]: any
}

const Paragraph = ({paragraph, siblingCount, ...props}: ParagraphProps) => {
  return (
    <>
      <Conditional showWhen={paragraph.status != undefined && !paragraph.status}>
        <div className="su-bg-illuminating-light su-py-30 su-mb-20">
          <div className="su-cc su-text-m2 su-flex su-gap-lg">
            <ExclamationCircleIcon width={40}/>
            Unpublished Content
          </div>
        </div>
      </Conditional>

      {paragraph.type === 'paragraph--stanford_card' &&
          <StanfordCard paragraph={paragraph} siblingCount={siblingCount} {...props}/>}
      {paragraph.type === 'paragraph--stanford_banner' &&
          <StanfordBanner paragraph={paragraph} siblingCount={siblingCount} {...props}/>}
      {paragraph.type === 'paragraph--stanford_gallery' &&
          <StanfordImageGallery paragraph={paragraph} siblingCount={siblingCount} {...props}/>}
      {paragraph.type === 'paragraph--stanford_media_caption' &&
          <StanfordMediaCaption paragraph={paragraph} siblingCount={siblingCount} {...props}/>}
      {paragraph.type === 'paragraph--stanford_wysiwyg' &&
          <StanfordWysiwyg paragraph={paragraph} siblingCount={siblingCount} {...props}/>}
      {paragraph.type === 'paragraph--stanford_lists' &&
          <StanfordLists paragraph={paragraph} siblingCount={siblingCount} {...props}/>}
      {paragraph.type === 'paragraph--stanford_entity' &&
          <StanfordEntity paragraph={paragraph} siblingCount={siblingCount} {...props}/>}
      {paragraph.type === 'paragraph--stanford_spacer' &&
          <StanfordSpacer paragraph={paragraph} siblingCount={siblingCount} {...props}/>}
      {paragraph.type === 'paragraph--collection' &&
          <SulCollection paragraph={paragraph} siblingCount={siblingCount} {...props}/>}
      {paragraph.type === 'paragraph--sul_feat_collection' &&
          <SulFeaturedCollection paragraph={paragraph} siblingCount={siblingCount}  {...props}/>}
      {paragraph.type === 'paragraph--sul_contact_card' &&
          <SulContactCard paragraph={paragraph} siblingCount={siblingCount}  {...props}/>}
      {paragraph.type === 'paragraph--sul_button' &&
          <SulButton paragraph={paragraph} siblingCount={siblingCount}  {...props}/>}
    </>
  );
}

export default Paragraph;