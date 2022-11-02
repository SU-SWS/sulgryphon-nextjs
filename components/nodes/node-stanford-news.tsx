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


      <article {...props} className="su-mt-[113px]">
        {node.su_news_topics && node.su_news_topics.map(topic =>
          <div key={topic.id}>
            {topic.name}
          </div>
        )}

        <h1>{node.title}</h1>
        {node.su_news_dek && <div className="su-mb-[2.31rem] md:su-mb-26 2xl:su-mb-27">{node.su_news_dek}</div>}
        <div className="su-flex 2xl:su-mb-114 md:su-mb-108 su-mb-95">
          {node.su_news_publishing_date && <div>{formatDate(node.su_news_publishing_date + ' 12:00:00')} |&nbsp;</div>}
          {node.su_news_byline && <div>{node.su_news_byline}</div>}
          <div>
          <ul className="su-flex su-list-unstyled su-pl-[10px] su-mt-[-3px]">
            <li className="su-mr-1em">
              <a
                href="https://www.facebook.com"
                className="su-text-black hocus:su-text-facebook su-transition-colors"
              >
                <span className="su-sr-only">Stanford Facebook</span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="facebook-f"
                  className="su-w-[17.5px]"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  />
                </svg>
              </a>
            </li>
            <li className="su-mr-1em">
              <a
                href="https://twitter.com"
                className="su-text-black hocus:su-text-twitter su-transition-colors"
              >
                <span className="su-sr-only">Stanford Twitter</span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="twitter"
                  className="su-w-[28px]"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                  />
                </svg>
              </a>
            </li>
            <li className="su-mr-1em">
              <a
                href="https://www.linkedin.com/"
                className="su-text-black hocus:su-text-linkedin su-transition-colors"
              >
                <span className="su-sr-only">Stanford LinkedIn</span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="linkedin-in"
                  className="su-w-[24.5px]"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                  />
                </svg>
              </a>
            </li>
            <li className="su-mr-1em">
              <a
                href="/"
                className="su-text-black  hocus:su-text-digital-blue su-transition-colors"
              >
                <span className="su-sr-only">Forward Email</span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="fa-envelope"
                  className="su-w-[28px]"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                  />
                </svg>
              </a>
            </li>
            <li className="su-mr-1em">
              <a
                href="/"
                className="su-text-black su-text hocus:su-text-digital-blue su-transition-colors "
              >
                <span className="su-sr-only">Print Article</span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="fa-print"
                  className="su-w-[24.5px]"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zm-16-88c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24z"
                  />
                </svg>
              </a>
            </li>
          </ul>
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
                src={node.su_news_banner.field_media_oembed_video}
                title={node.su_news_banner.name}
            />
        }

        {node.su_news_banner_media_caption && <div className="su-text-center su-mt-[2.31rem] md:su-mt-26 2xl:su-mt-27">{node.su_news_banner_media_caption}</div>}
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