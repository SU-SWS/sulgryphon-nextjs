import {getViewPagedItems, loadViewPage} from "@/lib/gql/gql-views"
import View from "@/components/views/view"
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid"

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
    <div className="rs-pb-8 2xl:w-2/3">
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
          <label className="mb-8 text-28 font-semibold text-black" htmlFor="keyword-search">
            Search this site
          </label>
          <div className="relative flex max-w-600 items-center justify-center">
            <input
              id="keyword-search"
              name="q"
              className="input w-full rounded-full border border-cool-grey p-10"
              defaultValue={searchKey}
            />
            <button type="submit" className="absolute right-10">
              <span className="sr-only">Search</span>
              <MagnifyingGlassIcon width={25} className="text-cardinal-red" />
            </button>
          </div>
        </div>
      </form>

      <h2 className="rs-pt-2 type-3 m-0 pb-36">Results</h2>
      {viewItems.length === 0 && <p>No results found for the given search keywords. Please try again.</p>}

      {viewItems.length > 0 && (
        <div className="space-y-24">
          <View
            items={viewItems}
            viewId="search"
            displayId="search"
            loadPage={totalItems > viewItems.length ? loadSearchPage : undefined}
            totalItems={totalItems}
          />
        </div>
      )}
    </div>
  )
}
export default SiteSearch
