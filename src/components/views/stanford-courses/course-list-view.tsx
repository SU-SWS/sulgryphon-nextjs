import StanfordCourseListItem from "@/components/node/stanford-course/list-item";
import {NodeStanfordCourse} from "@/lib/gql/__generated__/drupal";

interface Props {
  items: NodeStanfordCourse[]
}

const CourseListView = async ({items}: Props) => {
  return (
    <div className="mb-20">
      {items.map(item =>
        <div
          key={item.id}
          className="border-b border-black-20 last:border-0 pb-10 last:pb-0 pt-10 first:pt-0"
        >
          <StanfordCourseListItem node={item}/>
        </div>
      )}
    </div>
  )
}
export default CourseListView;