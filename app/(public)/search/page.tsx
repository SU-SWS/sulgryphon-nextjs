import SearchForm from "@/components/search/search-form";
import SearchResults from "./results";

const Page = () => {
  return (
    <div className="2xl:su-w-2/3">
      <SearchForm
        action="/search"
        /* @ts-ignore */
        className="su-mb-50"
        inputProps={{className: "su-input su-border su-border-cool-grey su-w-full su-rounded su-p-10"}}
      />
      <SearchResults/>
    </div>
  )
}

export default Page;