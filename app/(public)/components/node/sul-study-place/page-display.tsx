import "server-only";

import {StudyPlace} from "@/lib/drupal/drupal";

const SulStudyPlace = ({node, ...props}: { node: StudyPlace }) => {
  console.log(node)

  return (
    <>
      {console.log('node: ', node)}
      Course
    </>
  )
}

export default SulStudyPlace;