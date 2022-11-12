import {News} from "../../types/drupal";
import Image from "next/image";
import {DrupalImage} from "@/components/simple/image";
import {Paragraph} from "@/components/paragraphs";
import Oembed from "@/components/simple/oembed";
import {DrupalLink} from "@/components/simple/link";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import {formatDate} from "@/lib/format-date";
import { EnvelopeIcon, PrinterIcon } from '@heroicons/react/24/solid';
import { FacebookIcon } from '@/components/simple/icons/FacebookIcon';
import { TwitterIcon } from '@/components/simple/icons/TwitterIcon';
import { LinkedInIcon } from '@/components/simple/icons/LinkedInIcon';
import {NextSeo} from "next-seo";
import {Card} from "@/components/patterns/card";

interface NewsNodeProps {
  node: News
}

export const NodeStanfordNews = ({node, ...props}: NewsNodeProps) => {

  return (
    <MainContentLayout>
      <NextSeo
        title={node.title}
        canonical={node.su_news_source?.url}
      />

      <article {...props} className="su-mt-50">
        {node.su_news_topics && node.su_news_topics.map(topic =>
          <div key={topic.id}>
            {topic.name}
          </div>
        )}

        <h1 className="su-type-5">{node.title}</h1>
        {node.su_news_dek && <div className="su-rs-mb-1">{node.su_news_dek}</div>}
        <div className="md:su-flex su-rs-mb-7">
          <div className="su-flex md:su-order-last su-rs-mb-2">
            <ul className="su-flex su-list-unstyled md:su-pl-[10px] su-mt-[-3px]">
              <li className="su-mr-1em">
                <a
                  href="https://www.facebook.com"
                  className="su-text-black hocus:su-text-facebook su-transition-colors"
                >
                  <span className="su-sr-only">Stanford Facebook</span>
                  <FacebookIcon />
                </a>
              </li>
              <li className="su-mr-1em">
                <a
                  href="https://twitter.com"
                  className="su-text-black hocus:su-text-twitter su-transition-colors"
                >
                  <span className="su-sr-only">Stanford Twitter</span>
                  <TwitterIcon />
                </a>
              </li>
              <li className="su-mr-1em">
                <a
                  href="https://www.linkedin.com/"
                  className="su-text-black hocus:su-text-linkedin su-transition-colors"
                >
                  <span className="su-sr-only">Stanford LinkedIn</span>
                  <LinkedInIcon />
                </a>
              </li>
              <li className="su-mr-1em">
                <a
                  href="/"
                  className="su-text-black  hocus:su-text-digital-blue su-transition-colors"
                >
                  <span className="su-sr-only">Forward Email</span>
                  <EnvelopeIcon className="su-w-[28px]"/>
                </a>
              </li>
              <li className="su-mr-1em">
                <a
                  href="/"
                  className="su-text-black su-text hocus:su-text-digital-blue su-transition-colors "
                >
                  <span className="su-sr-only">Print Article</span>
                  <PrinterIcon className="su-w-[28px]"/>
                </a>
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

  return (
    <article {...props}>
      <div className="su-text-18 su-mb-14">
        {node.su_news_publishing_date && <>{formatDate(node.su_news_publishing_date + ' 12:00:00')}</>}
      </div>
      <div className="su-grid su-grid-cols-[65%_35%] su-gap-1">
        <div>
          <DrupalLink className="su-text-digital-red su-no-underline hover:su-underline" href={node.path.alias}>
            <h2 className="su-type-2">{node.title}</h2>
          </DrupalLink>
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
      {node.su_news_topics && node.su_news_topics.map(cardTopic =>
        <div key={cardTopic.id} className="su-mt-10">
          {cardTopic.name}
        </div>
      )}
    </article>
  )
}

export const NodeStanfordNewsCard = ({node, ...props}: NewsNodeProps) => {

  return (
    <article {...props}>
      <Card
        image={
          <div>
            {node?.su_news_featured_media?.field_media_image &&
              <DrupalImage
                  src={node.su_news_featured_media.field_media_image.uri.url}
                  alt={node.su_news_featured_media.field_media_image.resourceIdObjMeta.alt}
                  height={node.su_news_featured_media.field_media_image.resourceIdObjMeta.height}
                  width={node.su_news_featured_media.field_media_image.resourceIdObjMeta.width}
              />
            }
          </div>
        }
        header={
          <DrupalLink className="su-text-black hover:su-underline" href={node.path.alias}>
            {node.title}
          </DrupalLink>
        }
        footer={
          <div>
            {node.su_news_topics && node.su_news_topics.map(topic =>
          <div key={topic.id}>{topic.name}</div>
           )}
          </div>
        }
      />
    </article>
  )
}