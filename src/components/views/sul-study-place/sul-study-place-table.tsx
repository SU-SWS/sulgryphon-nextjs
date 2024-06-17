import {NodeSulStudyPlace} from "@/lib/gql/__generated__/drupal.d";

interface Props {
  items: NodeSulStudyPlace[]
}

const SulStudyPlaceTableView  = async ({items}: Props) => {
  // putting this here so Jen can see the objects in the console.
  // Remove before deployment.
  console.log (items);
  return (
    <table>
      Build the table
    </table>
  )
}
export default SulStudyPlaceTableView;
