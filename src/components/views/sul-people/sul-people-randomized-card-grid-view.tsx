import {NodeStanfordPerson} from "@/lib/gql/__generated__/graphql"
import {PersonCardData} from "@/components/node/stanford-person/card"
import RandomPersonCards from "@/components/views/sul-people/random-person-cards.client"

interface Props {
  items: NodeStanfordPerson[]
  hasHeading: boolean
}

const PeopleRandomizedCardView = ({items, hasHeading}: Props) => {
  // Every person is a candidate, so send only what a card shows rather than a rendered card for each.
  const people: PersonCardData[] = items.map(person => ({
    uuid: person.uuid,
    title: person.title,
    path: person.path,
    suPersonFullTitle: person.suPersonFullTitle,
    suPersonEmail: person.suPersonEmail,
    sulPersonLibcalId: person.sulPersonLibcalId,
    suPersonPhoto: person.suPersonPhoto?.mediaImage.url
      ? {mediaImage: {url: person.suPersonPhoto.mediaImage.url}}
      : null,
  }))

  return (
    <div className="@container">
      <ul className="list-unstyled flex flex-col justify-between gap-40 md:flex-row md:flex-wrap lg:flex-nowrap">
        <RandomPersonCards people={people} hasHeading={hasHeading} />
      </ul>
    </div>
  )
}

export default PeopleRandomizedCardView
