import SearchForm from "@/components/search/search-form";
import SearchResults from "./results";

const Page = () => {
  return (
    <div className="2xl:w-2/3">
      <SearchForm
        action="/search"
        /* @ts-ignore */
        className="mb-50"
        inputProps={{className: "input border border-cool-grey w-full rounded p-10"}}
      />
      <SearchResults/>
    </div>
  )
}

export default Page;