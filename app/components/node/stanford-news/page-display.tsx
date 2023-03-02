import {NewsArticleJsonLd} from "next-seo";
import Oembed from "../../patterns/oembed";
import {ParagraphRows} from "../../paragraph/rows/rows";
import Image from "next/image";
import {PrinterIcon} from "@heroicons/react/24/solid";
import {EnvelopeIcon} from "@heroicons/react/20/solid";

import LinkedInIcon from "../../patterns/icons/LinkedInIcon";
import TwitterIcon from "../../patterns/icons/TwitterIcon";
import FacebookIcon from "../../patterns/icons/FacebookIcon";
import Conditional from "../../utils/conditional";
import NewsSocialLink from "./news-social-link";
import {News} from "../../../../src/types/drupal";
import {formatDate} from "../../../lib/format-date";
import {getResource} from "../../../lib/drupal/get-resource";

const StanfordNews = async({node, ...props}: { node: News }) => {
  const requests = [];
  node.su_news_components.map(component => requests.push(getResource(component.type, component.id)));
  node.su_news_components = await Promise.all(requests);

  return (
    <article {...props} className="su-mt-50">
      <NewsArticleJsonLd
        useAppDir={true}
        url={node.su_news_source?.url ?? node.path.alias}
        title={node.title}
        images={node.su_news_featured_media?.field_media_image?.uri?.url}
        section=""
        keywords=""
        dateCreated={node.su_news_publishing_date}
        datePublished={node.su_news_publishing_date}
        dateModified=""
        authorName={node.su_news_byline}
        description={node.su_news_dek}
        body=""
        publisherName=""
        publisherLogo=""
        isAccessibleForFree={true}
      />
      <div className="su-cc">
        <Conditional showWhen={node.su_news_topics}>
          <div className="su-mb-20">
            {node.su_news_topics.map((topic, index) =>
              <span key={topic.id}
                    className="su-text-digital-red su-font-semibold">{(index ? ', ' : '') + topic.name}</span>
            )}
          </div>
        </Conditional>

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
                  <button onClick={() => window.print()}
                          className="su-text-black hocus:su-text-digital-blue su-transition-colors">
                    <span className="su-sr-only">Print Article</span>
                    <PrinterIcon width={28}/>
                  </button>
                </li>
              </ul>
            </Conditional>
          </div>
          <div>
            {node.su_news_publishing_date && <>{formatDate(node.su_news_publishing_date + ' 12:00:00')} |&nbsp;</>}
            {node.su_news_byline && <>{node.su_news_byline}</>}
          </div>
        </div>
      </div>
      {node?.su_news_banner?.field_media_image &&
          <div>
            <Image
                className="su-mx-auto"
                src={node.su_news_banner.field_media_image.image_style_uri.breakpoint_2xl_2x}
                alt={node.su_news_banner.field_media_image.resourceIdObjMeta.alt}
                height={node.su_news_banner.field_media_image.resourceIdObjMeta.height}
                width={node.su_news_banner.field_media_image.resourceIdObjMeta.width}
            />
          </div>
      }

      {node?.su_news_banner?.field_media_oembed_video &&
          <Oembed
              url={node.su_news_banner.field_media_oembed_video}
          />
      }

      {node.su_news_banner_media_caption &&
          <div className="su-text-center su-rs-mb-5 su-rs-px-0 su-caption">{node.su_news_banner_media_caption}</div>}
      <ParagraphRows items={node.su_news_components}/>
    </article>
  )
}

export default StanfordNews;