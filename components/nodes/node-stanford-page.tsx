import {NextSeo} from "next-seo";
import Image from "next/image";
import Link from "next/link";
import {useMemo} from "react";

import {BasicPage} from "../../types/drupal";
import {StanfordBanner} from "@/components/paragraphs/stanford-banner";
import {Rows} from "@/components/paragraphs/row";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import {Card} from "@/components/patterns/card";
import Conditional from "@/components/simple/conditional";

interface BasicPageNodeProps {
  node: BasicPage
  homepage?: boolean
}

export const NodeStanfordPage = ({node, homepage = false, ...props}: BasicPageNodeProps) => {
  return (
    <>
      <NextSeo
        title={homepage ? '' : node.title}
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

      <div>
      <Conditional showWhen={!homepage}>
        <div className="su-cc">
          <h1 className={`su-mt-50 ${node.su_page_banner ? 'su-sr-only' : ''}`}>
            {node.title}
          </h1>
        </div>
      </Conditional>

      <Conditional showWhen={node.su_page_banner?.id?.length > 1}>
        <StanfordBanner className="su-mb-50" paragraph={node.su_page_banner}/>
      </Conditional>
      </div>

      <MainContentLayout fullWidth={homepage} {...props}>
        <Conditional showWhen={node.su_page_components.length > 0}>
          <article>
            <Rows rows={node.su_page_components} rowField="su_page_components"/>
          </article>
        </Conditional>
      </MainContentLayout>
    </>
  )
}

export const NodeStanfordPageListItem = ({node, ...props}: BasicPageNodeProps) => {

  const getImage = () => {
    let imageUrl = getFeaturedImageUrl(node);
    if (imageUrl) {
      return <Image
        className="su-object-cover su-object-center"
        src={imageUrl}
        alt=""
        fill={true}
      />
    }
  }

  const image = useMemo(() => getImage(), [node]);

  return (
    <article {...props}>
      <div className="su-grid su-grid-cols-4 su-gap-xl">
        <div className="su-col-span-3">
          <Link className="su-text-cardinal-red su-no-underline hover:su-underline" href={node.path.alias}>
            <h3>{node.title}</h3>
          </Link>
          {node.su_page_description}
        </div>

        <Conditional showWhen={image}>
          <div aria-hidden={true} className="su-col-span-1 su-overflow-hidden su-aspect-[16/9] su-relative">
            <Link href={node.path.alias}>
              {image}
            </Link>
          </div>
        </Conditional>
      </div>
    </article>
  )
}

export const NodeStanfordPageCard = ({node, ...props}: BasicPageNodeProps) => {
  const getImage = () => {
    let imageUrl = getFeaturedImageUrl(node);
    if (imageUrl) {
      return <Image
        className="su-object-cover su-object-center"
        src={imageUrl}
        alt=""
        fill={true}
      />
    }
  }

  const image = useMemo(() => getImage(), [node]);

  return (
    <article {...props}>
      <Card
        image={image}
        header={
          <Link className="su-text-black hover:su-underline" href={node.path.alias}>
            {node.title}
          </Link>
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