import {getSearchIndex} from "@/lib/drupal/get-search-index"
import Search, {SearchResult} from "./search"
import {StanfordNode, StanfordParagraph, WysiwygParagraph} from "@/lib/drupal/drupal"

export const revalidate = false
export const dynamic = "force-static"

const Page = () => {
  const search = async (searchString: string): Promise<SearchResult[]> => {
    "use server"

    // This still uses JSON API because GraphQL doesn't have an easy way to search for content.
    const searchResults: StanfordNode[] = await getSearchIndex("full_site_content", {
      params: {"filter[fulltext]": searchString},
    })

    return searchResults
      .map(node => ({
        id: node.id,
        title: node.title,
        path: node.path.alias,
        changed: node.changed,
        description: getNodeDescription(node),
      }))
      .slice(0, 20)
  }

  return (
    <div className="2xl:w-2/3">
      <Search search={search} />
    </div>
  )
}

const getNodeDescription = (node: StanfordNode) => {
  switch (node.type) {
    case "node--stanford_page":
      return node.su_page_description || getFirstTextFromParagraphs(node.su_page_components)

    case "node--stanford_person":
      return node.su_person_full_title

    case "node--stanford_event":
      return getTextSnippet(node.body) || getFirstTextFromParagraphs(node.su_event_components)

    case "node--stanford_news":
      return getFirstTextFromParagraphs(node.su_news_components)

    case "node--sul_library":
      return getFirstTextFromParagraphs(node.su_library__paragraphs)
  }
}

const getTextSnippet = (html?: string) => {
  const snippet = html
    ?.replace(/(<([^>]+)>)/gi, "")
    .replace(/ +/g, " ")
    .split(" ")
    .slice(0, 50)
    .join(" ")
  return snippet ? snippet + "..." : undefined
}

const getFirstTextFromParagraphs = (paragraphs?: StanfordParagraph[]) => {
  const firstWysiwyg = paragraphs?.find(p => p.__typename === "paragraph--stanford_wysiwyg") as
    | WysiwygParagraph
    | undefined
  return getTextSnippet(firstWysiwyg?.su_wysiwyg_text)
}

export default Page
