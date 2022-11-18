import {useEffect, useState} from "react";
import {News} from "../../types/drupal";
import {DrupalImage} from "@/components/simple/image";
import Image from "next/image";
import {Paragraph} from "@/components/paragraphs";
import Oembed from "@/components/simple/oembed";
import Link from "next/link";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import {formatDate} from "@/lib/format-date";
import { EnvelopeIcon, PrinterIcon } from '@heroicons/react/24/solid';
import { FacebookIcon } from '@/components/simple/icons/FacebookIcon';
import { TwitterIcon } from '@/components/simple/icons/TwitterIcon';
import { LinkedInIcon } from '@/components/simple/icons/LinkedInIcon';
import {Card} from "@/components/patterns/card";
import { NewsArticleJsonLd } from 'next-seo';

interface NewsNodeProps {
  node: News
}

export const NodeStanfordNews = ({node, ...props}: NewsNodeProps) => {

  const [currentUrl, setCurrentUrl] = useState("#")
  useEffect(() => {
    setCurrentUrl(document.URL);
  }, [])

  return (
    <MainContentLayout>
      <article {...props} className="su-mt-50">
        <NewsArticleJsonLd
            url={node.su_news_source?.url}
            title={node.title}
            images={node.su_news_featured_media?.field_media_image?.uri?.url}
            datePublished={node.su_news_publishing_date}
            authorName={node.su_news_byline}
            description={node.su_news_dek}
            isAccessibleForFree={true}
        />
        {node.su_news_topics && node.su_news_topics.map((topic, index) =>
            <span key={topic.id} className="su-text-digital-red su-font-semibold">
              {(index ? ', ' : '') + topic.name} 
            </span>
        )}
        <h1 className="su-type-5">{node.title}</h1>
        {node.su_news_dek && <div className="su-rs-mb-1">{node.su_news_dek}</div>}
        <div className="md:su-flex su-rs-mb-7">
          <div className="su-flex md:su-order-last su-rs-mb-2">
            <ul className="su-flex su-list-unstyled md:su-pl-[10px] su-mt-[-3px]">
              <li className="su-mr-1em">
                <Link className="su-text-black hocus:su-text-facebook su-transition-colors" href={`http://www.facebook.com/sharer.php?u=${currentUrl}&display=popup`}>
                  <span className="su-sr-only">Stanford Facebook</span>
                  <FacebookIcon />
                </Link>
              </li>
              <li className="su-mr-1em">
                <Link className="su-text-black hocus:su-text-twitter su-transition-colors" href={`https://twitter.com/intent/tweet?url={window.location}&text=${currentUrl}`}>
                  <span className="su-sr-only">Stanford Twitter</span>
                  <TwitterIcon />
                </Link>
              </li>
              <li className="su-mr-1em">
                <Link className="su-text-black hocus:su-text-linkedin su-transition-colors" href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${node.title}`}>
                  <span className="su-sr-only">Stanford LinkedIn</span>
                  <LinkedInIcon />
                </Link>
              </li>
              <li className="su-mr-1em">
                <Link className="su-text-black  hocus:su-text-digital-blue su-transition-colors" href={`mailto:?subject=${node.title}&body=${currentUrl}`}>
                  <span className="su-sr-only">Forward Email</span>
                  <EnvelopeIcon className="su-w-[28px]"/>
                </Link>
              </li>
              <li className="su-mr-1em">
                <button onClick={() => window.print()} className="su-text-black  hocus:su-text-digital-blue su-transition-colors">
                  <span className="su-sr-only">Print Article</span>
                  <PrinterIcon className="su-w-[28px]"/>
                </button>
              </li>
            </ul>
          </div>
          <div>
            {node.su_news_publishing_date && <>{formatDate(node.su_news_publishing_date + ' 12:00:00')} |&nbsp;</>}
            {node.su_news_byline && <>{node.su_news_byline}</>}
          </div>
        </div>

        {node?.su_news_banner?.field_media_image &&
          <DrupalImage
            src={node.su_news_banner.field_media_image.uri.url}
            alt={node.su_news_banner.field_media_image.resourceIdObjMeta.alt}
            height={node.su_news_banner.field_media_image.resourceIdObjMeta.height}
            width={node.su_news_banner.field_media_image.resourceIdObjMeta.width}
          />
        }

        {node?.su_news_banner?.field_media_oembed_video &&
            <Oembed
                url={node.su_news_banner.field_media_oembed_video}
            />
        }

        {node.su_news_banner_media_caption && <div className="su-text-center su-rs-mb-5 su-rs-px-0 su-caption">{node.su_news_banner_media_caption}</div>}
        {node.su_news_components && node.su_news_components.map(paragraph =>
          <Paragraph key={paragraph.id} paragraph={paragraph}/>
        )}
      </article>
    </MainContentLayout>
  )
}

export const NodeStanfordNewsListItem = ({node, ...props}: NewsNodeProps) => {
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
      <div className="su-text-18 su-mb-14">
        {node.su_news_publishing_date && <>{formatDate(node.su_news_publishing_date + ' 12:00:00')}</>}
      </div>
      <div className="su-grid su-grid-cols-[65%_35%] su-gap-1">
        <div>
          <Link className="su-text-digital-red su-no-underline hover:su-underline" href={node.path.alias}>
            <h2 className="su-type-2">{node.title}</h2>
          </Link>
          {node.su_news_dek && <div className="su-rs-mb-1">{node.su_news_dek}</div>}
        </div>
        <div className="su-hidden lg:su-block">
          {node?.su_news_featured_media?.field_media_image &&
            <DrupalImage
                src={node.su_news_featured_media.field_media_image.uri.url}
                alt={node.su_news_featured_media.field_media_image.resourceIdObjMeta.alt}
                height={node.su_news_featured_media.field_media_image.resourceIdObjMeta.height}
                width={node.su_news_featured_media.field_media_image.resourceIdObjMeta.width}
            />
          }
        </div>
      </div>
      {node.su_news_topics && node.su_news_topics.map((cardTopic, index) =>
        <span key={cardTopic.id} className="su-mt-10 su-text-digital-red su-font-semibold su-text-19">
          {(index ? ', ' : '') + cardTopic.name}
        </span>
      )}
    </article>
  )
}

export const NodeStanfordNewsCard = ({node, ...props}: NewsNodeProps) => {
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
          <Link className="su-text-black hover:su-underline" href={node.path.alias}>
            {node.title}
          </Link>
        }
        footer={
          <div>
            {node.su_news_topics && node.su_news_topics.map((topic, index) =>
              <span key={topic.id}>
                {(index ? ', ' : '') + topic.name}
              </span>
           )}
          </div>
        }
      />
    </article>
  )
}

const getFeaturedImageAlt = (node: News): string => {
  if (node.su_news_featured_media?.field_media_image?.resourceIdObjMeta?.alt) {
    return node.su_news_featured_media.field_media_image.resourceIdObjMeta.alt
  }
  return '';
}

const getFeaturedImageUrl = (node: News, imageStyle = 'breakpoint_2xl_1x'): null | string => {
  if (node.su_news_featured_media?.field_media_image?.image_style_uri?.[imageStyle]) {
    return node.su_news_featured_media.field_media_image.image_style_uri?.[imageStyle]
  }
}