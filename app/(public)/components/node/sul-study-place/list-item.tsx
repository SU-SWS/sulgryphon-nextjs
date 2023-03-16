import {StudyPlace} from "@/lib/drupal/drupal";

const SulStudyPlaceListItem = ({node}: { node: StudyPlace }) => {
  return (
    <>
      {console.log('node 2: ', node)}
      ListItem
    </>
  )
}
export default SulStudyPlaceListItem;