import Oembed from "@/components/patterns/oembed";
import Image from "next/image";
import {EnvelopeIcon} from "@heroicons/react/20/solid";

import LinkedInIcon from "@/components/patterns/icons/LinkedInIcon";
import TwitterIcon from "@/components/patterns/icons/TwitterIcon";
import FacebookIcon from "@/components/patterns/icons/FacebookIcon";
import Conditional from "@/components/utils/conditional";
import NewsSocialLink from "@/components/node/stanford-news/news-social-link";
import {News} from "@/lib/drupal/drupal";
import {formatDate} from "@/lib/format-date";
import NewsPrintButton from "@/components/node/stanford-news/print-button";
import fetchComponents from "@/lib/fetch-components";
import Paragraph from "@/components/paragraph";
import {redirect} from "next/navigation";

const StanfordNews = async ({node, ...props}: { node: News }) => {
  node.su_news_components = await fetchComponents(node.su_news_components ?? [])
  node.su_news_components = node.su_news_components.filter(item => item?.id?.length > 0);

  // Redirect the user to the external source.
  if (node.su_news_source?.url && node.su_news_source?.url?.length > 0) {
    redirect(node.su_news_source?.url);
  }
  return (
    <article {...props} className="su-mt-50">
      <div className="su-cc">

        {(node.su_news_topics && node.su_news_topics.length > 0) &&
            <div className="su-mb-20">
              {node.su_news_topics.map((topic, index) =>
                <span key={topic.id}
                      className="su-text-digital-red su-font-semibold">{(index ? ', ' : '') + topic.name}</span>
              )}
            </div>
        }

        {node.su_news_dek && <div className="su-rs-mb-1">{node.su_news_dek}</div>}
        <div className="md:su-flex su-rs-mb-7">
          <div className="su-flex md:su-order-last su-rs-mb-2">
            <Conditional showWhen={!node.su_news_hide_social}>
              <ul className="su-flex su-list-unstyled md:su-pl-[10px] su-mt-[-3px]">
                <li className="su-mr-1em">

                  <NewsSocialLink
                    className="su-text-black hocus:su-text-digital-blue su-transition-colors"
                    prefix="http://www.facebook.com/sharer.php?u="
                    suffix="&display=popup"
                  >
                    <span className="su-sr-only">Stanford Facebook</span>
                    <FacebookIcon/>
                  </NewsSocialLink>
                </li>
                <li className="su-mr-1em">
                  <NewsSocialLink
                    className="su-text-black hocus:su-text-digital-blue su-transition-colors"
                    prefix="https://twitter.com/intent/tweet?url="
                    suffix={`&text=${node.title}`}
                  >
                    <span className="su-sr-only">Stanford Twitter</span>
                    <TwitterIcon/>
                  </NewsSocialLink>
                </li>
                <li className="su-mr-1em">
                  <NewsSocialLink
                    className="su-text-black hocus:su-text-digital-blue su-transition-colors"
                    prefix="https://www.linkedin.com/shareArticle?mini=true&url="
                    suffix={`&title=${node.title}`}
                  >
                    <span className="su-sr-only">Stanford LinkedIn</span>
                    <LinkedInIcon/>
                  </NewsSocialLink>
                </li>
                <li className="su-mr-1em">
                  <NewsSocialLink
                    className="su-text-black hocus:su-text-digital-blue su-transition-colors"
                    prefix={`mailto:?subject=${node.title}&body=`}
                  >
                    <span className="su-sr-only">Forward Email</span>
                    <EnvelopeIcon width={28}/>
                  </NewsSocialLink>
                </li>
                <li className="su-mr-1em">
                  <NewsPrintButton/>
                </li>
              </ul>
            </Conditional>
          </div>
          <div>
            {node.su_news_publishing_date && <>{formatDate(node.su_news_publishing_date + ' 12:00:00')} |&nbsp;</>}
            {node.su_news_byline}
          </div>
        </div>
      </div>

      {node?.su_news_banner?.field_media_image &&
          <figure className="su-mb-50">
            <Image
                className="su-mx-auto"
                src={node.su_news_banner.field_media_image.image_style_uri.breakpoint_2xl_2x}
                alt={node.su_news_banner.field_media_image.resourceIdObjMeta.alt}
                height={node.su_news_banner.field_media_image.resourceIdObjMeta.height}
                width={node.su_news_banner.field_media_image.resourceIdObjMeta.width}
            />

            {node.su_news_banner_media_caption &&
                <figcaption className="su-text-center su-rs-mb-5 su-rs-px-0 su-caption">
                  {node.su_news_banner_media_caption}
                </figcaption>
            }

          </figure>
      }

      {node?.su_news_banner?.field_media_oembed_video &&
          <figure className="su-mb-50">
            <Oembed
                url={node.su_news_banner.field_media_oembed_video}
            />
            {node.su_news_banner_media_caption &&
                <figcaption className="su-text-center su-rs-mb-5 su-rs-px-0 su-caption">
                  {node.su_news_banner_media_caption}
                </figcaption>
            }
          </figure>
      }


      <div className="su-mb-50">
        {node.su_news_components.map(component => <Paragraph key={component.id} paragraph={component}/>)}
      </div>
    </article>
  )
}

export default StanfordNews;