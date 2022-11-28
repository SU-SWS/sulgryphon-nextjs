import {DrupalLink} from "@/components/simple/link";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import {Library} from "../../types/drupal";
import useSWR from 'swr';
import formatHtml from "@/lib/format-html";


interface SulLibraryNodeProps {
  node: Library;
}

export const NodeSulLibrary = ({node, ...props}: SulLibraryNodeProps) => {

  const fetcher = (...args) => fetch.apply(null, args).then(res => res.json())
  const {data: circulationHours} = useSWR(`https://library-hours.stanford.edu/api/v1/library/${node.su_library__url_name}/location/library-circulation/hours/for/today`, fetcher)
  const {data: referenceHours} = useSWR(`https://library-hours.stanford.edu/api/v1/library/${node.su_library__url_name}/location/reference/hours/for/today`, fetcher)

  return (
    <MainContentLayout>
      <article>
        <h1>{node.title}</h1>
        {node.body && <div>{formatHtml(node.body.processed)}</div>}

        {node.su_library__access && <div><h2>About</h2>{node.su_library__access}</div>}
        {node.su_library__accessibility && <div><h2>Accessibility</h2>{node.su_library__accessibility}</div>}
        {node.su_library__email && <div><h2>Email</h2>{node.su_library__email}</div>}
        {node.su_library__location && <div><h2>Location</h2>{node.su_library__location}</div>}
        {node.su_library__parking && <div><h2>Transit and Parking</h2>{node.su_library__parking}</div>}
        {node.su_library__phone && <div><h2>Phone</h2>{node.su_library__phone}</div>}

        <div>
          <h2>Hours</h2>
          {referenceHours && <LibraryHours label="Reference" {...referenceHours[0]} />}
          {circulationHours && <LibraryHours label="Library & circulation" {...circulationHours[0]} />}
        </div>

      </article>
    </MainContentLayout>
  )
}

export const NodeSUlLibraryListItem = ({node, ...props}: SulLibraryNodeProps) => {
  return (
    <article {...props}>
      <DrupalLink href={node.path.alias}>
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </DrupalLink>
    </article>
  )
}

export const NodeSulLibraryCard = ({node, ...props}: SulLibraryNodeProps) => {
  return (
    <article className="su-shadow-lg" {...props}>
      <DrupalLink href={node.path.alias}
                  className="su-no-underline su-text-cardinal-red hover:su-underline hover:su-text-black">
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </DrupalLink>
    </article>
  )
}

const LibraryHours = ({label, closed, closes_at, opens_at, location_slug}) => {

  const closes = new Date(closes_at)
  const closeTime = closes.toLocaleTimeString("en-US", {
    hour: "numeric"
  })

  const opens = new Date(opens_at)
  const openTime = opens.toLocaleTimeString("en-US", {
    hour: "numeric"
  })

  return (
    <div>
      <a href="#">{label}</a>
      {closed && <span>closed</span>}
      {!closed && <span>{openTime} - {closeTime}</span>}
    </div>
  )
}
