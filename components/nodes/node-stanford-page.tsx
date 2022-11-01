import {NextSeo} from "next-seo";
import Image from "next/image";

import {BasicPage} from "../../types/drupal";
import {StanfordBanner} from "@/components/paragraphs/stanford-banner";
import {Rows} from "@/components/paragraphs/row";
import {DrupalLink} from "@/components/simple/link";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import {Card} from "@/components/patterns/card";

interface BasicPageNodeProps {
  node: BasicPage
  homepage?: boolean
}

export const NodeStanfordPage = ({node, homepage = false, ...props}: BasicPageNodeProps) => {

  return (
    <>
      <NextSeo
        description={node.su_page_description}
        openGraph={{
          type: 'website',
          title: node.title,
          description: node.su_page_description,
          images: [{
            url: getFeaturedImageUrl(node, 'card_956x478'),
            width: 956,
            height: 478,
            alt: getFeaturedImageAlt(node)
          }]
        }}
      />
      {!homepage &&
          <div className="su-cc">
            <h1 className={`su-mt-[50px] ${node.su_page_banner ? 'su-sr-only' : ''}`}>
              {node.title}
            </h1>
          </div>
      }
      {node.su_page_banner && <StanfordBanner className="su-mb-[50px]" paragraph={node.su_page_banner}/>}

      <MainContentLayout fullWidth={homepage} {...props}>
        <article>
          {node.su_page_components && <Rows rows={node.su_page_components} rowField="su_page_components"/>}
        </article>
      </MainContentLayout>
    </>
  )
}

export const NodeStanfordPageListItem = ({node, ...props}: BasicPageNodeProps) => {

  let imageUrl = getFeaturedImageUrl(node);
  let image;
  if (imageUrl) {
    image = <Image
      src={imageUrl}
      alt=""
      fill={true}
    />
  }

  return (
    <article {...props}>
      <div className="su-grid su-grid-cols-4 su-gap-xl">
        <div className="su-col-span-3">
          <DrupalLink className="su-text-cardinal-red su-no-underline hover:su-underline" href={node.path.alias}>
            <h3>{node.title}</h3>
          </DrupalLink>

          {node.su_page_description}
        </div>

        {image &&
            <div aria-hidden={true} className="su-col-span-1 su-overflow-hidden su-aspect-[16/9] su-relative">
              <DrupalLink href={node.path.alias}>
                {image}
              </DrupalLink>
            </div>
        }
      </div>
    </article>
  )
}

export const NodeStanfordPageCard = ({node, ...props}: BasicPageNodeProps) => {
  let imageUrl = getFeaturedImageUrl(node);
  let image;
  if (imageUrl) {
    image = <Image
      src={imageUrl}
      alt=""
      fill={true}
    />
  }

  return (
    <article {...props}>
      <Card
        image={image}
        header={
          <DrupalLink className="su-text-black hover:su-underline" href={node.path.alias}>
            {node.title}
          </DrupalLink>
        }
        body={node.su_page_description}
      />
    </article>
  )
}

const getFeaturedImageAlt = (node: BasicPage): string => {
  if (node.su_page_image?.field_media_image?.resourceIdObjMeta?.alt) {
    return node.su_page_image.field_media_image.resourceIdObjMeta.alt
  }
  return '';
}

const getFeaturedImageUrl = (node: BasicPage, imageStyle = 'breakpoint_2xl_1x'): null | string => {
  if (node.su_page_image?.field_media_image?.image_style_uri?.[imageStyle]) {
    return node.su_page_image.field_media_image.image_style_uri?.[imageStyle]
  }

  if (node.su_page_banner?.su_banner_image?.field_media_image?.image_style_uri?.[imageStyle]) {
    return node.su_page_banner.su_banner_image.field_media_image.image_style_uri?.[imageStyle];
  }
}