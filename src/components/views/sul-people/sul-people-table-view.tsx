import {NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d";

interface Props {
  items: NodeStanfordPerson[]
  hasHeading: boolean
}

const SulPeopleTableView = async ({items, hasHeading}: Props) => {
  return (
    <table>
      Build the table
    </table>
  )
}
export default SulPeopleTableView;