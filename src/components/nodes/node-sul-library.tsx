import {useEffect, useState} from "react";
import {Library} from "../../types/drupal";
import formatHtml from "@/lib/format-html";
import {DrupalLink} from "@/components/simple/link";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import {Paragraph} from "@/components/paragraphs";
import {ClockIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import axios from "axios";


interface SulLibraryNodeProps {
  node: Library;
}

export const NodeSulLibrary = ({node, ...props}: SulLibraryNodeProps) => {
  const [hours, setHours] = useState(null)

  useEffect(() => {
    axios.get('https://library-hours.stanford.edu/libraries.json')
      .then(response => {
        const branchHours = response.data.included.filter(item => node.su_library__hours === item.relationships.library.data.id.toLowerCase());
        // TODO search for the branch hours and pick the correct set.
        setHours(branchHours[0])
      });
  }, [node.su_library__hours])

  const dayOfWeekName = new Date().toLocaleString('default', {weekday: 'long'});
  const todayHours = hours && hours?.attributes?.hours?.find(day => day.weekday === dayOfWeekName);

  return (
    <MainContentLayout pageTitle={node.title}>
      <article>
        { console.log(node) }
        {/* {node.body && <div>{formatHtml(node.body.processed)}</div>} */}
        {/* {node.su_library__access && <div><h2>About</h2>{node.su_library__access}</div>} */}
        {/* {node.su_library__accessibility && <div><h2>Accessibility</h2>{node.su_library__accessibility}</div>} */}
        {/* {node.su_library__parking && <div><h2>Transit and Parking</h2>{node.su_library__parking}</div>} */}

        <div className="su-block su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border su-border-solid su-border-black-10 su-shadow-md su-rs-pt-2 su-rs-px-2 su-rs-pb-3">
          {node.su_library__phone && 
            <div className="su-relative su-flex su-flex-row su-items-start su-mt-40 md:su-mt-20 su-mb-4">
              <PhoneIcon width={26} className="md:su-absolute md:su-left-[-32px] su-mr-3 md:su-mr-0"/>
              {node.su_library__phone}
            </div>
          }
          {node.su_library__email && 
            <div className="su-relative su-flex su-flex-row su-items-start su-mt-40 md:su-mt-20 su-mb-4">
              <EnvelopeIcon width={26} className="md:su-absolute md:su-left-[-32px] su-mr-3 md:su-mr-0"/>
              {node.su_library__email}
            </div>
          }
          {node.su_library__address &&
            <div className="su-relative su-mt-40 md:su-mt-20 su-mb-4">
              <MapPinIcon width={26} className="md:su-absolute md:su-left-[-32px] su-mr-3 md:su-mr-0"/>
              <div className="su-text-16 md:su-text-18">{node.su_library__address.address_line1}</div>
              <div className="su-text-16 md:su-text-18">{node.su_library__address.address_line2}</div>
              <div className="su-text-16 md:su-text-18">{node.su_library__address.locality}, {node.su_library__address.administrative_area} {node.su_library__address.postal_code}</div>
            </div>
          }
          {hours &&
            <div className="su-relative su-mt-40 md:su-mt-20 su-mb-4">
              <ClockIcon width={26} className="md:su-absolute md:su-left-[-32px] su-mr-3 md:su-mr-0"/>
              {hours && <LibraryHours {...todayHours} />}
            </div>
          }
        </div>

        {node.su_library__paragraphs && 
          <div className="su-rs-py-1">
            {node.su_library__paragraphs.map(paragraph =>
              <Paragraph key={paragraph.id} paragraph={paragraph}/>
            )}
          </div>
        }
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
