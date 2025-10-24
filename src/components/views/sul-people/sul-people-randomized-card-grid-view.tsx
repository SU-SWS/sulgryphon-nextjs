import {NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d"
import RandomizeChildren from "@/components/patterns/elements/randomize-children"
import StanfordPersonCard from "@/components/node/stanford-person/card"

interface Props {
  items: NodeStanfordPerson[]
  hasHeading: boolean
  /**
   * Number of random people to display
   * @default 3
   */
  count?: number
}

const PeopleRandomizedCardView = ({items, hasHeading, count = 3}: Props) => {
  return (
    <div className="@container">
      <ul className="list-unstyled mb-50 grid gap-[90px] @4xl:grid-cols-2 @7xl:grid-cols-3">
        <RandomizeChildren count={count}>
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
