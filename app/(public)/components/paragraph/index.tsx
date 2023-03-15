import dynamic from "next/dynamic";
import Conditional from "@/components/utils/conditional";
import {ExclamationCircleIcon} from "@heroicons/react/20/solid";

const StanfordWysiwyg = dynamic(() => import("./stanford-wysiwyg"));
const StanfordCard = dynamic(() => import("./stanford-card"));
const StanfordBanner = dynamic(() => import("./stanford-banner"));
const StanfordImageGallery = dynamic(() => import("./stanford-image-gallery"));
const StanfordMediaCaption = dynamic(() => import("./stanford-media-caption"));
const StanfordLists = dynamic(() => import("./stanford-lists"));

/* @ts-expect-error Async Server Component */
const StanfordEntity = dynamic(() => import("./stanford-entity"));
const StanfordSpacer = dynamic(() => import("./stanford-spacer"));
const SulCollection = dynamic(() => import("./sul-collection"));
const SulFeaturedCollection = dynamic(() => import("./sul-featured-collection"));
const SulContactCard = dynamic(() => import("./sul-contact-card/index"));

interface ParagraphProps {
  paragraph: any;
  siblingCount?: number;
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
    </>
  );
}

export default Paragraph;