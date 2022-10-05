import {StanfordWysiwyg} from "@/components/paragraphs/stanford-wysiwyg";
import {StanfordCard} from "@/components/paragraphs/stanford-card";
import {StanfordBanner} from "@/components/paragraphs/stanford-banner";
import {StanfordImageGallery} from "@/components/paragraphs/stanford-image-gallery";
import {StanfordMediaCaption} from "@/components/paragraphs/stanford-media-caption";
import {StanfordLists} from "@/components/paragraphs/stanford-lists";
import {StanfordEntity} from "@/components/paragraphs/stanford-entity";
import {StanfordSpacer} from "@/components/paragraphs/stanford-spacer";

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
    </>
  );
}