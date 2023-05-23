import {StudyPlace} from "@/lib/drupal/drupal";
import {getViewItems} from "@/components/views/view";
import StudyPlaceFiltering from "@/components/views/sul-study-place/study-place-filtering";

interface Props {
  view: string
  args: string
  itemsToDisplay: number
  emptyMessage: string
}


const StudyPlacesFilteredCards = async ({view}: Props) => {
  const items = await getViewItems<StudyPlace>(view);
  return <StudyPlaceFiltering items={items}/>
}

export default StudyPlacesFilteredCards;