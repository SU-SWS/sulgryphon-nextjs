"use client"

import RandomizeChildren from "@/components/patterns/elements/randomize-children"
import StanfordPersonCard, {PersonCardData} from "@/components/node/stanford-person/card"

type Props = {
  people: PersonCardData[]
  hasHeading: boolean
  count?: number
}

/**
 * Three random people, chosen in the browser on each visit. Only the card data is sent from the server,
 * not a rendered card for every person.
 */
const RandomPersonCards = ({people, hasHeading, count = 3}: Props) => (
  <RandomizeChildren count={count}>
    {people.map(person => (
      <li key={person.uuid} className="mx-auto w-full md:w-[calc(50%_-_5rem)] lg:w-[calc(33.3%_-_5rem)]">
        <StanfordPersonCard h3Heading={hasHeading} node={person} />
      </li>
    ))}
  </RandomizeChildren>
)

export default RandomPersonCards
