import {DrupalNode} from "next-drupal";
import {BasicPage, Event, News, Person} from "@/lib/drupal/drupal";

interface keyable {
  [key: string]: any
}

export const getNodeMetadata = (node: DrupalNode) => {
  let metadata: keyable = {};
  switch (node.type) {
    case 'node--stanford_page':
      metadata = getMetadataForBasicPage(node);
      break;

    case 'node--stanford_person':
      metadata = getMetadataForPersonPage(node as Person);
      break;
    case 'node--stanford-event':
      metadata = getMetadataForEventPage(node as Event);
      break;

    case 'node--stanford_news':
      metadata = getMetadataForNewsPage(node as News);
  }

  return {
    ...metadata,
    title: node.title + " | " + process.env.NEXT_PUBLIC_SITE_NAME
  };
}

const getMetadataForBasicPage = (node: BasicPage) => {
  return {
    description: node.su_page_description,
    openGraph: {
      type: 'website',
      title: node.title,
      description: node.su_page_description,
      images: [
        {
          url: node.su_page_image?.field_media_image?.image_style_uri?.card_956x478,
          width: 956,
          height: 478,
          alt: node.su_page_image?.field_media_image?.resourceIdObjMeta?.alt ?? "",
        }
      ]
    }
  }
}
const getMetadataForPersonPage = (node: Person) => {
  return {
    openGraph: {
      type: "profile",
      firstName: node.su_person_first_name,
      lastName: node.su_person_last_name
    }
  }
}

const getMetadataForEventPage = (node: Event) => {
  return {
    openGraph: {
      type: "event"
    }
  }
}
const getMetadataForNewsPage = (node: News) => {
  return {
    description: node.su_news_dek,
    openGraph: {
      type: "article",
      description: node.su_news_dek,
      publishedTime: new Date(node.su_news_publishing_date ?? "" as string).toISOString(),
      tag: node.su_news_topics?.map(term => term.name) ?? [],
    }
  }
}