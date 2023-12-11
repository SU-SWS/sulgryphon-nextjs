import "server-only";
import Oembed from "@/components/patterns/elements/oembed";
import Image from "next/image";
import {EnvelopeIcon} from "@heroicons/react/20/solid";

import LinkedInIcon from "@/components/patterns/icons/LinkedInIcon";
import TwitterIcon from "@/components/patterns/icons/TwitterIcon";
import FacebookIcon from "@/components/patterns/icons/FacebookIcon";
import Conditional from "@/components/utils/conditional";
import NewsSocialLink from "@/components/node/stanford-news/news-social-link";
import {News, StanfordParagraph} from "@/lib/drupal/drupal";
import {formatDate} from "@/lib/format-date";
import NewsPrintButton from "@/components/node/stanford-news/print-button";
import fetchComponents from "@/lib/fetch-components";
import Paragraph from "@/components/paragraph";
import {redirect} from "next/navigation";

const StanfordNews = async ({node, ...props}: { node: News }) => {
  node.su_news_components = await fetchComponents<StanfordParagraph>(node.su_news_components || [])
  node.su_news_components = node.su_news_components.filter(item => !item?.id);

  // Redirect the user to the external source.
  if (node.su_news_source?.url && node.su_news_source?.url?.length > 0) {
    redirect(node.su_news_source?.url);
  }

  const imageUrl = node.su_news_banner?.field_media_image?.image_style_uri?.breakpoint_2xl_2x;
  const imageAlt = node.su_news_banner?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const placeholder = node.su_news_banner?.field_media_image?.uri.base64;

  return (
    <article {...props} className=" centered mt-50">
      <div className="centered 2xl:w-2/3 mb-100">

        {node.su_news_dek && <div className="">{node.su_news_dek}</div>}
        <div className="md:flex">
          <div className="flex md:order-last">
            <Conditional showWhen={!node.su_news_hide_social}>
              <ul className="flex list-unstyled md:pl-[10px] mt-[-3px]">
                <li className="mr-1em">

                  <NewsSocialLink
                    className="text-black hocus:text-digital-blue transition-colors"
                    prefix="http://www.facebook.com/sharer.php?u="
                    suffix="&display=popup"
                  >
                    <span className="sr-only">Stanford Facebook</span>
                    <FacebookIcon/>
                  </NewsSocialLink>
                </li>
                <li className="mr-1em">
                  <NewsSocialLink
                    className="text-black hocus:text-digital-blue transition-colors"
                    prefix="https://twitter.com/intent/tweet?url="
                    suffix={`&text=${node.title}`}
                  >
                    <span className="sr-only">Stanford Twitter</span>
                    <TwitterIcon/>
                  </NewsSocialLink>
                </li>
                <li className="mr-1em">
                  <NewsSocialLink
                    className="text-black hocus:text-digital-blue transition-colors"
                    prefix="https://www.linkedin.com/shareArticle?mini=true&url="
                    suffix={`&title=${node.title}`}
                  >
                    <span className="sr-only">Stanford LinkedIn</span>
                    <LinkedInIcon/>
                  </NewsSocialLink>
                </li>
                <li className="mr-1em">
                  <NewsSocialLink
                    className="text-black hocus:text-digital-blue transition-colors"
                    prefix={`mailto:?subject=${node.title}&body=`}
                  >
                    <span className="sr-only">Forward Email</span>
                    <EnvelopeIcon width={28}/>
                  </NewsSocialLink>
                </li>
                <li className="mr-1em">
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
      <hr className="w-1/2 mx-auto mb-100 text-black-40"/>

      {imageUrl &&
        <figure className="relative mb-100 lg:w-10/12 mx-auto aspect-[16/9]">
          <Image
            className="object-cover"
            src={imageUrl}
            alt={imageAlt}
            fill
            placeholder={placeholder ? 'blur' : 'empty'}
            blurDataURL={placeholder}
          />

          {node.su_news_banner_media_caption &&
            <figcaption className="text-center caption">
              {node.su_news_banner_media_caption}
            </figcaption>
          }

        </figure>
      }

      {node?.su_news_banner?.field_media_oembed_video &&
        <figure className="relative mb-100 w-10/12 mx-auto aspect-[16/9]">
          <Oembed
            url={node.su_news_banner.field_media_oembed_video}
          />
          {node.su_news_banner_media_caption &&
            <figcaption className="text-center caption">
              {node.su_news_banner_media_caption}
            </figcaption>
          }
        </figure>
      }


      <div className="centered 2xl:w-2/3">
        {node.su_news_components.map(component =>
          <Paragraph key={component.id} paragraph={component} fullWidth={false}/>
        )}
      </div>
    </article>
  )
}

export default StanfordNews;