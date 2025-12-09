import {NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d"
import RandomizeChildren from "@/components/patterns/elements/randomize-children"
import StanfordPersonCard from "@/components/node/stanford-person/card"

interface Props {
  items: NodeStanfordPerson[]
  hasHeading: boolean
}

const PeopleRandomizedCardView = ({items, hasHeading}: Props) => {
  return (
    <div className="@container">
      <ul className="list-unstyled flex flex-col justify-between gap-40 md:flex-row md:flex-wrap lg:flex-nowrap">
        <RandomizeChildren count={3}>
          {items.map(person => (
            <li key={person.uuid} className="mx-auto w-full md:w-[calc(50%_-_5rem)] lg:w-[calc(33.3%_-_5rem)]">
              <StanfordPersonCard h3Heading={hasHeading} node={person} />
            </li>
          ))}
        </RandomizeChildren>
      </ul>
    </div>
  )
}

export default PeopleRandomizedCardView
