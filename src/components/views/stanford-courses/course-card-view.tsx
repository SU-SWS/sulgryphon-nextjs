import CardList from "@/components/views/card-list";
import {NodeStanfordCourse} from "@/lib/gql/__generated__/drupal.d";

interface Props {
  items: NodeStanfordCourse[]
}

const CourseCardView = async ({items}: Props) => {
  return (
    <CardList items={items}/>
  )
}
export default CourseCardView;