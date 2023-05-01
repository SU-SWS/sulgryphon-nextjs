import SearchForm from "@/components/search/search-form";
import SearchResults from "./results";

const Page = () => {
  return (
    <div>
      <SearchForm
        action="/search"
        /* @ts-ignore */
        className="su-w-1/2 su-mx-auto su-mb-50"
        inputProps={{className: "su-input su-border su-border-cool-grey su-w-full su-rounded su-p-10"}}
      />
      <SearchResults/>
    </div>
  )
}

export default Page;