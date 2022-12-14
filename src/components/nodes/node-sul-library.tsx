import {Library} from "../../types/drupal";
import formatHtml from "@/lib/format-html";
import {DrupalLink} from "@/components/simple/link";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import {useLibraryHours} from "@/lib/hooks/useLibraryHours";

interface SulLibraryNodeProps {
  node: Library;
}

export const NodeSulLibrary = ({node, ...props}: SulLibraryNodeProps) => {
  const hours = useLibraryHours()
  const currentDay = new Date().toISOString().substring(0, 10)
  const libraryHours = hours[node.su_library__hours]
  let todayHours;

  if (libraryHours) {
    todayHours = libraryHours.locations[Object.keys(libraryHours.locations)[0]].find(day => day.day === currentDay);
  }

  return (
    <MainContentLayout pageTitle={node.title}>
      <article>
        {node.body && <div>{formatHtml(node.body.processed)}</div>}

        {node.su_library__access && <div><h2>About</h2>{node.su_library__access}</div>}
        {node.su_library__accessibility && <div><h2>Accessibility</h2>{node.su_library__accessibility}</div>}
        {node.su_library__email && <div><h2>Email</h2>{node.su_library__email}</div>}
        {node.su_library__location && <div><h2>Location</h2>{node.su_library__location}</div>}
        {node.su_library__parking && <div><h2>Transit and Parking</h2>{node.su_library__parking}</div>}
        {node.su_library__phone && <div><h2>Phone</h2>{node.su_library__phone}</div>}

        <div>
          <h2>Hours</h2>
          {todayHours && <LibraryHours {...todayHours} />}
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

const LibraryHours = ({closed, closes_at, opens_at}) => {

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
      {closed && <span>closed</span>}
      {!closed && <span>{openTime} - {closeTime}</span>}
    </div>
  )
}
