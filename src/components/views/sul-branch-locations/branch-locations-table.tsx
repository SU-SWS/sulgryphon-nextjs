import {NodeSulLibrary} from "@/lib/gql/__generated__/drupal.d";

interface Props {
  items: NodeSulLibrary[]
}

const SulBranchLocationTableView = async ({items}: Props) => {
  // Leaving this here for Jen so she can see the items
  // Remove this line before deploying.
  console.log(items)
  return (
    <table>
      Build the table in src/components/paragraph/views/sul-branch-locations/branch-locations-table.tsx
    </table>
  )
}
export default SulBranchLocationTableView ;
