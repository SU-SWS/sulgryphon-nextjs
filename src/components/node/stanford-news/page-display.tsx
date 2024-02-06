import Oembed from "@/components/patterns/elements/oembed";
import Image from "next/image";
import {EnvelopeIcon} from "@heroicons/react/20/solid";
import LinkedInIcon from "@/components/patterns/icons/LinkedInIcon";
import TwitterIcon from "@/components/patterns/icons/TwitterIcon";
import FacebookIcon from "@/components/patterns/icons/FacebookIcon";
import NewsSocialLink from "@/components/node/stanford-news/news-social-link";
import {formatDate} from "@/lib/format-date";
import NewsPrintButton from "@/components/node/stanford-news/print-button";
import {redirect} from "next/navigation";
import {buildUrl} from "@/lib/drupal/utils";
import {NodeStanfordNews} from "@/lib/gql/__generated__/drupal";
import Paragraph from "@/components/paragraph";

const StanfordNews = async ({node, ...props}: { node: NodeStanfordNews }) => {
  // Redirect the user to the external source.
  if (node.suNewsSource?.url) redirect(node.suNewsSource?.url);

  const imageUrl = node.suNewsBanner?.__typename === 'MediaImage' && node.suNewsBanner.mediaImage.url
  const imageAlt = node.suNewsBanner?.__typename === 'MediaImage' && node.suNewsBanner.mediaImage.alt;

  return (
    <article {...props} className=" centered mt-50">
      <div className="centered 2xl:w-2/3 mb-100">

        {node.suNewsDek && <div className="">{node.suNewsDek}</div>}
        <div className="md:flex">
          <div className="flex md:order-last">
            {!node.suNewsHideSocial &&
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
            }
          </div>
          <div>
            {node.suNewsPublishingDate && <>{formatDate(node.suNewsPublishingDate.time)} |&nbsp;</>}
            {node.suNewsByline}
          </div>
        </div>
      </div>
      <hr className="w-1/2 mx-auto mb-100 text-black-40"/>

      {imageUrl &&
        <figure className="relative mb-100 lg:w-10/12 mx-auto aspect-[16/9]">
          <Image
            className="object-cover"
            src={buildUrl(imageUrl).toString()}
            alt={imageAlt || ''}
            fill
          />

          {node.suNewsBannerMediaCaption &&
            <figcaption className="text-center caption">
              {node.suNewsBannerMediaCaption}
            </figcaption>
          }

        </figure>
      }

      {node.suNewsBanner?.__typename === 'MediaVideo' &&
        <figure className="relative mb-100 w-10/12 mx-auto aspect-[16/9]">
          <Oembed
            url={node.suNewsBanner.mediaOembedVideo}
          />
          {node.suNewsBannerMediaCaption &&
            <figcaption className="text-center caption">
              {node.suNewsBannerMediaCaption}
            </figcaption>
          }
        </figure>
      }

      {node.suNewsComponents &&
        <div className="centered 2xl:w-2/3">
          {node.suNewsComponents.map(paragraph =>
            <Paragraph key={paragraph.id} paragraph={paragraph}/>
          )}
        </div>
      }
    </article>
  )
}

export default StanfordNews;