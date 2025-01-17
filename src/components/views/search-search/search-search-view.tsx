import {ViewDisplayProps} from "@/components/views/view"
import LoadMoreList from "@/components/patterns/load-more-list"
import Link from "@/components/patterns/elements/drupal-link"
import {NodeUnion} from "@/lib/gql/__generated__/drupal.d"
import {getCleanDescription, getFirstText} from "@/lib/text-tools"

const SearchListView = async ({items, totalItems, loadPage}: ViewDisplayProps) => {
  return (
    <LoadMoreList
      buttonText="Load More"
      ulProps={{className: "list-unstyled mb-20"}}
      liProps={{
        className: "border-b border-black-20 last-of-type:border-0 pb-10 last:pb-0 pt-10 first:pt-0",
      }}
      totalItems={totalItems}
      loadPage={loadPage}
    >
      {items.map(item => (
        <ResultItem key={item.id} item={item} />
      ))}
    </LoadMoreList>
  )
}

const ResultItem = ({item}: {item: NodeUnion}) => {
  const lastUpdated = new Date(item.changed.time).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  let description
  switch (item.__typename) {
    case "NodeStanfordPage":
      description = item.suPageDescription || getFirstText(item.suPageComponents, 2)
      break
    case "NodeStanfordEvent":
      description = getCleanDescription(item.body?.processed) || getFirstText(item.suEventComponents, 2)
      break
    case "NodeSulLibrary":
      description = getFirstText(item.suLibraryParagraphs, 2)
      break
    case "NodeStanfordNews":
      description = item.suNewsDek || getFirstText(item.suNewsComponents, 2)
      break
    case "NodeStanfordPerson":
      description =
        item.suPersonFullTitle ||
        getCleanDescription(item.body?.processed, 2) ||
        getFirstText(item.suPersonComponents, 2)
      break
  }

  return (
    <article key={item.id} aria-labelledby={item.id}>
      <Link href={item.path ?? "#"} className="no-underline hocus:underline">
        <h2 className="type-2" id={item.id}>
          {item.title}
        </h2>
      </Link>
      {description && <p>{description}</p>}
      <div className="rs-py-4">Last updated {lastUpdated}</div>
    </article>
  )
}
export default SearchListView
