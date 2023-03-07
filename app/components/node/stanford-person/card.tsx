import {Person} from "../../../../src/types/drupal";
import {SizeMe} from "react-sizeme";
import VerticalPersonCard from "./vertical-card";
import HorizontalPersonCard from "./horizontal-card";

const StanfordPersonCard = ({node, ...props}: { node: Person }) => {

  return (
    <SizeMe>
      {({size}) => (
        <>
          {(size.width && size.width < 510) &&
              <VerticalPersonCard node={node} currentWidth={size.width} {...props}/>
          }
          {(!size.width || (size.width && size.width >= 510)) &&
              <HorizontalPersonCard node={node}  {...props}/>
          }
        </>
      )}
    </SizeMe>
  )
}
export default StanfordPersonCard;