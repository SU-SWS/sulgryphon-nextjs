import dynamic from "next/dynamic";

const StanfordWysiwyg = dynamic(() => import("./stanford-wysiwyg").then((mod) => mod.StanfordWysiwyg));
const StanfordCard = dynamic(() => import("./stanford-card").then((mod) => mod.StanfordCard));
const StanfordBanner = dynamic(() => import("./stanford-banner").then((mod) => mod.StanfordBanner));
const StanfordImageGallery = dynamic(() => import("./stanford-image-gallery").then((mod) => mod.StanfordImageGallery));
const StanfordMediaCaption = dynamic(() => import("./stanford-media-caption").then((mod) => mod.StanfordMediaCaption));
const StanfordLists = dynamic(() => import("./stanford-lists").then((mod) => mod.StanfordLists));
const StanfordEntity = dynamic(() => import("./stanford-entity").then((mod) => mod.StanfordEntity));
const StanfordSpacer = dynamic(() => import("./stanford-spacer").then((mod) => mod.StanfordSpacer));
const SulCollection = dynamic(() => import("./sul-collection").then((mod) => mod.SulCollection));
const SulFeaturedCollection = dynamic(() => import("./sul-featured-collection").then((mod) => mod.SulFeaturedCollection));

interface ParagraphProps {
  paragraph: any;
  siblingCount?: number;
}

export const Paragraph = ({paragraph, siblingCount, ...props}: ParagraphProps) => {

  return (
    <>
      {paragraph.type === 'paragraph--stanford_card' &&
          <StanfordCard paragraph={paragraph} siblingCount={siblingCount}  {...props}/>}
      {paragraph.type === 'paragraph--stanford_banner' &&
          <StanfordBanner paragraph={paragraph} siblingCount={siblingCount}  {...props}/>}
      {paragraph.type === 'paragraph--stanford_gallery' &&
          <StanfordImageGallery paragraph={paragraph} siblingCount={siblingCount}  {...props}/>}
      {paragraph.type === 'paragraph--stanford_media_caption' &&
          <StanfordMediaCaption paragraph={paragraph} siblingCount={siblingCount}  {...props}/>}
      {paragraph.type === 'paragraph--stanford_wysiwyg' &&
          <StanfordWysiwyg paragraph={paragraph} siblingCount={siblingCount}  {...props}/>}
      {paragraph.type === 'paragraph--stanford_lists' &&
          <StanfordLists paragraph={paragraph} siblingCount={siblingCount} {...props}/>}
      {paragraph.type === 'paragraph--stanford_entity' &&
          <StanfordEntity paragraph={paragraph} siblingCount={siblingCount} {...props}/>}
      {paragraph.type === 'paragraph--stanford_spacer' &&
          <StanfordSpacer paragraph={paragraph} siblingCount={siblingCount}  {...props}/>}
      {paragraph.type === 'paragraph--collection' &&
          <SulCollection paragraph={paragraph} siblingCount={siblingCount}  {...props}/>}
      {paragraph.type === 'paragraph--sul_feat_collection' &&
          <SulFeaturedCollection paragraph={paragraph} siblingCount={siblingCount}  {...props}/>}
    </>
  );
}