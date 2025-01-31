import {getViewPagedItems, loadViewPage} from "@/lib/gql/gql-views"
import View from "@/components/views/view"

type Props = {
  searchKey: string
}
const SiteSearch = async ({searchKey}: Props) => {
  const {items: viewItems, totalItems} = await getViewPagedItems("search", "search", undefined, 12, 0, {
    key: searchKey || "",
  })

  const loadSearchPage = async (page: number) => {
    "use server"
    return loadViewPage("search", "search", [], false, 12, page, {key: searchKey})
  }

  return (
    <div className="space-y-24 pb-40 2xl:w-2/3">
      <form
        className="relative flex flex-col gap-xs @xl:flex-row @xl:items-end @3xl:gap-xl"
        aria-label="Site Search"
        action="/search"
      >
        <div className="sr-only">
          <label>
            Email (Leave this field empty)
            <input name="search" />
          </label>
        </div>
        <div className="flex-grow">
          <label className="mb-2 text-white" htmlFor="keyword-search">
            Keyword Search
          </label>
          <input
            id="keyword-search"
            name="q"
            className="input w-full rounded border border-cool-grey p-10"
            defaultValue={searchKey}
          />
        </div>

        <button
          type="submit"
          className="rounded-full bg-digital-red p-15 text-white transition hover:bg-cardinal-red-dark hocus:underline"
        >
          Search
        </button>
      </form>

      {viewItems.length === 0 && <p>No results found for the given search keywords. Please try again.</p>}

      {viewItems.length > 0 && (
        <View
          items={viewItems}
          viewId="search"
          displayId="search"
          loadPage={totalItems > viewItems.length ? loadSearchPage : undefined}
          totalItems={totalItems}
        />
      )}
    </div>
  )
}
export default SiteSearch
