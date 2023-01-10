import {NextSeo} from "next-seo";
import Image from "next/image";
import Link from "next/link";
import {useMemo, useState} from "react";

import {BasicPage} from "../../types/drupal";
import {Rows} from "@/components/paragraphs/row";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import {Card} from "@/components/patterns/card";
import Conditional from "@/components/simple/conditional";
import SearchWorks from "@/components/search/search-works";
import {useNodeList} from "@/lib/hooks/useNodeList";
import {useLibraryHours} from "@/lib/hooks/useLibraryHours";
import {ClockIcon} from "@heroicons/react/24/outline";

interface BasicPageNodeProps {
  node: BasicPage
  homepage?: boolean
}

export const NodeStanfordPage = ({node, homepage = false, ...props}: BasicPageNodeProps) => {
  const pageTitle = homepage ? null : node.title;

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

      <MainContentLayout
        pageTitle={pageTitle}
        fullWidth={homepage}
        header={homepage ? <HomepageBanner/> : null}
        {...props}
      >
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

const HomepageBanner = () => {
  return (
    <div className="su-bg-black-true su-mb-100 su-relative">
      <div className="su-cc su-relative su-z-10 su-top-50 md:su-top-100 md:su-mx-40 md:su-min-h-[300px]">
        <div className="xl:su-mx-20 md:su-flex su-justify-between">
          <div className="su-text-white su-mb-40 md:su-w-1/3 lg:su-w-1/2">
            <h2>What can we help you find?</h2>
            <SearchWorks className="su-mb-20"/>
            <p>Search gives results from this site, the catalog, articles+, guides, online exhibits, and Yewno.</p>
          </div>

          <TodayHours className="su-relative su-z-100 su-min-w-[300px] xl:su-min-w-[400px]"/>
        </div>
      </div>

      <div
        className="su-bg-right-bottom lg:su-bg-home-banner-sprinkles su-absolute su-h-2/3 su-w-3/4 su-bottom-0 su-right-0">
        <div className="su-bg-gradient-to-b su-from-black-true su-to-transparent su-absolute su-w-full su-h-full">
          <div className="su-bg-gradient-to-r su-from-black-true su-to-transparent su-absolute su-w-full su-h-full">
            {/*Empty elements. They are absolute positioned to provide visual affects only.*/}
          </div>
        </div>
      </div>

      <div className="su-relative">
        <svg viewBox="0 0 1500 70">
          <path d="M0,71 Q500,65 800,20 Q1200,-30 1500,71" stroke="#fff" className="su-fill-white"></path>
        </svg>
      </div>
    </div>
  )
}

const TodayHours = (props) => {
  const [selectedLibrary, setSelectedLibrary] = useState(null);

  const libraries = useNodeList('sul_library');
  const hours = useLibraryHours();

  if (libraries.length === 0 || Object.keys(hours).length === 0) {
    return null;
  }

  const library = libraries.find((item, index) => selectedLibrary ? item.id === selectedLibrary : index === 0);
  const selectedHours = hours[library.su_library__hours]

  const date = new Date()
  const libraryHours = selectedHours.locations[Object.keys(selectedHours.locations)[0]].find(day => day.day === date.toISOString().substring(0, 10));
  let openTime, closeTime, isOpen = false, closedAllDay = libraryHours.closed;

  if (!libraryHours.closed) {
    openTime = new Date(libraryHours.opens_at);
    closeTime = new Date(libraryHours.closes_at);
    isOpen = date.getTime() > openTime.getTime() && date.getTime() < closeTime.getTime();
  }

  const imageUrl = library.su_library__contact_img?.field_media_image?.image_style_uri?.breakpoint_md_2x
  const image = <Image
    className="su-object-cover su-object-center"
    src={imageUrl}
    alt=""
    fill={true}
  />

  return (
    <div {...props}>

      <Card
        className="su-border-0 su-rounded"
        image={image}
        header="Today&apos;s Hours"
        footer={
          <>
            <label htmlFor="library-hours" className="su-sr-only">Choose a library</label>
            <select
              id="library-hours"
              className="su-w-full su-text-black su-text-20 su-py-20 su-mb-20 su-rounded su-shadow"
              onChange={e => setSelectedLibrary(e.target.value)}
            >
              {Object.keys(libraries).map(index =>
                <option key={index} value={libraries[index].id}>{libraries[index].title}</option>
              )}
            </select>

            <div className="su-text-black su-flex su-justify-between" aria-live="polite">

              <div><ClockIcon className="su-inline" width={15}/> {isOpen ? 'Open' : 'Closed'}</div>
              <div>
                {!closedAllDay && (isOpen ? 'Closes at ' + closeTime.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                }) : 'Opens at ' + openTime.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                }))}
              </div>
            </div>
          </>
        }
      />
    </div>
  )
}