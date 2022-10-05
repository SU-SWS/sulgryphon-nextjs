import {News} from "../../types/drupal";
import {DrupalImage} from "@/components/simple/image";
import {Paragraph} from "@/components/paragraphs";
import {Oembed} from "@/components/simple/oembed";
import {DrupalLink} from "@/components/simple/link";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import {formatDate} from "@/lib/format-date";
import {NextSeo} from "next-seo";

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


      <article {...props}>
        {node.su_news_topics && node.su_news_topics.map(topic =>
          <div key={topic.id}>
            {topic.name}
          </div>
        )}

        <h1>{node.title}</h1>
        {node.su_news_dek && <div>{node.su_news_dek}</div>}

        {node.su_news_publishing_date && <div>{formatDate(node.su_news_publishing_date + ' 12:00:00')}</div>}
        {node.su_news_byline && <div>{node.su_news_byline}</div>}

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
                src={node.su_news_banner.field_media_oembed_video}
                title={node.su_news_banner.name}
            />
        }

        {node.su_news_banner_media_caption && <div>{node.su_news_banner_media_caption}</div>}
        {node.su_news_components && node.su_news_components.map(paragraph =>
          <Paragraph key={paragraph.id} paragraph={paragraph}/>
        )}
      </article>
    </MainContentLayout>
  )
}

export const NodeStanfordNewsListItem = ({node, ...props}: NewsNodeProps) => {
  return (
    <article className="su-rs-px-2 su-rs-pt-2 su-rs-pb-4" {...props}>
      <DrupalLink href={node.path.alias}>
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </DrupalLink>
    </article>
  )
}

export const NodeStanfordNewsCard = ({node, ...props}: NewsNodeProps) => {

  return (
    <article className="su-shadow-lg su-text-15 su-rs-px-2 su-rs-pt-2 su-rs-pb-4" {...props}>
      {node?.su_news_featured_media?.field_media_image &&
          <DrupalImage
              src={node.su_news_featured_media.field_media_image.uri.url}
              alt={node.su_news_featured_media.field_media_image.resourceIdObjMeta.alt}
              height={node.su_news_featured_media.field_media_image.resourceIdObjMeta.height}
              width={node.su_news_featured_media.field_media_image.resourceIdObjMeta.width}
          />
      }

      <DrupalLink href={node.path.alias}
                  className="su-no-underline su-text-cardinal-red hover:su-underline hover:su-text-black">
        <h2>
          {node.title}
        </h2>

        {node.su_news_topics && node.su_news_topics.map(topic =>
          <div key={topic.id}>{topic.name}</div>
        )}
      </DrupalLink>
    </article>
  )
}