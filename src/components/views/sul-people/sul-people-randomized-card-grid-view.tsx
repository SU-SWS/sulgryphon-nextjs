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
      <ul className="list-unstyled mb-50 grid gap-[90px] @4xl:grid-cols-2 @7xl:grid-cols-3">
        <RandomizeChildren count={3}>
          {items.map(person => (
            <li className="mx-auto w-full" key={person.id}>
              <StanfordPersonCard h3Heading={hasHeading} node={person} />
            </li>
          ))}
        </RandomizeChildren>
      </ul>
    </div>
  )
}

export default PeopleRandomizedCardView
