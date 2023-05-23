import StanfordCourseCard from "@/components/node/stanford-course/card";
import {getViewItems} from "@/components/views/view";
import {Course} from "@/lib/drupal/drupal";

interface Props {
  view: string
  args: string
  itemsToDisplay: number
  emptyMessage: string
}

const CourseCardView = async ({view, args, itemsToDisplay, emptyMessage}: Props) => {
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
    <div className="su-@container su-flex su-flex-wrap su-justify-around su-gap-20">
      {items.map(item =>
        <div key={item.id} className="su-min-w-[250px] @6xl:su-min-w-[400px] su-flex-1 su-max-w-[500px]">
          <StanfordCourseCard node={item} key={item.id}/>
        </div>
      )}
    </div>
  )
}
export default CourseCardView;