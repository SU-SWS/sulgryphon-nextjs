import {DrupalParagraph} from "next-drupal";
import {BasicPage, Event, Library, News, Person, StanfordNode} from "@/lib/drupal/drupal";


export const getNodeMetadata = (node: StanfordNode): Record<string, any> => {
  let metadata: Record<string, any> = {};
  switch (node.type) {
    case 'node--stanford_page':
      metadata = getMetadataForBasicPage(node);
      break;

    case 'node--stanford_person':
      metadata = getMetadataForPersonPage(node);
      break;
    case 'node--stanford_event':
      metadata = getMetadataForEventPage(node);
      break;

    case 'node--stanford_news':
      metadata = getMetadataForNewsPage(node);
      break;

    case 'node--sul_library':
      metadata = getMetadataForBranchPage(node);
      break;
  }

  return {
    ...metadata,
    metadataBase: new URL('https://library.stanford.edu'),
    title: node.title + " | " + process.env.NEXT_PUBLIC_SITE_NAME,
    other: {
      changed: node.changed,
      path: node.path?.alias,
    }
  };
}

const getMetadataForBranchPage = (node: Library) => {
  const firstHtml = getFirstTextFromParagraphs(node.su_library__paragraphs ?? []);
  const image = node.su_library__contact_img?.field_media_image || node.su_library__banner?.field_media_image;

  return {
    description: firstHtml ? getPlainText(firstHtml).split(' ').slice(0, 30).join(' ') : '',
    openGraph: {
      type: 'website',
      title: node.title,
      description: firstHtml ? getPlainText(firstHtml).split(' ').slice(0, 30).join(' ') : '',
      images: [
        {
          url: image?.image_style_uri?.card_956x478,
          width: 956,
          height: 478,
          alt: image?.resourceIdObjMeta?.alt ?? "",
        }
      ]
    }
  }
}

const getMetadataForBasicPage = (node: BasicPage) => {
  const firstHtml = getFirstTextFromParagraphs(node.su_page_components ?? []);

  return {
    description: node.su_page_description ?? (firstHtml ? getPlainText(firstHtml).split(' ').slice(0, 30).join(' ') : ''),
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
    description: node.su_person_full_title,
    openGraph: {
      type: "profile",
      firstName: node.su_person_first_name,
      lastName: node.su_person_last_name
    }
  }
}

const getMetadataForEventPage = (node: Event) => {
  return {
    description: getPlainText(node.body ?? '').split(' ').slice(0, 20).join(' '),
  }
}
const getMetadataForNewsPage = (node: News) => {
  let publishTime;
  if (node.su_news_publishing_date) {
    publishTime = new Date(node.su_news_publishing_date).toISOString()
  }
  const image = node.su_news_featured_media?.field_media_image || node.su_news_banner?.field_media_image;

  return {
    description: node.su_news_dek,
    openGraph: {
      type: "article",
      description: node.su_news_dek,
      publishedTime: publishTime ?? null,
      tag: node.su_news_topics?.map(term => term.name) ?? [],
      images: [
        {
          url: image?.image_style_uri?.card_956x478,
          width: 956,
          height: 478,
          alt: image?.resourceIdObjMeta?.alt ?? "",
        }
      ]
    }
  }
}

const getPlainText = (html: string) => {
  return html.replace(/(<([^>]+)>)/ig, '').replace(/ +/g, ' ');
}

const getFirstTextFromParagraphs = (paragraphs: DrupalParagraph[]) => {
  return paragraphs.find(p => p.type === 'paragraph--stanford_wysiwyg')?.su_wysiwyg_text
}