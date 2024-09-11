import {
  NodeStanfordEvent,
  NodeStanfordNews,
  NodeStanfordPage,
  NodeStanfordPerson,
  NodeSulLibrary,
  NodeUnion,
  ParagraphStanfordWysiwyg,
  ParagraphUnion,
} from "@/lib/gql/__generated__/drupal.d"

export const getNodeMetadata = (node: NodeUnion): Record<string, any> => {
  let metadata: Record<string, any> = {}
  switch (node.__typename) {
    case "NodeStanfordPage":
      metadata = getMetadataForBasicPage(node)
      break

    case "NodeStanfordPerson":
      metadata = getMetadataForPersonPage(node)
      break
    case "NodeStanfordEvent":
      metadata = getMetadataForEventPage(node)
      break

    case "NodeStanfordNews":
      metadata = getMetadataForNewsPage(node)
      break

    case "NodeSulLibrary":
      metadata = getMetadataForBranchPage(node)
      break
  }

  return {
    ...metadata,
    metadataBase: new URL("https://library.stanford.edu"),
    title: node.title + " | " + process.env.NEXT_PUBLIC_SITE_NAME,
    other: {
      changed: node.changed.time,
      path: node.path,
    },
  }
}

const getMetadataForBranchPage = (node: NodeSulLibrary) => {
  const firstHtml = getFirstTextFromParagraphs(node.suLibraryParagraphs ?? [])
  const image = node.suLibraryContactImg?.mediaImage || node.suLibraryBanner?.mediaImage

  return {
    description: firstHtml ? getPlainText(firstHtml).split(" ").slice(0, 30).join(" ") : "",
    openGraph: {
      type: "website",
      title: node.title,
      description: firstHtml ? getPlainText(firstHtml).split(" ").slice(0, 30).join(" ") : "",
      images: [
        {
          url: image?.url,
          width: 956,
          height: 478,
          alt: image?.alt || "",
        },
      ],
    },
  }
}

const getMetadataForBasicPage = (node: NodeStanfordPage) => {
  const firstHtml = getFirstTextFromParagraphs(node.suPageComponents ?? [])

  return {
    description: node.suPageDescription ?? (firstHtml ? getPlainText(firstHtml).split(" ").slice(0, 30).join(" ") : ""),
    openGraph: {
      type: "website",
      title: node.title,
      description: node.suPageDescription,
      images: [
        {
          url: node.suPageImage?.mediaImage.url,
          width: 956,
          height: 478,
          alt: node.suPageImage?.mediaImage.alt || "",
        },
      ],
    },
  }
}
const getMetadataForPersonPage = (node: NodeStanfordPerson) => {
  return {
    description: node.suPersonFullTitle,
    openGraph: {
      type: "profile",
      firstName: node.suPersonFirstName,
      lastName: node.suPersonLastName,
    },
  }
}

const getMetadataForEventPage = (node: NodeStanfordEvent) => {
  return {
    description: getPlainText(node.body?.processed ?? "")
      .split(" ")
      .slice(0, 20)
      .join(" "),
  }
}

const getMetadataForNewsPage = (node: NodeStanfordNews) => {
  let publishTime
  if (node.suNewsPublishingDate) {
    publishTime = new Date(node.suNewsPublishingDate.time).toISOString()
  }
  const image =
    node.suNewsFeaturedMedia?.mediaImage ||
    (node.suNewsBanner?.__typename === "MediaImage" ? node.suNewsBanner.mediaImage : undefined)

  return {
    description: node.suNewsDek,
    openGraph: {
      type: "article",
      description: node.suNewsDek,
      publishedTime: publishTime ?? null,
      tag: node.suNewsTopics?.map(term => term.name) ?? [],
      images: [
        {
          url: image?.url,
          width: 956,
          height: 478,
          alt: image?.alt || "",
        },
      ],
    },
  }
}

const getPlainText = (html: string) => {
  return html.replace(/(<([^>]+)>)/gi, "").replace(/ +/g, " ")
}

const getFirstTextFromParagraphs = (paragraphs: ParagraphUnion[]) => {
  const firstWysiwyg = paragraphs.find(p => p.__typename === "ParagraphStanfordWysiwyg") as
    | ParagraphStanfordWysiwyg
    | undefined
  return firstWysiwyg?.suWysiwygText?.processed
}
