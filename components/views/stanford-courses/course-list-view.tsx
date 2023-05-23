import StanfordCourseListItem from "@/components/node/stanford-course/list-item";
import {getViewItems} from "@/components/views/view";
import {Course} from "@/lib/drupal/drupal";

interface Props {
  view: string
  args: string
  itemsToDisplay: number
  emptyMessage: string
}

const CourseListView = async ({view, args, itemsToDisplay, emptyMessage}: Props) => {

  args = args ? args + '/0/0/0' : '0/0/0/0';

  const items = await getViewItems<Course>(view, itemsToDisplay, args.split('/'));
  if (items.length === 0) {
    if (emptyMessage) {
      return (
        <div>
          {emptyMessage}
        </div>
      )
    }
    return null;
  }

  return (
    <div className="su-mb-20">
      {items.map(item =>
        <div
          key={item.id}
          className="su-border-b su-border-black-20 last:su-border-0 su-pb-10 su-last:pb-0 su-pt-10 first:su-pt-0"
        >
          <StanfordCourseListItem node={item}/>
        </div>
      )}
    </div>
  )
}
export default CourseListView;