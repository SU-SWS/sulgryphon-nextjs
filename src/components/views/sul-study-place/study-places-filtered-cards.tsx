import StudyPlaceFiltering from "@/components/views/sul-study-place/study-place-filtering";
import {NodeSulStudyPlace} from "@/lib/gql/__generated__/drupal";

interface Props {
  items: NodeSulStudyPlace[]
}


const StudyPlacesFilteredCards = async ({items}: Props) => {
  return <StudyPlaceFiltering items={items}/>
}

export default StudyPlacesFilteredCards;