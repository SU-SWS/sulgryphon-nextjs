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
  const validItems = items.filter(item => {
    if (!item.sul_study__branch.title) console.error('Orphaned place of study: ' + item.title + ' | ' + item.id);
    return !!item.sul_study__branch.title;
  })
  return <StudyPlaceFiltering items={validItems}/>
}

export default StudyPlacesFilteredCards;