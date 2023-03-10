"use client";

import {DrupalNode} from "next-drupal";
import dynamic from "next/dynamic";
import {
  Course,
  Event,
  EventSeries,
  News,
  BasicPage,
  Person,
  Publication,
  Library
} from "@/lib/drupal/drupal";
import Conditional from "@/components/utils/conditional";
import {useSearchParams} from "next/navigation";
import {useSearchResults} from "@/lib/hooks/useSearchResults";
import {SignalIcon} from "@heroicons/react/20/solid";

const StanfordCourseListItem = dynamic(() => import("../../components/node/stanford-course/list-item"));
const StanfordEventListItem = dynamic(() => import("../../components/node/stanford-event/list-item"));
const StanfordEventSeriesListItem = dynamic(() => import("../../components/node/stanford-event-series/list-item"));
const StanfordNewsListItem = dynamic(() => import("../../components/node/stanford-news/list-item"));
const StanfordPageListItem = dynamic(() => import("../../components/node/stanford-page/list-item"));
const StanfordPersonListItem = dynamic(() => import("../../components/node/stanford-person/list-item"));
const StanfordPublicationListItem = dynamic(() => import("../../components/node/stanford-publication/list-item"));
const SulLibraryListItem = dynamic(() => import("../../components/node/sul-library/list-item"));

const SearchResults = () => {
  const params = useSearchParams();
  const [data, loading] = useSearchResults(params ? params.get('q') as string : '');
  if (loading) {
    return <SignalIcon width={50} className="su-animate-ping su-mx-auto su-my-50" />
  }
  return (
    <div>
      <Conditional showWhen={data.length === 0}>
        <p>No results found for your search. Please try again.</p>
      </Conditional>
      <Conditional showWhen={data.length > 0}>
        <ul className="su-list-unstyled">
          {data.slice(0, 20).map(node => <li key={node.id}><SearchResultItem node={node}/></li>)}
        </ul>
      </Conditional>
    </div>
  )
}

const SearchResultItem = ({node}: { node: DrupalNode }) => {
  return (
    <>
      {node.type === "node--stanford_course" && <StanfordCourseListItem node={node as Course}/>}
      {node.type === "node--stanford_event" && <StanfordEventListItem node={node as Event}/>}
      {node.type === "node--stanford_event_series" && <StanfordEventSeriesListItem node={node as EventSeries}/>}
      {node.type === "node--stanford_news" && <StanfordNewsListItem node={node as News}/>}
      {node.type === "node--stanford_page" && <StanfordPageListItem node={node as BasicPage}/>}
      {node.type === "node--stanford_person" && <StanfordPersonListItem node={node as Person}/>}
      {node.type === "node--stanford_publication" && <StanfordPublicationListItem node={node as Publication}/>}
      {node.type === "node--sul_library" && <SulLibraryListItem node={node as Library}/>}
    </>
  )
}

export default SearchResults;